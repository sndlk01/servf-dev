// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useState('isLoggedIn').value;

  console.log("🚀 ~ defineNuxtRouteMiddleware ~ isLoggedIn:", isLoggedIn);
  console.log(to.path);
  console.log(to.path.includes('admin'));

  // Redirect to login if the user is not logged in and tries to access an admin page
  if (!isLoggedIn && to.path.includes('admin') && to.path !== '/auth/login') {
    return navigateTo("/auth/login");
  }
});
