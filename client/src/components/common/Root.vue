<template>
    <v-app>
        <toolbar/>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import Toolbar from "./Toolbar.vue";

    export default {
        components: {
            toolbar: Toolbar,
        },
    }
</script>
