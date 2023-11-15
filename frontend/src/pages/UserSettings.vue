<script setup>
import UserInfo from "../components/UserInfo.vue";
import { ref } from "vue";
import axios from "axios";

let user = ref[null];

axios.get("/api", {}, { withCredentials: true }).then(function (response) {
  user = response;
});

console.log(user);
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
  </div>
</template>
