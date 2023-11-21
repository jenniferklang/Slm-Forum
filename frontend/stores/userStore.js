import { defineStore } from 'pinia';

export const useActiveUser = defineStore('user', {
  state: () => {
    if (localStorage.getItem('user'))
      // return JSON.parse(localStorage.getItem('user'));
      return {
        userId: 0,
        userRealName: '',
        userMail: '',
        userName: '',
        userImage: '',
      };
  },
});

export const useMessageStore = defineStore('newMessages', {
  state: () => {
    if (localStorage.getItem('newMessages'))
      return JSON.parse(localStorage.getItem('newMessages'));
    return { newMessage: false };
  },
});
