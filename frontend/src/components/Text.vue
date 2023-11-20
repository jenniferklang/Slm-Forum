<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
    />

    <div>
      <form @submit.prevent="uploadImage" enctype="multipart/form-data">
        <input type="file" ref="fileInput" accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>
    </div>
    <img :src="imageUrl" alt="Test" />
  </div>
</template>

<script>
import axios from 'axios';
import { socket, state } from '../socket';

export default {
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      imageUrl: null,
    };
  },
  computed() {},
  mounted() {
    axios
      .get('/api/uploads/image/Johan.jpg', { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        this.imageUrl = url;
      })
      .catch((error) => {
        console.error('Error vid hämtning av bild:', error);
      });
  },
  methods: {
    // Skicka/emitta meddelande till servern
    async sendMessage() {
      const response = await axios.post('/api', {
        user_id: sessionStorage.getItem('user_id'),
      });
      console.log('RESPONSE_: ', response.data);

      this.socket.emit('chat message', {
        text: this.newMessage,
        username: response.data.username,
        id: Date.now(),
      });
      this.newMessage = '';
    },

    uploadImage() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append('image', file);

      axios
        .post('/api/uploads/upload', formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  beforeUnmount() {
    // När komponenten tas bort stängs anslutningen till servern.
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>
