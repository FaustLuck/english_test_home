import type { Meta, StoryObj } from "@storybook/vue3";
import cardComponent from "@/stories/CardTest.vue";

const meta = {
  title: "UI/CardTest",
  component: cardComponent,
  tags: ["autodocs"]
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