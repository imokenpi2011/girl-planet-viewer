<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center py-0 mb-6 mt-4">
      <v-btn
        v-for="(groupName, i) in this.data"
        :key="i"
        @click="changeGroup(groupName)"
        :disabled="curGroup == groupName"
        class="hidden-xs-only mx-4"
        >{{ getDispText(groupName) }}</v-btn
      >
      <v-select
        v-model="group"
        :items="this.data"
        item-text="getDispText"
        class="hidden-sm-and-up mx-4"
        outlined
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
