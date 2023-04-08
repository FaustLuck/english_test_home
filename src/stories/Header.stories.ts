import type { Meta, StoryObj } from "@storybook/vue3";
import HeaderComponent from "@/stories/Header.vue";

const meta = {
  title: "App/Header",
  component: HeaderComponent,
  render:()=>({
    components:{HeaderComponent},
    template:`
	    <v-layout>
	    <header-component/>
	    </v-layout>
    `
  })
}satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};

