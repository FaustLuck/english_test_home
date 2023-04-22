import Day from "@/stories/calendar/Day.vue";
import { useHistoryStore } from "@/store/history";
import { Meta, StoryObj } from "@storybook/vue3";

const range: any[] = [
  {
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
  },
  {
    "key": "key2",
    "timestamp": 1678972800000,
    "info": {
      "correct": 4,
      "questions": 4,
      "timeLeft": 295,
      "timeSpent": 5
    },
    "test": {
      "easy": [
        {
          "answer": "Бабушка",
          "choice": "Бабушка",
          "question": "Grandmother"
        },
        {
          "answer": "Три",
          "choice": "Три",
          "question": "Three"
        },
        {
          "answer": "Пять",
          "choice": "Пять",
          "question": "Five"
        },
        {
          "answer": "Великобритания",
          "choice": "Великобритания",
          "question": "Great Britain"
        }
      ],
    }
  }
];


const meta = {
  title: "Calendar/Day",
  component: Day,
  render: (args: { sub: string, timestamp: string }) => ({
    components: { Day },
    setup() {
      useHistoryStore().$patch({
        history: {
          "sub": {
            "2023": range
          }
        }
      });
      return { args };
    },
    template: `
			<day v-bing="args"/>`
  }),
  args: {
    sub: "sub",
    timestamp: "1678914000000"
  }
}satisfies Meta<typeof Day>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};