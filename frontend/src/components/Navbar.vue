<template>
  <div class="navbar mx-auto shadow-md">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <router-link to="/">Hem</router-link>
          </li>
          <!-- <li><router-link to="/chat">Chat</router-link></li> -->
          <li><router-link to="/forum">Forum</router-link></li>
          <li><router-link to="/chat">Chat</router-link></li>
          <li><router-link to="/policy">Integritetspolicy</router-link></li>
          <li><router-link to="/user">Inställningar</router-link></li>
          <li v-if="loggedIn">
            <router-link to="/login" @click="logout">Logga ut</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <h1 class="text-xl">SLM</h1>
    </div>
    <div class="navbar-end">
      <!-- <button class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button> -->
      <div class="dropdown dropdown-bottom dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="badge badge-xs badge-primary indicator-item"
              v-if="newMessage"
            ></span>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-if="newMessage">
              <router-link to="/chat">Nya meddelanden i chatten!</router-link>
            </li>
            <li v-else>Du har inga meddelanden som väntar på dig.</li>
          </ul>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { state, socket } from "../socket";
import { useMessageStore } from "../../stores/userStore";
import { mapWritableState } from "pinia";

export default {
  name: "Navbar",

  data() {
    return {};
  },

  computed: {
    loggedIn() {
      if (sessionStorage.getItem("user_id") !== null) {
        return true;
      } else {
        return false;
      }
    },
    messages() {
      return state.messages;
    },
    connected() {
      return state.connected;
    },

    ...mapWritableState(useMessageStore, ["newMessage"]),
  },

  mounted() {
    console.log("STORE VALUE: ", this.newMessages);
    socket.on("chat message", () => {
      if (this.$route.path !== "/chat") {
        this.newMessage = true;
      }
    });
  },

  watch: {
    newMessage() {
      console.log("NEW MESSAGE: ", this.newMessage);
    },
  },

  methods: {
    logout() {
      sessionStorage.clear();

      axios("api/auth/logout")
        .then((response) => {
          console.log(response.data);
        })
        .then(() => {
          this.$router.push("/login");
        });
    },

    test() {
      console.log(this.newMessage);
    },
  },
};
</script>

<style></style>
