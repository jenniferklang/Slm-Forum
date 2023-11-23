<template>
  <div>
    <form ref="postForm" class="formContainer" @submit.prevent="submitForm">
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
      if (!this.postContent.trim()){
        alert("Din post är tom. Skriv ett inlägg först.")
        return;
      }

      const postData = {
        topic_id: this.topicId,
        content: this.postContent
      };

      axios.post('/api/postTopics', postData)
        .then(response => {
          this.$emit('postSubmitted', this.postContent);
          this.postContent = "";

        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>
