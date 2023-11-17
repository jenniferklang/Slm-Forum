<script>
import axios from "axios";
import UserInfo from "../components/UserInfo.vue";
import { useActiveUser } from "/stores/userStore";

export default {
  data() {
    return {
      user: useActiveUser(),
      id: sessionStorage.getItem("user_id"),
    };
  },
  components: {
    UserInfo,
  },
  props: {
    label: String,
    placeholder: String,
  },
  methods: {
    deleteUser() {
      axios
        .delete(
          `/api/user/`,
          {
            data: {
              id: this.id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="card w-96 bg--base-200 shadow-xl m-auto">
    <div class="card-body">
      <div class="flex align-center">
        <div class="w-16 h-16 rounded-full bg-primary m-5"></div>
        <div class="m-5">
          <h2 class="card-title">User settings</h2>
          <div>{{ user.userName }}</div>
        </div>
      </div>
      <UserInfo label="Name" :placeholder="user.userRealName" />
      <UserInfo label="Email" :placeholder="user.userMail" />
      <UserInfo label="Username" :placeholder="user.userName" />
      <UserInfo label="Password" placeholder="*********" />
      <UserInfo label="Id" v-model="id" placeholder="*********" />
      <button class="btn btn-warning" @click="deleteUser">Delete User</button>
    </div>
    <p>Name: {{ user.userName }}</p>
    <p>Real Name: {{ user.userRealName }}</p>
    <p>User Id: {{ user.userId }}</p>
    <p>Email: {{ user.userMail }}</p>
    <p>Image url: {{ user.userImage }}</p>
    <p>Id: {{ id }}</p>
  </div>
</template>
