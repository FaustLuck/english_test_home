import type { Meta, StoryObj } from "@storybook/vue3";
import cardComponent from "@/stories/CardTest.vue";

const meta = {
  title: "UI/Card",
  component: cardComponent,
  tags: ["autodocs"],
  args: {
    loading: true
  }
}satisfies Meta<typeof cardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const TestItem: Story = {
  args: {
    loading: false,
    item: {
      question: "Question",
      answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    }
  }
};