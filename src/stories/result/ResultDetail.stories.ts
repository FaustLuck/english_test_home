import type { Meta, StoryObj } from "@storybook/vue3";
import ResultDetail from "@/stories/result/ResultDetail.vue";

const meta = {
  title: "Result/Detail",
  component: ResultDetail,
  tags: ["autodocs"]
}satisfies Meta<typeof ResultDetail>;

export default meta;
type Story = StoryObj<typeof meta>

export const Loading: Story = {};

export const Default: Story = {
  args: {
    result: {
      "easy": [{
        "answer": "Россия", "choice": "Россия", "question": "Russia"
      }, {
        "answer": "Нет", "choice": "Нет", "question": "No"
      }, {
        "answer": "Бабушка", "choice": "Бабушка", "question": "Grandmother"
      }, {
        "answer": "Пока", "choice": "Пока", "question": "Bye"
      }],
      "hard": [{
        "answer": "His brother is from China", "choice": "He is from Africa", "question": "Where is his brother from?"
      }, {
        "answer": "She is Tanya", "choice": "She is Tanya", "question": "Who is she?"
      }, {
        "answer": "Her name is Tanya", "choice": "Her name is Tanya", "question": "What is her name?"
      }],
      "medium": [{
        "answer": "Сколько ему лет?", "choice": "Как её зовут?", "question": "How old is he?"
      }, {
        "answer": "Как тебя зовут?", "choice": "Как тебя зовут?", "question": "What is your name?"
      }, {
        "answer": "Как твой папа?", "choice": "Как твой папа?", "question": "How is your father?"
      }]
    }
  }
};