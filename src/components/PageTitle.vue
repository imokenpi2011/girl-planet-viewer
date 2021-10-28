<template>
  <v-responsive :aspect-ratio="16 / 9" class="title-area  mx-5">
    <v-container class="bungee-inline fill-height">
      <v-row>
        <v-col cols="12">
          <span>{{ title }}</span>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style yle scope>
.title-area {
  border: solid 4px;
}
</style>
