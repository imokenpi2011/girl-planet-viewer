<template>
  <v-container>
    <v-row>
      <v-col v-for="(trainee, i) in data" :key="i" cols="4">
        <v-card class="black--text" color="transparent" flat>
          <v-img
            :src="trainee.profile_image_main"
            :class="getGroupClass(trainee.group)"
            class="rounded-circle img-border"
            aspect-ratio="1"
            position="0% 40%"
          >
          </v-img>

          <div class="caption" v-text="trainee.name.ja"></div>
          <div class="slug-text azonix" v-text="trainee.name.en"></div>
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
    getGroupClass() {
      return function(group) {
        return {
          "border-k": group === "K",
          "border-c": group === "C",
          "border-j": group === "J",
        };
      };
    },
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

<style>
.slug-text {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 300;
}

.img-border {
  border: solid 2px transparent;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
.border-k {
  border-color: #83c7de;
}

.border-c {
  border-color: #deaaa9;
}

.border-j {
  border-color: #ffe4b8;
}
</style>
