import { defineStore } from "pinia";

export const useActiveUser = defineStore("user", {
  state: () => {
    return {
      userId: 0,
      userRealName: "",
      userMail: "",
      userName: "",
      userPsw: "",
      userImage: "",
    };
  },
});
