<script>
import UserInfo from "../components/UserInfo.vue";
import { useActiveUser } from "/stores/userStore";

export default {
  data() {
    return {
      user: useActiveUser(),
    };
  },
  components: {
    UserInfo,
  },
  props: {
    label: String,
    placeholder: String,
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
      <button class="btn btn-warning">Delete User</button>
    </div>
    <p>Name: {{ user.userName }}</p>
    <p>Real Name: {{ user.userRealName }}</p>
    <p>User Id: {{ user.userId }}</p>
    <p>Email: {{ user.userMail }}</p>
    <p>Image url: {{ user.userImage }}</p>
  </div>
</template>
