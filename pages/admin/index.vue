<template>
    <v-app>
      <v-app-bar color="primary" prominent>
        <v-toolbar-title>SERVF ADMIN</v-toolbar-title>
  
        <v-spacer></v-spacer>
<!--   
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn> -->
  
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" lg="3">
              <AdminEdit
                title="รีวิวทั้งหมด"
                button-text="จัดการรีวิว"
                @button-click="manageReviews"
              />
            </v-col>
  
            <v-col cols="12" sm="6" lg="3">
              <AdminEdit
                title="บล็อกทั้งหมด"
                button-text="จัดการบล็อก"
                @button-click="manageBlogs"
              />
            </v-col>
  
            <!-- <v-col cols="12" sm="6" lg="3">
              <AdminEdit
                title="ผู้ใช้ทั้งหมด"
                :value="totalUsers"
                button-text="จัดการผู้ใช้"
                @button-click="manageUsers"
              />
            </v-col> -->
  
            <!-- <v-col cols="12" sm="6" lg="3">
              <AdminEdit
                title="การเข้าชมวันนี้"
                :value="todayVisits"
                button-text="ดูการวิเคราะห์"
                @button-click="viewAnalytics"
              />
            </v-col> -->
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  definePageMeta({
    middleware: 'auth'
  })
  
  const router = useRouter()
  
  // Replace these with actual data from your backend
  const totalReviews = ref(150)
  const totalBlogs = ref(75)
  const totalUsers = ref(500)
  const todayVisits = ref(1234)
  
  const logout = () => {
    // Implement your logout logic here
    console.log('Logging out...')
    // After logout, redirect to login page
    router.push('/auth/login')
  }
  
  const manageReviews = () => {
    router.push('/admin/dashboard/reviews')
  }
  
  const manageBlogs = () => {
    router.push('/admin/dashboard/blogs')
  }
  
  const manageUsers = () => {
    router.push('/users')
  }
  
  const viewAnalytics = () => {
    router.push('/analytics')
  }
  </script>