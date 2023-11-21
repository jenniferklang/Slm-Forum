<template>
  <h1>Dubbelkolla så du kommit till rätt ämne i webbläsarfältet</h1>
  <CreatePost />
</template>

<script>
import CreatePost from '../components/CreatePost.vue';

export default {
    props: {
        topicId: Number,
    },
    components: { CreatePost }
};
</script>
