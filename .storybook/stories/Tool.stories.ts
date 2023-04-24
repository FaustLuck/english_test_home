import type { Meta, StoryObj } from "@storybook/vue3";
import ToolComponent from "@/stories/Tool.vue";
import { useSettingsStore } from "@/store/settings";

const meta = {
  title: "UI/Tool",
  component: ToolComponent,
  render: (args) => ({
    components: { ToolComponent },
    setup() {
      const arr = new Array(10).fill({});
      const initialState = {
        editingIndex: 4,
        editingDifficult: "easy",
        dictionary: { easy: [...arr] }
      };
      useSettingsStore().$patch({ ...initialState });
      return { args };
    },
    template: `
			<tool-component v-bind="args"/>`
  }),
  tags: ["autodocs"],
  args: {
    included: false,
    edited: false,
    excluded: false
  }
}satisfies Meta<typeof ToolComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    difficult: "easy",
    index: 0
  }
};

export const Included: Story = {
  args: {
    ...Default.args,
    index: 1,
    included: true
  }
};

export const Excluded: Story = {
  args: {
    ...Default.args,
    index: 2,
    excluded: true
  }
};

export const Edited: Story = {
  args: {
    ...Default.args,
    index: 3,
    edited: true
  }
};

export const Editable: Story = {
  args: {
    ...Default.args,
    index: 4
  }
};