// // router/index.ts (or wherever your router setup is)

// import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/pages/index.vue'
// import Admin from '@/pages/admin/index.vue'
// import Login from '@/pages/auth/Login.vue'

// const routes = [
//   { path: '/', component: Home },
//   { path: '/login', component: Login },
//   { path: '/admin', component: Admin }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// // Add navigation guard to check login status
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.getItem('isLogin')
  
//   if (to.path.startsWith('/admin') && !isLogin) {
//     next('/login')  // Redirect to login if not logged in
//   } else {
//     next()  // Allow navigation
//   }
// })

// export default router
