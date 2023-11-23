import { defineStore } from 'pinia';

export const useMessageStore = defineStore('newMessages', {
  state: () => {
    if (localStorage.getItem('newMessages'))
      return JSON.parse(localStorage.getItem('newMessages'));
    return { newMessage: false };
  },
});
