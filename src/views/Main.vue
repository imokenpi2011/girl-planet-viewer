<template>
  <v-app
    :style="{ background: $vuetify.theme.themes.light.background }"
    class="purple--text text--darken-4"
    app
  >
    <header>
      <v-app-bar
        app
        flat
        color="transparent"
        class="purple--text text--darken-4"
      >
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <v-toolbar-title
          ><router-link to="/" style="text-decoration: none; color: inherit;"
            ><span>PLANET</span><br /><span>VIEWER999</span>
          </router-link></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-for="(link, i) in links"
            :key="i"
            :to="link.url"
            text
            :disabled="link.url == '#'"
          >
            {{ link.name }}
          </v-btn>
        </v-toolbar-items>
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = true"
        ></v-app-bar-nav-icon>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" fixed right temporary>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.url"
              :disabled="link.url == '#'"
            >
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      drawer: false,
      links: [
        {
          name: "99 GIRLS",
          url: "/girls",
        },
        {
          name: "RANKING",
          url: "/ranking",
        },
        {
          name: "PROGRAMS",
          url: "#",
        },
        {
          name: "MY PICKS",
          url: "#",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      createGirlsData: "createGirlsData",
    }),
  },
};
</script>
