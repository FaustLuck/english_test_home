import type { Meta, StoryObj } from "@storybook/vue3";
import CardTestItemComponent from "@/components/cards/CardTestItem.vue";

const meta = {
  title: "UI/Cards/TestItem",
  component: CardTestItemComponent,
  tags: ["autodocs"]
}satisfies Meta<typeof CardTestItemComponent>;

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