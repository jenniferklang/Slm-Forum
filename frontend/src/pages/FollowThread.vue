<template>
  <div>
    <h1>
      {{ topic.topic_title }}
      <span
        >Topic created by: {{ topic.topic_created_by }} at
        {{ formatDate(topic.topic_created_at) }}</span
      >
    </h1>

    <div v-for="(post, index) in posts" :key="index">
      <p>
        {{ post.post_content }}
        <span>
          by: {{ post.post_created_by }} at
          {{ formatDate(post.post_created_at) }}</span
        >
      </p>

      <hr />
    </div>

    <CreatePost />
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
      topic: {}, // Initialize an empty object for the topic
      posts: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `/api/thread/${parseInt(this.$route.params.topicId)}`
        );
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
