<script setup>
import UserInfo from "../components/UserInfo.vue";
import { useActiveUser } from "/stores/userStore";
const store = useActiveUser();

console.log(store);

defineProps({
  label: String,
  placeholder: String,
});
</script>

<template>
  <div class="card w-96 bg-accent shadow-xl m-auto">
    <div class="card-body">
      <div class="flex align-center">
        <div class="w-16 h-16 rounded-full bg-primary m-5"></div>
        <div class="m-5">
          <h2 class="card-title">User settings</h2>
          <div>User</div>
        </div>
      </div>
      <UserInfo label="Name" placeholder="John Doe" />
      <UserInfo label="Email" placeholder="johndoe@example.com" />
      <UserInfo label="Username" placeholder="johndoe" />
      <UserInfo label="Password" placeholder="user[0].title" />
    </div>
    <p>Name: {{ store.userName }}</p>
    <p>Real Name: {{ store.userRealName }}</p>
    <p>User Id: {{ store.userId }}</p>
    <p>Email: {{ store.userMail }}</p>
    <p>Image url: {{ store.userImage }}</p>
  </div>
</template>
