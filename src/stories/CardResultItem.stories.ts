import type { Meta, StoryObj } from "@storybook/vue3";
import CardResultItemComponent from "@/stories/CardResultItem.vue";

const meta = {
  title: "UI/Cards/Result",
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
      answer: "Семь",
      choice: "Кто",
      question: "Seven"
    }
  }
};

export const wrongItemWithChoice: Story = {
  args: {
    item: {
      key: "wrongItemWithChoice",
      answer: "Семь",
      choice: "Кто",
      question: "Seven"
    }
  }
};

