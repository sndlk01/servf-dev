<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Logo from "@/layouts/logo/logo.vue"
import { Menu2Icon, SearchIcon } from "vue-tabler-icons";
import sidebarItem from '@/_mockApis/header/Menu';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import MobileNavCollapse from './NavCollapse/MobileNavCollapse.vue';

const drawer = ref(false);

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})

const stickyHeader = ref(false)

function handleScroll() {
  if (window.pageYOffset) {
    stickyHeader.value = true
  } else {
    stickyHeader.value = false
  }
}

const scrollToComponent = (componentId: string) => {
  if (componentId) {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      drawer.value = false; // Close the mobile drawer if open
    } else {
      console.error(`Element with id ${componentId} not found.`);
    }
  }
};
</script>

<template>
  <div class="header white-header mt-n95">
    <v-navigation-drawer color="white" class="drawer px-3" v-model="drawer" temporary>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="menu text-capitalizew-100">
          <template v-for="(item, i) in sidebarItem">
            <NavGroup :item="item" v-if="item.header" :key="item.title" />
            <MobileNavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
            <NavItem :item="item" v-else @nav-item-click="scrollToComponent" />
          </template>
        </v-list>
      </perfect-scrollbar>
    </v-navigation-drawer>

    <v-app-bar flat class="header-card py-4" :class="stickyHeader ? 'sticky' : ''">
      <v-container class="py-0">
        <v-toolbar class="h-auto d-flex">
          <Logo />
          <v-list class="d-md-flex d-none flex-wrap py-0 ml-4 menu text-capitalize justify-end w-100">
            <template v-for="(item, i) in sidebarItem">
              <NavGroup :item="item" v-if="item.header" :key="item.title" />
              <NavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
              <NavItem :item="item" v-else class="" @nav-item-click="scrollToComponent" />
            </template>
          </v-list>
          <div class="d-md-flex d-none">
            <!-- Add any additional header items here -->
          </div>
          <Menu2Icon class="d-md-none d-flex drawer-icon no-effect ml-auto mr-0" @click.stop="drawer = !drawer" size="30" />
        </v-toolbar>
      </v-container>
    </v-app-bar>
  </div>
</template>

<style>
.header.white-header .v-app-bar.v-toolbar {
  background: rgb(146, 122, 244) !important;
  background: linear-gradient(90deg, rgba(146, 122, 244, 1) 0%, rgba(250, 164, 177, 1) 100%) !important;
}

.header .v-app-bar .v-list .v-list-item {
  position: relative; /* สำหรับ pseudo-element */
  transition: all 0.3s ease;
}

.header .v-app-bar .v-list .v-list-item:hover {
  color: #977cf0 !important;
  background-color: transparent !important;
}

/* เพิ่ม underline effect */
.header .v-app-bar .v-list .v-list-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px; /* ความหนาของเส้น */
  background-color: #ffffff; /* สีของเส้น */
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.header .v-app-bar .v-list .v-list-item:hover::after {
  width: 100%; /* ความยาวของเส้นเมื่อ hover */
}

/* สไตล์สำหรับ nav items */
.menu .v-list-item {
  transition: all 0.3s ease;
}

/* สไตล์สำหรับ navigation drawer */
.drawer {
  /* เพิ่ม gradient background */
  background: linear-gradient(180deg, rgba(146, 122, 244, 0.05) 0%, rgba(250, 164, 177, 0.05) 100%) !important;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
}

/* ส่วนหัวของ drawer */
.drawer .v-list {
  padding: 20px 15px;
  background: transparent !important;
}

/* แต่ละ item ใน drawer */
.drawer .v-list-item {
  border-radius: 12px;
  margin: 8px 0;
  padding: 15px 20px;
  transition: all 0.4s ease;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.8) !important;
}

/* Hover effect */
.drawer .v-list-item:hover {
  background: white !important;
  color: #977cf0 !important;
  border: 1px solid rgba(146, 122, 244, 0.2);
  box-shadow: 0 4px 15px rgba(146, 122, 244, 0.1);
  transform: translateX(5px);
}

/* Active state */
.drawer .v-list-item--active {
  background: linear-gradient(45deg, rgba(146, 122, 244, 0.1), rgba(250, 164, 177, 0.1)) !important;
  color: #977cf0 !important;
  font-weight: 600;
  border: 1px solid rgba(146, 122, 244, 0.2);
  box-shadow: 0 4px 15px rgba(146, 122, 244, 0.1);
}

/* ไอคอนเมนู */
.drawer-icon {
  color: white !important;
  transition: all 0.3s ease;
}

.drawer-icon:hover {
  transform: scale(1.1) rotate(90deg);
}

/* Scrollbar styling */
.scrollnavbar {
  height: 100vh;
}

.scrollnavbar::-webkit-scrollbar {
  width: 6px;
}

.scrollnavbar::-webkit-scrollbar-track {
  background: rgba(146, 122, 244, 0.1);
  border-radius: 10px;
}

.scrollnavbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #977cf0, #FAA4B1);
  border-radius: 10px;
}

/* Animation */
.v-navigation-drawer--is-open {
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* เพิ่ม divider ระหว่าง items */
.drawer .v-list-item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 10%;
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(146, 122, 244, 0.1), transparent);
}

/* ตกแต่ง text ใน item */
.drawer .v-list-item__title {
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* เพิ่ม effect เมื่อกดที่ item */
.drawer .v-list-item:active {
  transform: scale(0.98) translateX(5px);
}

/* ปรับแต่ง subheader ถ้ามี */
.drawer .v-list-subheader {
  color: #977cf0;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 16px;
  margin-top: 16px;
}
</style>