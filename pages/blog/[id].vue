<!-- pages/blog/[id].vue -->
<script setup>
import { useRoute } from 'vue-router';
import { Blog } from '@/_mockApis/custom-components/index';
import Header from '@/layouts/header/Header.vue';


const route = useRoute();
const blogId = Number(route.params.id) || route.params.id;
console.log('All Blog Data:', Blog);
const blog = Blog.find((b) => b.id === blogId);

console.log('Blog ID:', blogId);
console.log('Blog Data:', blog);

if (!blog) {
  console.error(`Blog post with ID ${blogId} not found`);
}
</script>




<style>
.blogs-content {
  margin-top: 4rem;
  padding: 2rem;
}

.img-card {
  padding: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.img-block {
  width: 60%;
  text-align: center;
}

.blog-img {
  width: 100%;
  max-width: 100%;
  height: auto;
}

@media screen and (max-width: 767px) {
  .v-card {
    padding: 1rem;
  }

  .blog-img {
    max-width: 100%;
  }
}
</style>
<template>
  <Header />
  <div class="blogs-content" v-if="blog">
    <v-card class="img-card">
      <div class="img-block">
        <v-img class="blog-img" :src="blog.img" alt="blog image"></v-img>
      </div>
      <div class="content-block pt-5">
        <p>{{ blog.date }}</p>
        <h1>{{ blog.title }}</h1>
        <p class="pt-2">{{ blog.desc }}</p>

      </div>
    </v-card>
  </div>
  <div v-else>
    <p>Blog post not found.</p>
  </div>
</template>
