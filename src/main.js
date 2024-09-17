// src/main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import './css/normalize.css';
import './css/skeleton.css';

import bookIndex from './bookIndex.vue'
import bookDetails from './bookDetails.vue'

import publisherDetails from './publisherDetails.vue';
import publisherIndex from './publisherIndex.vue';

const routes = [
  { path: '/book', 
    component: bookIndex,
    props: true},
  { path: '/book/show/:id',
    component: bookDetails,
    props: {show: true}},
  { path: '/',
    component: bookIndex,
    props: true},

    //publishers
    { path: '/publisher', 
      component: publisherIndex,
      props: true},
    { path: '/publisher/show/:id',
      component: publisherDetails,
      props: {show: true}},
    // { path: '/',
    //   component: publisherIndex,
    //   props: true},

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

let app = createApp(App)

app.use(router)

app.mount('#app')