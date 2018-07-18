<template>
    <v-toolbar
            color="blue darken-5"
            dark
            app
            :clipped-left="$vuetify.breakpoint.mdAndUp"
            fixed
    >
        <v-toolbar-title style="width: 200px" class="ml-0 pl-3 cursor-pointer" @click="$router.push('/')">
            <span class="hidden-sm-and-down">EDBOParser</span>
        </v-toolbar-title>

        <v-toolbar-items >
            <v-btn to="/" activeClass="active-route-btn" flat>
                Parse
            </v-btn>
            <v-btn to="/search" activeClass="active-route-btn" flat>
                Search
            </v-btn>
            <v-btn class="hidden-md-and-up" flat>S</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>
    </v-toolbar>
</template>