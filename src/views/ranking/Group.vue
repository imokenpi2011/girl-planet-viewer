<template>
  <v-app>
    <SelectGroup
      :data="groupList"
      :curGroup="curGroup"
      @changeGroup="setGroup"
    />
    <div class="group-area">
      <ul v-if="this.traineesList.length > 0">
        <li v-for="(trainee, i) in curGroupTrainees" :key="i">
          <div class="image-area">
            <img class="main-image" :src="trainee.profile_image_main" />
          </div>
          {{ trainee.group_rank }} | {{ trainee.name.ja }}/{{ trainee.slug }}
        </li>
      </ul>
    </div>
    <Detail v-model="dialog" ref="detail" :id="viewTraineeId" />
  </v-app>
</template>

<script scope>
import SelectGroup from "@/components/SelectGroup.vue";
import Detail from "@/components/GirlsDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: { SelectGroup, Detail },
  name: "group",
  data() {
    return {
      traineesList: [],
      curGroup: "K",
      groupList: ["K", "C", "J"],
    };
  },
  props: {
    data: Array,
  },
  created() {
    let vm = this;
    for (let i = 0; i < vm.data.length; i++) {
      let candidates = vm.data[i].candidates;
      for (let j = 0; j < candidates.length; j++) {
        vm.traineesList.push(candidates[j]);
      }
    }
  },
  computed: {
    ...mapGetters(["getGirlsData", "getTraineeId"]),
    curGroupTrainees() {
      //全練習生のリストを作成する
      return this.traineesList.filter(
        (traineesList) => traineesList.group == this.curGroup
      );
    },
  },
  methods: {
    setGroup(group) {
      if (group) {
        this.curGroup = group;
      } else {
        this.curGroup = "K";
      }
    },
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
};
</script>

<style>
.image-area {
  width: 200px;
  height: 130px;
  position: relative;
  overflow: hidden;
}

.main-image {
  width: 130%;
  height: auto;
  object-fit: cover;

  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -35%);
  -ms-transform: translate(-50%, -35%);
  transform: translate(-50%, -35%);
}
</style>
