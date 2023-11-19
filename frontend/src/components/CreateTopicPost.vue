<template>

  <div>
    <form class="formContainer" @submit.prevent="submitForm">
      <div class="form-control mb-4">
        <label class="label">
          <span class="label-text">Topic</span>
        </label>
        <input v-model="topicTitle" type="text" placeholder="Type here" class="input input-bordered" />
      </div>

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
      topicTitle: "",
      postContent: ""
    };
  },
  methods: {
    submitForm() {
      const postData = {
        title: this.topicTitle,
        content: this.postContent
      };

      axios.post('/api/postTopics', postData)
        .then(response => {
          console.log(response.data);
          this.topicTitle = "";
          this.postContent = "";
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>
