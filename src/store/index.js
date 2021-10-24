import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    girlsData: [],
    viewTraineeId: "",
  },
  mutations: {
    setGirlsData(state, payload) {
      state.girlsData = payload.data;
    },
    setViewTraineeId(state, payload) {
      state.viewTraineeId = payload;
    }
  },
  getters: {
    getGirlsData(state) {
      return state.girlsData;
    },
    getTraineeId(state) {
      return function (name) {
        let filtered = state.girlsData.filter(
          (girlsData) => girlsData.slug == name
        );
        console.log(filtered[0].id)
        return filtered[0].id
      }
    }
  },
  actions: {
    async createGirlsData(context) {
      const payload = {
        data: '',
      };
      await axios.get("https://d2r4huk0p3a2p1.cloudfront.net/candidates.json")
        .then(response => {
          payload.data = response.data;
          context.commit('setGirlsData', payload);
        })
        .catch(error => {
          console.log(error);
        });

    },
  }
})
