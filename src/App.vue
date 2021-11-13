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
