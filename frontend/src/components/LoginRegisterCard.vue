<template>
  <div class="card w-4/12 bg-base-200 min-w-[352px] shadow-xl">
    <figure>
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
    <div class="card-body">
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
                required
              />
              <input
                type="text"
                placeholder="Användarnamn"
                v-model="registerUsername"
                class="input w-full max-w-xs bg-white"
                required
              />
              <input
                type="email"
                placeholder="E-post"
                v-model="registerEmail"
                class="input w-full max-w-xs bg-white"
                required
              />
              <input
                type="password"
                placeholder="Lösenord"
                v-model="registerPassword"
                class="input w-full max-w-xs bg-white"
                required
              />
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  class="checkbox mr-5"
                  v-model="privacyCheck"
                  required
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

    <dialog ref="error_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Nu har vi stött på ett problem!</h3>
        <p class="py-4">{{ errorMessage }}</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Stäng</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
import { useActiveUser } from "/stores/userStore";
import { ref } from "vue";
const store = useActiveUser();
let user = ref();

export default {
  name: "LoginRegisterCard",

  data() {
    return {
      loginUsername: null,
      loginPassword: null,
      registerName: null,
      registerUsername: null,
      registerEmail: null,
      registerPassword: null,
      errorMessage: null,
      privacyCheck: false,
    };
  },

  methods: {
    setUser() {
      store.$patch({
        userId: user.user_id,
        userRealName: user.name,
        userMail: user.mail,
        userName: user.username,
        userImage: user.image_path,
      });
    },
    login() {
      axios
        .post(
          "/api/auth/login",
          {
            username: this.loginUsername,
            password: this.loginPassword,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          user = response.data.user;
          sessionStorage.setItem("jwt", response.data.token);
          this.setUser();
        })
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.message;
          this.$refs.error_modal.showModal();
        });
    },

    register() {
      if (this.privacyCheck) {
        axios
          .post(
            "/api/auth/register",
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
            this.setUser();
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error.response.data.message;
            this.$refs.error_modal.showModal();
          });
      } else {
        this.errorMessage =
          "Du måste godkänna integritetspolicyn för att kunna registrera dig!";
        this.$refs.error_modal.showModal();
      }
    },
  },
};
</script>

<style></style>
