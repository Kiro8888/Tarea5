<template>
    <div>
      <h1>Tarea 2</h1>
      <p>
        Dentro de la vista detalles de cada registro podremos navegar entre entidades
      </p>
      <ul>
        <li>     <router-link 
       style="margin-right: 10px;" to="/book">Books
      </router-link> </li>
        <li> <router-link 
       style="margin-right: 10px;" to="/author">Authors
      </router-link></li>
        <li>      <router-link 
       to="/publisher">Publishers
      </router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    // Puedes agregar métodos o lógica si es necesario
  };
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  li {
    margin: 8px 0;
  }
  </style>
  