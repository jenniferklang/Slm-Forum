<template>
  <div>
    <h1>Forum</h1>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th @click="sortBy('title')">Topic</th>
            <th @click="sortBy('created_at')">Posted At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(topic, index) in sortedTopics" :key="topic.id">
            <th>{{ index + 1 }}</th>
            <td>{{ topic.title }}</td>
            <td>{{ topic.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <button class="btn" @click="sortByName">Sortera efter Namn</button>
      <button class="btn" @click="sortBy('created_at')">
        Sortera efter Datum
      </button>
    </div>
    <div class="join">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 22</button>
      <button class="join-item btn">»</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topicsData: [],
      sortedTopics: [],
      currentSort: null,
    };
  },
  methods: {
    fetchTopics() {
      fetch("/api/forum")
        .then((response) => response.json())
        .then((data) => {
          this.topicsData = data;
          this.sortByName();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    sortBy(property) {
      if (this.currentSort === property) {
        this.sortedTopics.reverse();
      } else {
        this.sortedTopics = [...this.topicsData].sort((a, b) => {
          if (property === "created_at") {
            return new Date(b[property]) - new Date(a[property]);
          } else {
            return a[property].localeCompare(b[property]);
          }
        });

        this.currentSort = property;
      }
    },
    sortByName() {
      this.sortBy("title");
    },
  },
  mounted() {
    this.fetchTopics();
  },
};
</script>
