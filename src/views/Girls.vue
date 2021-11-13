<template>
  <v-app
    :style="{ background: $vuetify.theme.themes.light.background }"
    class="purple--text text--darken-4"
  >
    <v-main class="text-center">
      <PageTitle title="99 GIRLS" />
      <SelectGroup
        :data="groupList"
        :curGroup="curGroup"
        @changeGroup="setGroup"
      />
      <v-container>
        <v-row>
          <v-col
            v-for="(trainee, i) in curGroupTrainees"
            :key="i"
            cols="4"
            sm="3"
            @click="viewDetail(trainee.slug)"
          >
            <v-card class="black--text" color="transparent" flat>
              <v-img
                :src="trainee.profile_image_main"
                class="rounded-circle"
                aspect-ratio="1"
                position="0% 40%"
              >
              </v-img>

              <p class="text-h5" v-text="trainee.name.ja"></p>
              <p class="text-h6" v-text="trainee.name.en"></p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <Detail v-model="dialog" ref="detail" :id="viewTraineeId" />
    </v-main>
  </v-app>
</template>

<script scope>
import PageTitle from "@/components/PageTitle.vue";
import SelectGroup from "@/components/SelectGroup.vue";
import Detail from "@/components/GirlsDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: { SelectGroup, Detail, PageTitle },
  name: "Girls",
  data() {
    return {
      trainees: [],
      groupList: ["all", "K", "C", "J"],
      curGroup: "all",
      viewTraineeId: "",
      dialog: false,
    };
  },
  created() {
    this.trainees = this.getGirlsData;
  },
  computed: {
    ...mapGetters(["getGirlsData", "getTraineeId"]),
    curGroupTrainees() {
      if (this.curGroup && this.curGroup != "all") {
        return this.trainees.filter(
          (trainees) => trainees.group == this.curGroup
        );
      } else {
        return this.trainees;
      }
    },
    getName(index) {
      return this.groupList[index];
    },
  },
  methods: {
    setGroup(group) {
      if (group) {
        this.curGroup = group;
      } else {
        this.curGroup = "all";
      }
    },
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
