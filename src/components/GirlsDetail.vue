<template>
  <v-dialog
    v-model="show"
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile v-if="girlData">
      <v-app-bar text color="transparent">
        <v-btn icon @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-img
                :src="horizontalImage.url"
                class="white--text align-end px-3"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
                position="35% 32%"
              >
                <h1 v-text="girlData.name.ja" class="font-weight-thin"></h1>
                <h2 v-text="girlData.name.en" class="pl-6 mb-4"></h2>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"> </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-list>
                <h2>PROFILE</h2>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>BIRTHDAY</v-list-item-title>
                    <v-list-item-subtitle>{{
                      girlData.birthday
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>HEIGHT</v-list-item-title>
                    <v-list-item-subtitle>{{
                      girlData.height
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>MBTI</v-list-item-title>
                    <v-list-item-subtitle>{{
                      girlData.mbti
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>HOBBY</v-list-item-title>
                    <v-list-item-subtitle>{{
                      girlData.hobbies.ja
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>SPECIALITY</v-list-item-title>
                    <v-list-item-subtitle>{{
                      girlData.speciality.ja
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-carousel hide-delimiters>
                <v-carousel-item
                  v-for="(image, i) in verticalImages"
                  :key="i"
                  :src="image.url"
                ></v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle
                >Notify me about updates to apps or games that I
                downloadedaaaaaaaaaaaaaaaaaaaaaa</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      girlData: "",
    };
  },
  props: {
    value: Boolean,
    id: String,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    horizontalImage() {
      let horizontal = this.getImages("horizontal");
      return horizontal[0];
    },
    verticalImages() {
      return this.getImages("vertical");
    },
    getImages() {
      return function(type) {
        let images = [];
        if (this.girlData) {
          let imageList = this.girlData.profile_images;
          images = imageList.filter((imageList) => imageList.shape == type);
        }
        return images;
      };
    },
  },
  methods: {
    //データを取得する
    setDetailData() {
      this.$axios
        .get(`https://d2r4huk0p3a2p1.cloudfront.net/candidates/${this.id}.json`)
        .then((response) => {
          console.log(response.data);
          this.girlData = response.data;
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>

<style scope>
.v-dialog .v-card .container {
  overflow: auto;
}

.v-list-item__subtitle {
  white-space: inherit !important;
}
</style>
