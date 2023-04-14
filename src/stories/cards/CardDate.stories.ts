import type { Meta, StoryObj } from "@storybook/vue3";
import CardDateComponent from "@/stories/cards/CardDate.vue";
import { useHistoryStore } from "@/store/history";

const meta = {
  title: "UI/Cards/Date",
  component: CardDateComponent,
  tags: ["autodocs"],
  args: {
    sub: "sub"
  }
}satisfies Meta<typeof CardDateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const Info: Story = {
  args: {
    ...Loading.args,
    counter: 4,
    datestamp: 1663621200000
  },
  render: (args) => ({
    components: { CardDateComponent },
    setup() {
      // @ts-ignore
      useHistoryStore().dateList[args.sub] = {};
      return { args };
    },
    template: `
			<div style="pointer-events: none">
			<card-date-component v-bind="args"/>
			</div>`
  })

};