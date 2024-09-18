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
            <router-link :to="'/author/show/' + book.author.id" class="u-full-width">
              {{ book.author.name }}
            </router-link>
          </div>
          <div class="six columns">
            <label for="publisherInput">Publisher</label>
            <router-link :to="'/publisher/show/' + book.publisher.id" class="u-full-width">
              {{ book.publisher.name }}
            </router-link>
          </div>
          <router-link class="button button-primary" to="/book">Back</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  props: ['create', 'edit', 'show'],
  data() {
    return {
      title: "Book Data",
      book: {
        title: '',
        edition: '',
        copyright: '',
        author: { id: '', name: '' },
        publisher: { id: '', name: '' }
      },
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
        })
    },
    updateBook() {
      this.prof['_method'] = 'PUT';
      const route = useRoute();
      const id = route.params.id;
      fetch(`/server/book/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(this.book)
      }).then(() => {
        this.$router.push('/book');
      })
    },
    createBook() {
      fetch('/server/book', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(this.book)
      }).then(() => {
        this.$router.push('/book');
      })
    }
  }
}
</script>
