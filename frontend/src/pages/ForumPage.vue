<template>
  <div>
    <div class="overflow-x-auto">
      <div class="hero min-h-screen" :style="heroStyle">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Let's talk</h1>
            <p class="mb-5">
              The ultimate destination for meaningful conversations and vibrant
              discussions!
            </p>
            <p>Ready to share? Let's talk!</p>
          </div>
        </div>
      </div>
      <router-link to="/posttopic">
        <button className="btn btn-primary">Start New Topic</button>
    </router-link>
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
            <th>{{ calculateTopicNumber(index) }}</th>
            <td>{{ topic.title }}</td>
            <td>{{ topicContent(topic) }}</td>
            <td>{{ formatDate(topic.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <button
        class="btn"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <div class="pagination-center">
        <button class="btn" @click="sortByName">Sort by letter</button>
        <button class="btn" @click="sortBy('created_at')">Sort by date</button>
      </div>
      <button
        class="btn"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
    heroStyle() {
      return {
        backgroundImage:
          "url(https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=400)",
      };
    },
    paginatedTopics() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.sortedTopics.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.sortedTopics.length / this.itemsPerPage);
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
    applyFilters() {
      const searchFilteredTopics = this.searchTopic
        ? this.topicsData.filter((topic) =>
            topic.title.toLowerCase().startsWith(this.searchTopic.toLowerCase())
          )
        : this.topicsData;

      this.sortedTopics = searchFilteredTopics.slice().sort((a, b) => {
        return a["title"].localeCompare(b["title"]);
      });
    },
    calculateTopicNumber(index) {
      return (this.currentPage - 1) * this.itemsPerPage + index + 1;
    },
    //Kanske finns andra sätt att använda moment på beroende på hur man vill ha det
    //Eller om man vill ha det på engelska
    //Man kan även köra install moment moment/locale/sv
    formatDate(dateString) {
      const postDate = moment(dateString);
      const today = moment().startOf("day");
      const yesterday = moment().subtract(1, "days").startOf("day");

      if (postDate.isSame(today, "d")) {
        return "Idag " + postDate.format("HH:mm");
      } else if (postDate.isSame(yesterday, "d")) {
        return "Igår " + postDate.format("HH:mm");
      } else if (postDate.isBefore(yesterday)) {
        return postDate.format("MMM DD HH:mm");
      } else {
        return postDate.calendar();
      }
    },

    goToPage(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    sortByName() {
      this.sortBy("title");
      this.applyFilters();
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
    topicContent(topic) {
      return topic.post ? topic.post.content : "No content available";
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
