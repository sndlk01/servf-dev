<template>
    <v-locale-provider >
        <v-app>
            <v-container fluid class="page-wrapper bg-background px-sm-5 px-4 pt-12 rounded-xl">
                    <div class="maxWidth">
                        <!-- <NuxtPage  /> -->
                        <slot></slot>
                    </div>
                </v-container>
        </v-app>
    </v-locale-provider>
</template>