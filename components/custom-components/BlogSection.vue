<script setup lang="ts">
import { Blog } from '@/_mockApis/custom-components/index';
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

@media (max-width: 600px) {
  /* Styles for phone screens */
}
</style>
<template>
    <div class="blogs" id="BlogSection">
        <v-container class="container-blogs">
            <v-row style="justify-content: space-around;">
                <!-- Main Blog Post -->
                <v-col cols="12" md="6" sm="12">
                    <v-card elevation="0" variant="outlined">
                        <div class="hover-card overflow-hidden lh-10 rounded-md position-relative">
                            <NuxtLink :to="`/blog/${Blog[0].id}`" class="text-decoration-none">
                                <v-img :src="Blog[0].img" height="250px" alt="main post" cover
                                    class="zoom-in w-100"></v-img>
                            </NuxtLink>
                        </div>
                        <div class="pa-4 mt-2">
                            <h5 class="text-h5 font-weight-bold mb-3 lh-normal">
                                <NuxtLink :to="`/blog/${Blog[0].id}`" class="text-decoration-none text-dark hover-primary">
                                    {{ Blog[0].title }}
                                </NuxtLink>
                            </h5>
                            <p class="text-muted text-subtitle-1 font-weight-regular mb-3">{{ Blog[0].desc }}</p>
                            <p class="text-muted text-subtitle-1">{{ Blog[0].date }}</p>
                        </div>
                    </v-card>
                </v-col>

                <!-- Recent Posts -->
                <v-col cols="12" md="4" sm="12">
                    <div class="recent-post-title mb-4">Recent Posts</div>
                    <v-row>
                        <v-col cols="12" v-for="card in Blog.slice(1, 4)" :key="card.id">
                            <v-card elevation="0" variant="outlined" class="mb-3" style="padding: 8px;">
                                <v-row>
                                    <v-col cols="4">
                                        <v-img :src="card.img" height="75px" alt="recent post" cover></v-img>
                                    </v-col>
                                    <v-col cols="8">
                                        <h6 class="text-h6 font-weight-bold mb-1 lh-normal">
                                            <NuxtLink :to="`/blog/${card.id}`" class="text-decoration-none text-dark hover-primary">
                                                {{ card.title }}
                                            </NuxtLink>
                                        </h6>
                                        <p class="text-muted text-subtitle-1">{{ card.date }}</p>
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