<template>
  <div class="card w-96 bg--base-200 shadow-xl m-auto">
    <div class="card-body">
      <div class="flex align-center">
        <img
          v-if="imageUrl"
          class="w-16 h-16 rounded-full m-5"
          :src="imageUrl"
          alt="Test"
        />
        <div v-else class="w-16 h-16 rounded-full bg-primary m-5"></div>
        <div class="m-5">
          <h2 class="card-title">Mitt konto</h2>
          <div>{{ user.userName }}</div>
        </div>
      </div>
      <div>
        <p class="text-xl">Ny profilbild</p>
        <p>Välj en kvadratisk bild</p>
        <input type="file" ref="fileInput" accept="image/*" />
        <div
          class="btn btn-xs btn-neutral m-1 relative left-48"
          @click="uploadImage"
        >
          Ladda upp profilbild
        </div>
      </div>
      <UserInfo label="Namn" :placeholder="user.userRealName" />
      <UserInfo label="Email" :placeholder="user.userMail" />
      <UserInfo label="Användarnamn" :placeholder="user.userName" />
      <UserInfo label="Lösenord" placeholder="*********" />
      <button class="btn btn-warning" @click="deleteUser">
        Radera mitt konto
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import UserInfo from '../components/UserInfo.vue';
import { useActiveUser } from '/stores/userStore';
const store = useActiveUser();

let userImagePath = ref();

export default {
  data() {
    return {
      user: useActiveUser(),
      id: sessionStorage.getItem('user_id'),
      imageUrl: null,
    };
  },
  components: {
    UserInfo,
  },
  props: {
    label: String,
    placeholder: String,
  },
  methods: {
    uploadImage() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append('image', file);
      formData.append('id', this.id);

      axios
        .post('/api/uploads/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response.data);
          axios
            .put(
              '/api/user',
              {
                id: this.id,
                label: 'image_path',
                path: `/api/uploads/avatar`,
              },
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res);
              userImagePath = res.data[0].image_path;
              console.log(userImagePath);
              store.userImage = userImagePath;
              location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteUser() {
      axios
        .delete(
          `/api/user/`,
          {
            data: {
              id: this.id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get(store.userImage, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        this.imageUrl = url;
      })
      .catch((error) => {
        console.error('Error vid hämtning av bild:', error);
      });
  },
};
</script>
