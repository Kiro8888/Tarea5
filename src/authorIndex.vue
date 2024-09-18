<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nationality</th>
            <th>Occupation</th>
            <th>Pseudonym</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author.id">
            <td>{{ author.name }}</td>
            <td>{{ author.nationality }}</td>
            <td>{{ author.occupation }}</td>
            <td>{{ author.pseudonym }}</td>
            <td>
              <router-link class="button" :to="'/author/show/' + author.id">
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
      authors: [],
      title: 'AuthorList'
    }
  },
  methods: {
    allAuthor() {
      fetch('/.netlify/functions/authors', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.authors = result;
        })
    },
  },
  mounted() {
    this.allAuthor()
  }
}
</script>
