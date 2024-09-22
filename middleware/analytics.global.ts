export default defineNuxtRouteMiddleware((to, from) => {
    const isLogin = localStorage.getItem("isLogin");
    let check = false
    if (isLogin === 'true') {
        check = true
    }
    console.log("🚀 ~ defineNuxtRouteMiddleware ~ isLogin:", isLogin)
    console.log(to.path)
    console.log(to.path.includes('admin'))
    console.log(!check && to.path !== '/login' && to.path.includes('admin'))
    if (!check && to.path !== '/login' && to.path.includes('admin')) {
        return navigateTo("/auth/login")
    }
    return
});