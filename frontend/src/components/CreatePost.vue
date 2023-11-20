<template>
  <div>
    <form class="formContainer" @submit.prevent="submitForm">
      <div class="form-control mb-4">
        <label class="label">
          <span class="label-text">Post</span>
        </label>
        <textarea v-model="postContent" class="textarea textarea-bordered h-24" placeholder="Type here"></textarea>
      </div>
      <button class="btn btn-outline btn-primary mb-4" type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      postContent: "",
    };
  },
  methods: {
    submitForm() {
      const postData = {
        topic_id: 1,
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
