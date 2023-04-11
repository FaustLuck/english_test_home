import type { Meta, StoryObj } from "@storybook/vue3";
import CardResultItemComponent from "./CardResultItem.vue";

const meta = {
  title: "UI/Cards/ResultItem",
  component: CardResultItemComponent,
  tags: ["autodocs"]
}satisfies Meta<typeof CardResultItemComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  args: {
    item: { key: "rightItem", answer: "Пять", choice: "Пять", question: "Five" }
  }
};

export const WrongWithChoice: Story = {
  args: {
    item: {
      key: "wrongItemWithChoice",
      answer: "Шесть",
      choice: "Пять",
      question: "Six"
    }
  }
};

export const wrongItemWithoutChoice: Story = {
  args: {
    item: {
      key: "wrongItemWithoutChoice",
      answer: "Семь",
      question: "Seven"
    }
  }
};

