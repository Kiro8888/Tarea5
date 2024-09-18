<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="titleInput">Title</label>
            <input class="u-full-width" type="text" v-model="book.title" disabled>
          </div>
          <div class="six columns">
            <label for="editionInput">Edition</label>
            <input class="u-full-width" type="text" v-model="book.edition" disabled>
          </div>
          <div class="six columns">
            <label for="copyrightInput">Copyright</label>
            <input class="u-full-width" type="text" v-model="book.copyright" disabled>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="authorInput">Author</label>
            <router-link :to="'/author/show/' + book.author_id">
              {{ book.author }}
            </router-link>
          </div>
          <div class="six columns">
            <label for="publisherInput">Publisher</label>
            <router-link :to="'/publisher/show/' + book.publisher_id">
              {{ book.publisher }}
            </router-link>
          </div>
        </div>
        <router-link class="button button-primary" to="/book">Back</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      title: "Book Data",
      book: {
        title: '',
        edition: '',
        copyright: '',
        author_id: null,
        publisher_id: null,
        author: '',
        publisher: ''
      }
    }
  },
  created() {
    const route = useRoute();
    this.findBook(route.params.id);
  },
  methods: {
    findBook(id) {
      fetch(`/.netlify/functions/books/${id}`, { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(result => {
          this.book = result;
          this.loadAuthor();
          this.loadPublisher();
        });
    },
    loadAuthor() {
      fetch(`/.netlify/functions/authors/${this.book.author_id}`, { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(author => {
          this.book.author = author.name;
        });
    },
    loadPublisher() {
      fetch(`/.netlify/functions/publishers/${this.book.publisher_id}`, { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(publisher => {
          this.book.publisher = publisher.name;
        });
    }
  }
}
</script>
