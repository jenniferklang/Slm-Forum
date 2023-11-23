<template>
  <div class="buttonContainer">
  <router-link to="/forum">
        <button class="btn mt-4">Tillbaka till forumet</button>
      </router-link>
    </div>
  <div class="forumContainer">
    <div class="created">Startad av: {{ topic.topic_created_by }} Datum {{ formatDate(topic.topic_created_at) }}</div>
    <h1>{{ topic.topic_title }} </h1>

    <div v-for="(post, index) in sortedPosts" :key="index">
      <div class="postContainer">
        <div class="created"> Av: {{ post.post_created_by ? post.post_created_by : 'dig' }} Datum {{ post.post_created_at ? formatDate(post.post_created_at) : 'precis nu' }}</div>
      <p>{{ post.post_content }} </p>
    </div>

    </div>

    <CreatePost @postSubmitted="handlePostSubmitted" />
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
import axios from "axios";

export default {
  props: {
    topicId: Number,
  },
  components: { CreatePost },
  data() {
    return {
      topic: {},
      posts: [],
    };
  },
  methods: {
    handlePostSubmitted(newPostContent) {

      this.posts.push({ post_content: newPostContent });
    },
    async fetchData() {
      try {
        const response = await axios.get(`/api/thread/${parseInt(this.$route.params.topicId)}`);
        console.log(response)
        this.topic = response.data[0];
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
  },
  computed: {
    sortedPosts() {
      return this.posts.sort(
        (a, b) => new Date(a.post_created_at) - new Date(b.post_created_at)
      );
    },
  },
  mounted() {

    this.fetchData();
  },
};
</script>
<style scoped>
  .forumContainer {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .buttonContainer{
    max-width: 800px;
    margin: 20px auto;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .postContainer {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    min-height: 100px;
  }

  p {
    margin: 0;
  }

  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 10px 0;
  }

  .created {
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
  }

  .createPostContainer {
    margin-top: 20px;
  }

</style>
