<!-- bookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{name}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Name</label>
       <input class="u-full-width" type="text"
         v-model="publisher.name">
      </div>
      <div class="six columns">
       <label for="editionInput">Country</label>
       <input class="u-full-width" type="text"
          v-model="publisher.country">
      </div>
      <div class="six columns">
       <label for="copyrightInput">Founded</label>
       <input class="u-full-width" type="text"
          v-model="publisher.founded">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="emailInput">Publisher name</label>
       <input class="u-full-width" type="email"
          v-model="publisher.publisher_name">
      </div>
      <router-link class="button button-primary" 
        to="/publisher">Back</router-link>
     </div>
    </form>
   </div>
  </div>
</template>

<script>
	
import { useRoute } from 'vue-router'
	
export default {
  props: ['show'],
  data: function() {
    return {
      title: "Publisher Data",
      publisher: {'name':'','country':'','founded':'','publisher_name':''},
    }
  },
  created () {
   const route = useRoute();  
   this.findPublisher(route.params.id);
  },
  methods: {
    findPublisher: function(id) {
      fetch('/.netlify/functions/publishers/'+id,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.publisher = result;
        })
    },
  }
}
</script>