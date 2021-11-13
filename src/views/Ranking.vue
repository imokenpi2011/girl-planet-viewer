<template>
  <v-app
    :style="{ background: $vuetify.theme.themes.light.background }"
    class="purple--text text--darken-4"
  >
    <v-main class="text-center">
      <v-container>
        <PageTitle title="RANKING" />
        <SelectPhase :curPhase="curPhase" @changePhase="setPhase" />
        <v-row>
          <v-col col="12">
            <v-tabs
              background-color="transparent"
              color="basil"
              centered
              show-arrows
            >
              <v-tab
                v-for="(tab, i) in getUseTab.avairableTab"
                :key="i"
                @click="setPage(tab)"
                >{{ getTabName(tab) }}</v-tab
              >
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <div v-if="isCurPage('planet')">
              <Planet :data="rankingData.planet" :girlsData="getGirlsData" />
            </div>
            <div v-if="isCurPage('cell')">
              <Cell :data="rankingData.cell" :girlsData="getGirlsData" />
            </div>
            <div v-if="isCurPage('group')">
              <Group :data="rankingData.group" :girlsData="getGirlsData" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script scope>
import PageTitle from "@/components/PageTitle.vue";
import Planet from "./ranking/Planet.vue";
import Cell from "./ranking/Cell.vue";
import Group from "./ranking/Group.vue";
import SelectPhase from "@/components//SelectPhase.vue";
import { mapGetters } from "vuex";

export default {
  name: "ranking",
  components: {
    PageTitle,
    Planet,
    Cell,
    Group,
    SelectPhase,
  },
  data() {
    return {
      trainees: [],
      curPage: "planet",
      curPhase: {
        dispName: "1ST RESULT",
        value: 1,
      },
      tabNameList: [
        {
          tabName: "Planet TOP9",
          tabValue: "planet",
        },
        {
          tabName: "Cell Ranking",
          tabValue: "cell",
        },
        {
          tabName: "Group Ranking",
          tabValue: "group",
        },
      ],
      useTabList: [
        {
          phase: 1,
          avairableTab: ["planet", "cell", "group"],
        },
        {
          phase: 2,
          avairableTab: ["planet", "group"],
        },
        {
          phase: 3,
          avairableTab: ["planet", "group"],
        },
        {
          phase: 4,
          avairableTab: ["planet", "group"],
        },
      ],
      rankingData: [],
      isActive: false,
    };
  },
  created() {
    let vm = this;
    vm.getRankingData();
  },
  computed: {
    ...mapGetters(["getGirlsData", "getTraineeId"]),
    isCurPage() {
      return function(page) {
        if (this.curPage == page) {
          return true;
        } else {
          return false;
        }
      };
    },
    getUseTab() {
      let filtered = this.useTabList.filter(
        (useTabList) => useTabList.phase == this.curPhase.value
      );
      return filtered[0];
    },
    getTabName() {
      return function(tab) {
        let filtered = this.tabNameList.filter(
          (tabNameList) => tabNameList.tabValue == tab
        );
        return filtered[0].tabName;
      };
    },
  },
  methods: {
    getRankingData() {
      this.$axios
        .get("https://d2r4huk0p3a2p1.cloudfront.net/ranking/web.json", {
          params: { phase: this.curPhase.value },
        })
        .then((response) => {
          console.log(response.data);
          this.rankingData = response.data;
        });
    },
    setPage(page) {
      if (page) {
        this.curPage = page;
      } else {
        this.curPage = "planet";
      }
    },
    setPhase(phase) {
      if (phase) {
        this.curPhase = phase;
        this.getRankingData();
      } else {
        this.curPhase.dispName = "1ST RESULT";
        this.curPhase.value = 1;
      }
    },
  },
};
</script>
