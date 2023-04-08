import type { Meta, StoryObj } from "@storybook/vue3";
import NavigationComponent from "@/stories/Navigation.vue";

const meta = {
  title: "App/Navigation",
  component: NavigationComponent,
  tags: ["autodocs"],
  args: {
    isHidden: false
  },
  render: (args) => ({
    components: { NavigationComponent },
    setup(){
      return {args}
    },
    template: `
	    <v-layout>
		    <navigation-component :is-hidden="args.isHidden"/>
	    </v-layout>
    `
  })
}satisfies Meta<typeof NavigationComponent>;

export default meta;
type Story = StoryObj<typeof meta>

export const Open: Story = {};