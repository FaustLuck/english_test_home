<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <header-component></header-component>
    <div v-if="isTesting">
      <item-component
        v-for="(item,i) of test"
        :key="item.question+i"
      >
        <div class="item__column">
          <card-test-item-component
            :item="item.question"
            :type="'question'"
          ></card-test-item-component>
        </div>
        <div class="item__column">
          <card-test-item-component
            v-for="answer of item.answer"
            :key="answer"
            :name="item.difficult+i"
            :item="answer"
            :type="'answer'"
            :choice="item.choice"
            @updateChoice="(choice)=>updateChoice(choice,item)"
          ></card-test-item-component>
        </div>
      </item-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "TestView",
  components: {
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent")),
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent"))
  },
  data() {
    return {
      test: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState("test", ["test", "isTesting", "SPEECH"]),
    ...mapState(["isLoading"]),
  },
  watch: {
    isTesting(value) {
      if (!value) return this.$router.push({name: "result"});
    }
  },
  methods: {
    ...mapMutations("test", ["saveChoice"]),
    ...mapActions("test", ["getTest"]),
    isSpeech(str) {
      return /[a-zA-Z]/g.test(str);
    },
    async toVoice(str) {
      if (!this.isSpeech(str)) return;
      try {
        let response = await fetch(this.SPEECH + str);
        if (response.ok) {
          let blob = await response.blob();
          let src = URL.createObjectURL(blob);
          const audio = new Audio(src);
          await audio.play();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item__column {
  width: 50%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
  }
}
</style>