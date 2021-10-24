<template>
  <v-container class="mt-4">
    <v-card v-for="(cell, i) in data" :key="i" class="mx-4 my-6">
      <v-row align="center">
        <v-col cols="2">
          {{ cell.ranking }}
        </v-col>
        <v-col cols="10">
          <v-row
            v-for="(candidate, i) in cell.candidates"
            :key="i"
            align="center"
            class=" text-left"
          >
            <v-col cols="2">
              <v-img
                :src="candidate.profile_image_main"
                class="white--text px-0"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                position="35% 32%"
                aspect-ratio="1"
                @click="viewDetail(candidate.slug)"
              >
              </v-img>
            </v-col>
            <v-col cols="10">
              <span class="text-h5">
                {{ candidate.group_rank }}/{{ candidate.name.ja }}</span
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <Detail v-model="dialog" ref="detail" :id="viewTraineeId" />
  </v-container>
</template>

<script scope>
import Detail from "@/components/GirlsDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: { Detail },
  name: "cell",
  props: {
    data: Array,
    girlsData: Array,
  },
  computed: {
    ...mapGetters(["getGirlsData", "getTraineeId"]),
  },
  methods: {
    viewDetail(name) {
      let traineeId = this.getTraineeId(name);

      if (traineeId) {
        Promise.all([(this.viewTraineeId = traineeId)]).then(() => {
          this.$refs.detail.setDetailData();
          this.dialog = true;
        });
      } else {
        console.log("ERROR");
      }
    },
  },
};
</script>

<style></style>
