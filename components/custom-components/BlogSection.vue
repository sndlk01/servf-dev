<script setup lang="ts">
import { ref } from 'vue';
import { Blog as BlogData } from '../../_mockApis/custom-components/index';

interface BlogImageType {
  default?: string;
  src?: string;
}

interface BlogType {
  id: number;
  title: string;
  desc: string;
  badge: string;
  date: string;
  view: string;
  name: string;
  img: string | BlogImageType;
  imageUrl: string;
  link: string;
}

// แปลงข้อมูลจาก BlogData และเพิ่ม link และ imageUrl
const blogs = ref<BlogType[]>(BlogData.map(blog => {
  // กำหนด URL ของรูปภาพตามรูปแบบข้อมูล
  let imageUrl = '';
  if (typeof blog.img === 'string') {
    imageUrl = blog.img;
  } else if (blog.img && typeof blog.img === 'object') {
    // ถ้า blog.img เป็น object จาก import (เช่น blog1, blog2)
    const imgObj = blog.img as BlogImageType;
    imageUrl = imgObj.default || imgObj.src || '';
  }

  return {
    ...blog,
    // เพิ่ม link โดยใช้ id เป็น path parameter
    link: `/blog/${blog.id}`,
    // กำหนด imageUrl
    imageUrl
  };
}));

const imageError = ref(false);

const handleImageError = (blog: BlogType) => {
  console.error(`Failed to load image for blog: ${blog.title}`);
  imageError.value = true;
};
</script>

<style>
.blogs {
  background: rgb(146, 122, 244);
  background: linear-gradient(90deg, rgba(146, 122, 244, 1) 0%, rgba(250, 164, 177, 1) 100%);
  padding: 4rem 4rem;
}

.container-blogs {
  background-color: #fff;
  padding: 5rem 1rem;
  border-radius: 2rem;
}

.blog-image {
  width: 100%;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 600px) {
  .blogs {
    padding: 2rem 1rem;
  }

  .container-blogs {
    padding: 2rem 0.5rem;
  }
}
</style>

<template>
  <div class="blogs" id="BlogSection">
    <v-container class="container-blogs">
      <v-row style="justify-content: space-around;">
        <!-- Main Blog Post -->
        <v-col cols="12" md="6" sm="12" v-if="blogs.length > 0">
          <v-card elevation="0" variant="outlined">
            <div class="hover-card overflow-hidden lh-10 rounded-md position-relative">
              <NuxtLink :to="blogs[0].link" class="text-decoration-none">
                <div v-if="!imageError" class="blog-image" :style="{ backgroundImage: `url(${blogs[0].imageUrl})` }">
                </div>
                <v-img v-else src="/path/to/fallback-image.jpg" height="250px" alt="fallback image" cover
                  class="zoom-in w-100"></v-img>
              </NuxtLink>
            </div>
            <div class="pa-4 mt-2">
              <h5 class="text-h5 font-weight-bold mb-3 lh-normal">
                <NuxtLink :to="blogs[0].link" class="text-decoration-none text-dark hover-primary">
                  {{ blogs[0].title }}
                </NuxtLink>
              </h5>
              <p class="text-muted text-subtitle-1 font-weight-regular mb-3">{{ blogs[0].desc }}</p>
              <div class="d-flex align-center mt-4">
                <small class="text-muted">{{ blogs[0].date }}</small>
                <div class="ml-auto text-muted">{{ blogs[0].view }}</div>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- Recent Posts -->
        <v-col cols="12" md="4" sm="12">
          <div class="recent-post-title mb-4">Recent Posts</div>
          <v-row>
            <v-col cols="12" v-for="blog in blogs.slice(1, 4)" :key="blog.id">
              <v-card elevation="0" variant="outlined" class="mb-3" style="padding: 8px;">
                <v-row>
                  <v-col cols="4">
                    <v-img :src="blog.imageUrl" height="75px" alt="recent post" cover @error="handleImageError(blog)">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                  <v-col cols="8">
                    <h6 class="text-h6 font-weight-bold mb-1 lh-normal">
                      <NuxtLink :to="blog.link" class="text-decoration-none text-dark hover-primary">
                        {{ blog.title }}
                      </NuxtLink>
                    </h6>
                    <div class="d-flex align-center">
                      <small class="text-muted">{{ blog.date }}</small>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>