<template>
  <div>
    <label class="label">
      <span class="label-text text-xl">{{ label }}</span>
    </label>
    <input
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs h-14"
      v-model="input"
    />
    <div
      class="btn btn-xs btn-neutral btn-xs m-1 relative left-64"
      @click="updateUser"
    >
      Change
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useActiveUser } from "/stores/userStore";
import { ref } from "vue";
const store = useActiveUser();
let user = ref();

export default {
  name: "UserInfo",
  props: {
    label: String,
    placeholder: String,
  },
  data() {
    return {
      input: "",
      id: sessionStorage.getItem("user_id"),
    };
  },
  methods: {
    updateUser() {
      axios
        .put(
          "/api/user",
          {
            id: this.id,
            label: this.label,
            value: this.input,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          user = res.data;
          this.setUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setUser() {
      store.$patch({
        userRealName: user[0].name,
        userMail: user[0].mail,
        userName: user[0].username,
        userImage: user[0].image_path,
      });
    },
  },
};
</script>
