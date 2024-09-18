<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ author.name }}</h2>
      <p><strong>Nationality:</strong> {{ author.nationality }}</p>
      <p><strong>Occupation:</strong> {{ author.occupation }}</p>
      <p><strong>Pseudonym:</strong> {{ author.pseudonym }}</p>

      <h3>Books</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Edition</th>
            <th>Copyright</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.edition }}</td>
            <td>{{ book.copyright }}</td>
            <td>{{ getPublisherName(book.publisher_id) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: {},
      books: [],
      publishers: []
    }
  },
  methods: {
    getAuthor() {
      const authorId = this.$route.params.id;
      fetch(`/.netlify/functions/authors/${authorId}`, { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.author = result;
          this.loadBooks();
        });
    },
    loadBooks() {
      fetch('/.netlify/functions/books', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.books = result.filter(book => this.author.book_ids.includes(book.id));
        });
    },
    loadPublishers() {
      fetch('/.netlify/functions/publishers', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.publishers = result;
        });
    },
    getPublisherName(publisherId) {
      const publisher = this.publishers.find((p) => p.id === publisherId);
      return publisher ? publisher.name : 'Unknown Publisher';
    }
  },
  mounted() {
    this.getAuthor();
    this.loadPublishers();
  }
}
</script>
