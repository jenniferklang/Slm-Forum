<template>
  <div>
    <form class="formContainer" @submit.prevent="submitForm">
      <div class="form-control mb-4">
        <label class="label">
          <span class="label-text">Svara på tråden</span>
        </label>
        <textarea v-model="postContent" class="textarea textarea-bordered h-24" placeholder="Ditt inlägg"></textarea>
      </div>
      <button class="btn btn-outline btn-primary mb-4" type="submit">Skicka</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      postContent: "",
      topicId: parseInt(this.$route.params.topicId)
    };
  },
  methods: {
    submitForm() {
      const postData = {
        topic_id: this.topicId,
        content: this.postContent
      };

      axios.post('/api/postTopics', postData)
        .then(response => {
          console.log(response.data);
          this.postContent = "";
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>
