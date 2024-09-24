<template>
    <v-app>
        <v-app-bar color="primary" dark app>
            <v-app-bar-title>SERVF</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="logout">
                logout
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid class="fill-height">
                <v-row justify="center" align="center">
                    <v-col cols="12" sm="6" md="4">
                        <v-btn block color="primary" size="x-large" class="mb-4" @click="manageReviews">
                            เพิ่ม / แก้ไข reviews
                        </v-btn>
                        <v-btn block color="primary" size="x-large" @click="manageBlogs">
                            เพิ่ม / แก้ไข blogs
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped>
/* You can add any custom styles here, but Vuetify provides most styling out of the box */
</style>