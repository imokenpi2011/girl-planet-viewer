<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="10">
              <v-img
                :src="data.profile_image_main"
                class="white--text align-end px-0"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                position="35% 32%"
                height="200px"
              >
                <v-card-title v-text="data.name.ja"></v-card-title>
              </v-img>
            </v-col>
          </v-row>
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
