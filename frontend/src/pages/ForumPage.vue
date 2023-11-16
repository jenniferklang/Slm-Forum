<template>
  <div>
    <div class="overflow-x-auto">
      <div
        class="hero min-h-screen"
        style="
          background-image: url(https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=400);
        "
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Let's talk</h1>
            <p class="mb-5">
              The ultimate destination for meaningful conversations and vibrant
              discussions!
            </p>
            <p></p>
            <p>Ready to share? Let's talk!</p>
          </div>
        </div>
      </div>
      <div class="custom-input-container">
        <input
          type="text"
          placeholder="Search topic"
          class="input input-bordered w-full max-w-xs custom-input-style"
          v-model="searchTopic"
          @input="applyFilters"
        />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Topic</th>
            <th>Content</th>
            <th>Posted At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(topic, index) in paginatedTopics" :key="topic.id">
            <th>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
            <td>{{ topic.title }}</td>
            <td v-if="topic.post">{{ topic.post.content }}</td>
            <td v-else>No content available</td>
            <td>{{ topic.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <button class="btn" @click="goToPage(currentPage - 1)">Previous</button>
      <div class="pagination-center">
        <button class="btn" @click="sortByName">Sort by letter</button>
        <button class="btn" @click="sortBy('created_at')">Sort by date</button>
      </div>
      <button class="btn" @click="goToPage(currentPage + 1)">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      topicsData: [],
      sortedTopics: [],
      currentPage: 1,
      itemsPerPage: 10,
      searchTopic: "",
    };
  },
  computed: {
    paginatedTopics() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.sortedTopics.slice(startIndex, endIndex);
    },
  },
  methods: {
    fetchTopics() {
      axios
        .get("/api/forum", { withCredentials: true })
        .then((response) => {
          console.log("Response data:", response.data);
          this.topicsData = response.data;
          this.sortByName();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    sortBy(property) {
      this.sortedTopics = [...this.topicsData].sort((a, b) => {
        if (property === "created_at") {
          return new Date(b[property]) - new Date(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      });
    },

    sortByName() {
      this.sortBy("title");
      this.applyFilters();
    },
    goToPage(pageNumber) {
      if (
        pageNumber > 0 &&
        pageNumber <= Math.ceil(this.sortedTopics.length / this.itemsPerPage)
      ) {
        this.currentPage = pageNumber;
      }
    },
    applyFilters() {
      // Här används sökfilter
      const searchFilteredTopics = this.searchTopic
        ? this.topicsData.filter((topic) =>
            topic.title.toLowerCase().includes(this.searchTopic.toLowerCase())
          )
        : this.topicsData;
      // Här uppdateras de sorterade ämnena baserat på sökfiltret
      this.sortedTopics = searchFilteredTopics.slice().sort((a, b) => {
        // Hårdkodad "title" för att sortera efter titel
        return a["title"].localeCompare(b["title"]);
      });
    },
  },

  mounted() {
    this.fetchTopics();
  },
};
</script>

<style>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-center {
  display: flex;
  gap: 10px;
  align-items: center;
}

.hero {
  min-height: 300px;

  background-size: cover;
  margin-bottom: 60px;
}

.hero-overlay {
  background-color: rgba(0, 0, 0, 0.6);
}
.hero-content {
  text-align: center;
  color: whitesmoke;
}

.custom-input-container {
  position: relative;
}
.custom-input-style {
  position: absolute;
  bottom: 5%;
  right: 5px;
  z-index: 1;
  width: 15%;
  height: 40px;
}

.table {
  margin-bottom: 50px;
}
</style>
