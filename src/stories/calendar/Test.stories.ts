import type { Meta, StoryObj } from "@storybook/vue3";
import Test from "@/stories/calendar/Test.vue";
import { HistoryRecord } from "@/types/history";
import { useHistoryStore } from "@/store/history";

const resultLoaded: HistoryRecord = {
  "key": "key1",
  "timestamp": 1678976520000,
  "info": {
    "correct": 3,
    "questions": 4,
    "timeLeft": 297,
    "timeSpent": 3
  },
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
    result: resultLoaded
  },
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