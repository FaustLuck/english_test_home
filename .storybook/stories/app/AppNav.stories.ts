import type { Meta, StoryObj } from "@storybook/vue3";
import AppNav from "@/components/app/AppNav.vue";
import { useHistoryStore } from "@/store/history";

const meta = {
  title: "App/Navigation",
  component: AppNav,
  render: (args) => ({
    components: { AppNav },
    setup() {
      useHistoryStore().users = [
        {
          key: "key1",
          name: "user_1",
          picture: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Round&hairColor=Blue&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=DarkBrown%27",
          sub: "sub_1",
          minYear: 2023
        }, {
          key: "key2",
          name: "user_2",
          picture: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Kurt&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Pink&graphicType=Skull&eyeType=Cry&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Pale",
          sub: "sub_2",
          minYear: 2023
        }, {
          key: "key3",
          name: "user_3",
          picture: "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Round&hairColor=PastelPink&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=BlazerShirt&eyeType=Wink&eyebrowType=DefaultNatural&mouthType=Disbelief&skinColor=Yellow",
          sub: "sub_3",
          minYear: 2023
        }
      ];
      return { args };
    },
    template: `
			<v-layout class="flex-column" style="width: 350px">
			<app-nav/>
			</v-layout>
    `
  })
}satisfies Meta<typeof AppNav>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};