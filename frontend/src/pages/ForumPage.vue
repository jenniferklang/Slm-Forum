<template>
  <div>
    <div class="overflow-x-auto">
      <div v-if="heroImage" class="hero min-h-screen" :style="heroStyle">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Rensa luften</h1>
            <p class="mb-5">
              Den ultimata destinationen för meningsfulla konversationer och
              livliga diskussioner!
            </p>
            <p>Redo att dela med dig? Rensa luften!</p>
          </div>
        </div>
      </div>
      <router-link to="/posttopic">
        <button class="btn">Nytt ämne</button>
      </router-link>
      <div class="custom-input-container">
        <input
          type="text"
          placeholder="Sök ämne"
          class="input input-bordered w-full max-w-xs custom-input-style"
          v-model="searchTopic"
          @input="applyFilters"
        />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th class="marked-btn" @click="sortByName">
              Ämne
              <span v-if="currentSort === 'title'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th class="marked-btn" @click="sortByContent">
              Innehåll
              <span v-if="currentSort === 'post'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
            <th class="marked-btn" @click="sortBy('created_at')">
              Publicerad
              <span v-if="currentSort === 'created_at'">{{
                sortOrder === "asc" ? "▲" : "▼"
              }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(topic, index) in sortedTopics" :key="topic.id">
            <th>{{ calculateTopicNumber(index) }}</th>
            <td>
              <router-link
                :to="{
                  name: 'followThread',
                  params: { topicId: topic.topic_id },
                }"
              >
                {{ topic.title }}
              </router-link>
            </td>
            <td>{{ limitedContent(topic.content, 60) }}</td>
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
        Föregående
      </button>
      <div class="pagination-center">
        <!--<button class="btn" @click="sortByName">Sök bokstav</button>-->
        <!--<button class="btn" @click="sortBy('created_at')">Sök datum</button>-->
      </div>
      <button class="btn" @click="goToPage(currentPage + 1)">
        <!--:disabled="currentPage === totalPages"
      >-->
        Nästa
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
      searchTopic: "",
      sortOrder: "desc",
      currentSort: "created_at",
      heroImage: null,
      heroImageUrl:
        "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=400",
      dynamicTotalPages: [],
      itemsPerPage: 10,
    };
  },
  computed: {
    heroStyle() {
      return {
        backgroundImage: this.heroImage ? `url(${this.heroImage})` : "none",
      };
    },

    totalPages() {
      return 10;
      // return Math.ceil(this.topicsData.length / this.itemsPerPage);
    },
  },
  watch: {
    currentPage() {
      this.fetchTopics();
    },
  },

  mounted() {
    this.fetchTopics();
    this.preloadImage(this.heroImageUrl);
    this.sortBy("created_at");
  },
  methods: {
    fetchTopics() {
      const page = this.currentPage;

      axios
        .get("/api/forum", {
          withCredentials: true,
          params: { page },
        })
        .then((response) => {
          // Uppdatera ordningen på ämnena här
          this.topicsData = response.data.reverse();
          this.sortByName();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },

    limitedContent(content, maxLength) {
      if (content && content !== null && content.length > maxLength) {
        return content.substring(0, maxLength) + "...";
      } else {
        return content;
      }
    },

    goToPage(pageNumber) {
      console.log(`Navigating to page ${pageNumber}`);
      console.log(`Total pages: ${this.totalPages}`);
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },

    applyFilters() {
      const searchFilteredTopics = this.searchTopic
        ? this.topicsData.filter((topic) =>
            topic.title.toLowerCase().startsWith(this.searchTopic.toLowerCase())
          )
        : this.topicsData;

      this.sortedTopics = searchFilteredTopics.slice().sort((a, b) => {
        return new Date(b["created_at"]) - new Date(a["created_at"]);
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

    sortByName() {
      this.sortBy("title");
      this.applyFilters();
    },
    sortByContent() {
      this.sortBy("post");
      this.applyFilters();
    },
    //Jennifer, du får kolla över denna igen..
    sortBy(property) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";

      const sortedByDate = [...this.topicsData].sort((a, b) => {
        return this.sortOrder === "asc"
          ? new Date(a["created_at"]) - new Date(b["created_at"])
          : new Date(b["created_at"]) - new Date(a["created_at"]);
      });

      this.sortedTopics = sortedByDate.sort((a, b) => {
        const order = this.sortOrder === "asc" ? 1 : -1;

        if (property === "created_at") {
          return order * (new Date(b[property]) - new Date(a[property]));
        } else {
          return order * a[property].localeCompare(b[property]);
        }
      });
    },
    preloadImage(url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.heroImage = url;
      };
    },
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

.marked-btn {
  text-decoration: underline;
  cursor: pointer;
}
</style>
