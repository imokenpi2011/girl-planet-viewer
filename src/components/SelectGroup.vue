<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center bungee-inline py-0 mb-6 mt-4">
      <v-btn
        v-for="(groupName, i) in this.data"
        :key="i"
        :disabled="curGroup == groupName"
        outlined
        rounded
        color="purple darken-4"
        class="hidden-xs-only mx-4 button-border"
        @click="changeGroup(groupName)"
        >{{ getDispText(groupName) }}</v-btn
      >
      <v-select
        v-model="group"
        :items="this.data"
        item-text="getDispText"
        class="hidden-sm-and-up mx-4 button-border"
        outlined
        color="purple darken-4"
        @change="changeGroup"
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "selectGroup",
  data() {
    return {
      group: "",
    };
  },
  props: {
    data: {
      type: Array,
    },
    curGroup: {
      type: String,
    },
  },
  created() {
    this.group = this.curGroup;
  },
  computed: {
    getDispText() {
      return function(event) {
        return event + " GROUP";
      };
    },
  },
  methods: {
    //グループを変更(event=group)
    changeGroup(event) {
      this.$emit("changeGroup", event);
    },
  },
};
</script>
