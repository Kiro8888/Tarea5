<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Edition</th>
            <th>Copyright</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.edition }}</td>
            <td>{{ book.copyright }}</td>
            <td>{{ getAuthorName(book.author_id) }}</td>
            <td>{{ getPublisherName(book.publisher_id) }}</td>
            <td>
              <router-link class="button" :to="'/book/show/' + book.id">
                Show
              </router-link>
            </td>
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
      books: [],
      authors: [],
      publishers: [],
      title: 'BookList'
    };
  },
  methods: {
    allBooks() {
      fetch('/.netlify/functions/books', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.books = result;
        });
    },
    allAuthors() {
      fetch('/.netlify/functions/authors', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.authors = result;
        });
    },
    allPublishers() {
      fetch('/.netlify/functions/publishers', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.publishers = result;
        });
    },
    getAuthorName(authorId) {
      const author = this.authors.find((a) => a.id === authorId);
      return author ? author.name : 'Unknown Author';
    },
    getPublisherName(publisherId) {
      const publisher = this.publishers.find((p) => p.id === publisherId);
      return publisher ? publisher.name : 'Unknown Publisher';
    }
  },
  mounted() {
    this.allBooks();
    this.allAuthors();
    this.allPublishers();
  }
};
</script>
