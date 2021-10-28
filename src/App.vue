<template>
  <Main />
</template>

<script>
import { mapActions } from "vuex";
import Main from "@/views/Main.vue";

export default {
  components: { Main },
  name: "App",
  created() {
    this.createGirlsData();
  },
  methods: {
    ...mapActions({
      createGirlsData: "createGirlsData",
    }),
  },
};
</script>

<style>
header {
  font-family: "Azonix" !important;
}

.v-application {
  font-family: Kiwi Maru, Work Sans, sans-serif !important;
}

.v-application h1 {
  font-size: 3rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bungee {
  font-family: "Bungee", cursive !important;
}

.bungee-outline {
  font-family: "Bungee Outline", cursive !important;
  -webkit-text-stroke-width: 2.5px;
  font-size: 40px;
}

.bungee-inline {
  font-family: "Bungee Inline", cursive !important;
}

.button-border {
  border-width: 3px;
}
</style>
