<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="phase"
          :items="phaseList"
          item-text="dispName"
          item-value="value"
          return-object
          height="70"
          @change="changePhase"
        >
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "selectGroup",
  data() {
    return {
      phase: null,
      phaseList: [
        {
          dispName: "1ST RESULT",
          value: 1,
        },
        {
          dispName: "2ND RESULT",
          value: 2,
        },
      ],
    };
  },
  props: {
    curPhase: {
      type: Object,
    },
  },
  created() {
    this.phase = this.curPhase;
  },
  methods: {
    changePhase(phase) {
      this.$emit("changePhase", phase);
    },
  },
};
</script>

<style scope>
.v-select__selections {
  line-height: 30px !important;
}

.v-select__selection {
  text-align: center;
  font-size: 2rem;
}

.v-select__slot .v-input__append-inner {
  display: none !important;
}

.v-menu__content .v-select-list {
  text-align: center;
}
</style>
