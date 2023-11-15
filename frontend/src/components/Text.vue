<template>
  <h1>{{ string }}</h1>
</template>

<script>
export default {
  name: "Text",

  data: () => ({
    string: "Hello World!",
  }),

  mounted() {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
};
</script>
