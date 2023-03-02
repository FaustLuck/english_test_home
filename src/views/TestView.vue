<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else-if="isTesting">
    <div class="card"
         v-for="(item,i) of test"
         :key="`${item.question}_${i}`"
    >
      <div class="card__column">
        <label class="item" :class="{speech:!isSpeech(item.question)}">
          <a v-if="isSpeech(item.question)">🔉</a>
          <input
            @click="toVoice(item.question)"
            v-show="false"
            type="radio"
            :name="item.question"
          />
          <span class="item__title">{{ item.question }}</span>
        </label>
      </div>
      <div class="card__column">
        <label class="item"
               :class="{speech:!isSpeech(variant)}"
               v-for="(variant,index) of item.answer"
               :key="`${item.question}_${i}_${index}`"
        >
          <a v-if="isSpeech(variant)">🔉</a>
          <input
            @change="saveChoice({choice:variant,question:item.question})"
            @click="toVoice(variant)"
            type="radio"
            :name="`${item.question}_${i}`"
          />
          <span class="item__title">{{ variant }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "TestView",
  components: {
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
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
.card {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: 2rem 0;
  padding: .5rem;
  background-color: #FFDAB9;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &__column {
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
    }
  }
}

.item {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;

  & > * {
    margin: 0 .25rem;
  }

  &.speech {
    padding-left: 3.25rem;
    @media screen and (max-width: 768px) {
      padding-left: 0;
    }
  }

  & > input[type="radio"] {
    transform: scale(2, 2);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      transform: scale(1.5, 1.5);
    }
  }

  &__title {
    &.right {
      color: #008000;
    }

    &.wrong {
      color: #FF0000;
    }
  }
}


</style>