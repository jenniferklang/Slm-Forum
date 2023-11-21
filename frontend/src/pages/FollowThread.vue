<template>
  <div>
    <h1>{{ topic.title }}</h1>
    <p>Topic created by: {{ topic.topic_created_by }}</p>
    <p>Topic created at: {{ formatDate(topic.topic_created_at) }}</p>

    <div v-for="post in sortedPosts" :key="post.post_id">
      <p>{{ post.content }}</p>
      <p>Post created by: {{ post.post_created_by }}</p>
      <p>Post created at: {{ formatDate(post.post_created_at) }}</p>
      <hr />
    </div>
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue';
import axios from 'axios';

export default {
  props: {
    topicId: String,
  },
  components: { CreatePost },
  data() {
    return {
      topic: {},
      posts: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `/api/thread/${this.$route.params.topicId}`
        );
        console.log(response.data);
        console.log('Topic ID:', topicId);
        this.topic = response.data[0];
        this.posts = response.data.slice(1);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    console.log(this.$route.params.topicId);
    this.fetchData();
  },
};
</script>
