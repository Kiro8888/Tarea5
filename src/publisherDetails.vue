<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ publisher.name }}</h2>
      <p><strong>Country:</strong> {{ publisher.country }}</p>
      <p><strong>Founded:</strong> {{ publisher.founded }}</p>
      <p><strong>Publisher Name:</strong> {{ publisher.publisher_name }}</p>

      <h3>Authors</h3>
      <ul>
        <li v-for="author in publisher.authors" :key="author.id">
          <router-link :to="'/author/show/' + author.id">
            {{ author.name }}
          </router-link>
        </li>
      </ul>
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
        books: [],
        authors: [] // Aquí se cargarán los autores filtrados
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
          // Cargar libros y autores asociados
          this.loadBooks(result.book_ids);
          this.loadAuthors(result.author_ids);
        });
    },
    loadBooks(bookIds) {
      fetch('/.netlify/functions/books', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(books => {
          // Filtrar los libros comparando como cadenas
          this.publisher.books = books.filter(book => bookIds.includes(String(book.id)));
        });
    },
    loadAuthors(authorIds) {
      fetch('/.netlify/functions/authors', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(authors => {
          // Filtrar los autores comparando como cadenas
          this.publisher.authors = authors.filter(author => authorIds.includes(String(author.id)));
        });
    }
  }
}
</script>

<style scoped>
/* Agrega tus estilos personalizados aquí si es necesario */
</style>
