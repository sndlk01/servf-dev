<script setup lang="ts">
defineComponent({
  middleware: 'admin-route',

});
</script>

<template>
    <v-locale-provider >
        <v-app>
            <AdminLayoutMain/>
            <v-main>
                <v-container>
                    <div class="maxWidth">
                        <!-- <NuxtPage  /> -->
                        <slot></slot>
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
