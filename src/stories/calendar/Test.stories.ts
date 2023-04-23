import type { Meta, StoryObj } from "@storybook/vue3";
import Test from "@/stories/calendar/Test.vue";
import { HistoryRecord } from "@/types/history";
import { useHistoryStore } from "@/store/history";

const defaultInfo = {
  "correct": 3,
  "questions": 4,
  "timeLeft": 297,
  "timeSpent": 3
};
const failedInfo = {
  "correct": 3,
  "questions": 4,
  "timeLeft": 0,
  "timeSpent": 3
};
const CompletelyTrueInfo = {
  "correct": 4,
  "questions": 4,
  "timeLeft": 297,
  "timeSpent": 3
};
const resultLoaded: HistoryRecord = {
  "key": "key1",
  "timestamp": 1678976520000,
  "test": {
    "easy": [
      {
        "answer": "Два",
        "choice": "Два",
        "question": "Two"
      },
      {
        "answer": "Его",
        "choice": "Его",
        "question": "His"
      },
      {
        "answer": "Нет",
        "choice": "Нет",
        "question": "No"
      },
      {
        "answer": "Да",
        "question": "Yes"
      }
    ],
  }
};


const meta = {
  title: "Calendar/Test",
  component: Test,
  args: {
    sub: "sub",
    timestamp: "1678976520000",
    result: Object.assign(resultLoaded, { info: defaultInfo })
  },
  tags: ["autodocs"],
  render: (args: { sub: string, timestamp: string, result: HistoryRecord }) => ({
    components: { Test },
    setup() {
      useHistoryStore().$patch({
        history: { "sub": { 2023: [resultLoaded] } }
      });
      return { args };
    },
    template: `
			<test v-bind="args"/>`
  }),
}satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};

export const Failed: Story = {
  args: {
    result: Object.assign({}, resultLoaded, { info: failedInfo })
  }
};

export const CompletelyTrue: Story = {
  args: {
    result: Object.assign({}, resultLoaded, { info: CompletelyTrueInfo })
  }
};