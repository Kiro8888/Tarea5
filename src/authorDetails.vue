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
         v-model="author.name">
      </div>
      <div class="six columns">
       <label for="editionInput">Nationality</label>
       <input class="u-full-width" type="text"
          v-model="author.nationality">
      </div>
      <div class="six columns">
       <label for="copyrightInput">Occupation</label>
       <input class="u-full-width" type="text"
          v-model="author.occupation">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="emailInput">Pseudonym</label>
       <input class="u-full-width" type="email"
          v-model="author.pseudonym">
      </div>
      <router-link class="button button-primary" 
        to="/author">Back</router-link>
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
      title: "Author Data",
      author: {'name':'','nationality':'','occupation':'','pseudonym':''},
    }
  },
  created () {
   const route = useRoute();  
   this.findAuthor(route.params.id);
  },
  methods: {
    findAuthor: function(id) {
      fetch('/.netlify/functions/authors/'+id,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.author = result;
        })
    },
  }
}
</script>