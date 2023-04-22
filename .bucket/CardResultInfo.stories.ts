import type { Meta, StoryObj } from "@storybook/vue3";
import CardResultInfoComponent from "./CardResultInfo.vue";
import { useTestStore } from "../src/store/test";
import { Result } from "../src/types/test";

const meta = {
  title: "UI/Cards/ResultInfo",
  component: CardResultInfoComponent,
  tags: ["autodocs"],
  args: {
    timestamp: 1681196340000,
    correct: 3
  },
  render: (args) => ({
    components: { CardResultInfoComponent },
    setup() {
      useTestStore().$patch({
        timeSpent: 100,
        timeLeft: 100
      });
      return { args };
    },
    template: `
			<card-result-info-component v-bind="args"/>`
  })
}satisfies Meta<typeof CardResultInfoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

const result: Result = {
  "easy": [
    {
      "answer": "Мама",
      "choice": "Мама",
      "question": "Mother"
    },
    {
      "answer": "Он",
      "choice": "Он",
      "question": "He"
    },
    {
      "answer": "Африка",
      "choice": "Африка",
      "question": "Africa"
    }
  ],
  "hard": [
    {
      "answer": "She is Tanya",
      "choice": "She is fine, thanks",
      "question": "Who is she?"
    }
  ]
};

export const Show = {
  args: {
    result
  }
};