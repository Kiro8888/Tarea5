<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Founded</th>
            <th>Publisher Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishers" :key="publisher.id">
            <td>{{ publisher.name }}</td>
            <td>{{ publisher.country }}</td>
            <td>{{ publisher.founded }}</td>
            <td>{{ publisher.publisher_name }}</td>
            <td>
              <router-link class="button" :to="'/publisher/show/' + publisher.id">Show</router-link>
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
      publishers: [],
      title: 'PublisherList'
    }
  },
  methods: {
    allPublisher() {
      fetch('/.netlify/functions/publishers', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(result => {
          this.publishers = result;
        })
    }
  },
  mounted() {
    this.allPublisher();
  }
}
</script>
