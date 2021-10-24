<template>
  <v-app>
    <v-main class="text-center">
      <h1>99 GIRLS</h1>
      <SelectGroup
        :data="groupList"
        :curGroup="curGroup"
        @changeGroup="setGroup"
      />
      <v-container>
        <v-row>
          <v-col
            v-for="(candidate, i) in curGroupTrainees"
            :key="i"
            cols="6"
            @click="viewDetail(candidate.slug)"
          >
            <v-card>
              <v-img
                :src="candidate.profile_image_main"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                position="35% 32%"
              >
                <v-card-title v-text="candidate.name.ja"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <Detail v-model="dialog" ref="detail" :id="viewTraineeId" />
    </v-main>
  </v-app>
</template>

<script scope>
import SelectGroup from "@/components/SelectGroup.vue";
import Detail from "@/components/GirlsDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: { SelectGroup, Detail },
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
