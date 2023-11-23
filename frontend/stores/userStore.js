import { defineStore } from 'pinia';

export const useActiveUser = defineStore('activeUser', {
  state: () => {
    if (localStorage.getItem('activeUser'))
      return JSON.parse(localStorage.getItem('activeUser'));
    return {
      userId: 0,
      userRealName: '',
      userMail: '',
      userName: '',
      userImage: '',
    };
  },
});
