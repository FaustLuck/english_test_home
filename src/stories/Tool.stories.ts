import type { Meta, StoryObj } from "@storybook/vue3";
import toolComponent from "./Tool.vue";
import wrapperComponent from "../../.storybook/wrapperComponent.vue";

const meta = {
  title: "UI/Tool",
  component: toolComponent,
  tags: ["autodocs"],
  args: {
    included: false,
    edited: false,
    excluded: false
  }
}satisfies Meta<typeof toolComponent>;

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
    included: true
  }
};

export const Excluded: Story = {
  args: {
    ...Default.args,
    excluded: true
  }
};

export const Edited: Story = {
  args: {
    ...Default.args,
    edited: true
  }
};

export const Editable: Story = {
  render: () => ({
    components: { toolComponent, wrapperComponent },
    template: `
			<wrapper-component :id="'settings'"
			                   :args="{editingIndex:10,editingDifficult:'medium',dictionary:{medium:new Array(10)}}"
			                   :action="'startEdit'">
			<tool-component :difficult="'medium'" :index="10"/>
			</wrapper-component>
    `
  })
};