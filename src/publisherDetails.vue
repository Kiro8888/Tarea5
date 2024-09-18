<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ publisher.name }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="nameInput">Name</label>
            <input class="u-full-width" type="text" v-model="publisher.name" disabled>
          </div>
          <div class="six columns">
            <label for="countryInput">Country</label>
            <input class="u-full-width" type="text" v-model="publisher.country" disabled>
          </div>
          <div class="six columns">
            <label for="foundedInput">Founded</label>
            <input class="u-full-width" type="text" v-model="publisher.founded" disabled>
          </div>
          <div class="six columns">
            <label for="publisherNameInput">Publisher Name</label>
            <input class="u-full-width" type="text" v-model="publisher.publisher_name" disabled>
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/publisher">Back</router-link>
        </div>
      </form>
      <h3>Books Published</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Edition</th>
            <th>Copyright</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in publisher.books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.edition }}</td>
            <td>{{ book.copyright }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      publisher: {
        name: '',
        country: '',
        founded: '',
        publisher_name: '',
        books: []
      }
    }
  },
  created() {
    const route = useRoute();
    this.findPublisher(route.params.id);
  },
  methods: {
    findPublisher(id) {
      fetch(`/.netlify/functions/publishers/${id}`, { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(result => {
          this.publisher = result;
        })
    }
  }
}
</script>
