<template>
  <div class="card w-4/12 bg-base-200 min-w-[22rem] shadow-xl">
    <figure>
      <!-- <img
        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        alt="Shoes"
      /> -->

      <div class="diff aspect-[16/9]">
        <div class="diff-item-1">
          <div
            class="bg-primary text-base-200 text-9xl font-black grid place-content-center"
          >
            SLM
          </div>
        </div>
        <div class="diff-item-2">
          <div
            class="bg-base-200 text-9xl font-black grid place-content-center"
          >
            SLM
          </div>
        </div>
        <div class="diff-resizer"></div>
      </div>
    </figure>
    <div class="card-body h-[50vh]">
      <div class="tabs tabs-bordered self-center">
        <input
          type="radio"
          name="my_tabs_1"
          class="tab w-40"
          aria-label="Logga in"
          checked
        />
        <div class="tab-content py-10">
          <div class="flex justify-center flex-col w-full">
            <form @submit.prevent="login" class="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Användarnamn"
                v-model="loginUsername"
                class="input w-full max-w-xs bg-white"
              />
              <input
                type="password"
                placeholder="Lösenord"
                v-model="loginPassword"
                class="input w-full max-w-xs bg-white"
              />

              <button type="submit" class="btn btn-primary">Logga in</button>
            </form>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          class="tab w-40"
          aria-label="Skapa konto"
        />
        <div class="tab-content py-10">
          <div class="flex justify-center flex-col w-full">
            <form @submit.prevent="register" class="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Namn"
                v-model="registerName"
                class="input w-full max-w-xs bg-white"
              />
              <input
                type="text"
                placeholder="Användarnamn"
                v-model="registerUsername"
                class="input w-full max-w-xs bg-white"
              />
              <input
                type="email"
                placeholder="E-post"
                v-model="registerEmail"
                class="input w-full max-w-xs bg-white"
              />
              <input
                type="password"
                placeholder="Lösenord"
                v-model="registerPassword"
                class="input w-full max-w-xs bg-white"
              />
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  class="checkbox mr-5"
                  v-model="privacyChecked"
                />
                <span class="label-text max-w-[16rem]"
                  >Jag godkänner att ni hanterar min data i enlighet med
                  <router-link to="/policy"
                    >integritetsskyddspolicyn</router-link
                  ></span
                >
              </label>
              <button type="submit" class="btn btn-primary">Registrera</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginRegisterCard',

  data() {
    return {
      loginUsername: '',
      loginPassword: '',
      registerName: '',
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
    };
  },

  methods: {
    login() {
      axios
        .post(
          '/api/auth/login',
          {
            username: this.loginUsername,
            password: this.loginPassword,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          sessionStorage.setItem('jwt', response.data.token);
        })
        .then(() => {
          this.$router.push({ path: '/home' });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    register() {
      axios
        .post(
          '/api/auth/register',
          {
            name: this.registerName,
            username: this.registerUsername,
            mail: this.registerEmail,
            password: this.registerPassword,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
