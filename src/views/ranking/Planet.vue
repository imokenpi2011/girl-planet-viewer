<template>
  <v-container>
    <v-row>
      <v-col v-for="(trainee, i) in data" :key="i" cols="4">
        <v-card class="black--text" color="transparent" flat>
          <v-img
            :src="trainee.profile_image_main"
            class="align-end px-0 rounded-xl"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            aspect-ratio="1"
            position="0% 40%"
          >
            <v-card-subtitle v-text="trainee.name.ja"></v-card-subtitle>
            <v-card-text v-text="trainee.name.en"></v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <Detail v-model="dialog" ref="detail" :id="viewTraineeId" />
  </v-container>
</template>

<script>
import Detail from "@/components/GirlsDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: { Detail },
  name: "planet",
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
