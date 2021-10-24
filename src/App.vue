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
.v-application {
  font-family: Kiwi Maru, Work Sans !important;
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
</style>
