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
</style>