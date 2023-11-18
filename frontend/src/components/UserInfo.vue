<template>
  <div>
    <label class="label">
      <span class="label-text text-xl">{{ label }}</span>
    </label>
    <input
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs h-14"
      v-model="updatedInfo"
    />
    <div class="badge badge-neutral btn-xs m-0.5" @click="updateUser">
      Change
    </div>
  </div>
  {{ label }}
  {{ updatedInfo }}
  {{ id }}
</template>

<script>
import axios from "axios";
import { ref } from "vue";

let user = ref();

export default {
  name: "UserInfo",
  props: {
    label: String,
    placeholder: String,
  },
  data() {
    return {
      updatedInfo: "",
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
            updatedName: this.updatedInfo,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          user = res.data.user;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
