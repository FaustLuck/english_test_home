import { request } from "@/utils/utils";
import { defineStore } from "pinia";

export const auth = defineStore("auth", {
  state() {
    return {
      admin: undefined,
      privileged: false,
      sub: undefined,
      name: undefined,
      picture: undefined,
      tests: undefined
    };
  },
  actions: {
    async googleInitialize() {
      google.accounts.id.initialize({
        client_id: await this.getID(),
        auto_select: true,
        callback: async (response) => {
          {
            const token = response.credential;
            const info = await request("login", {token});
            Object.assign(this, info);
          }
        }
      });
      google.accounts.id.renderButton(
        document.getElementById("google"),
        {
          type: "icon",
          shape: "circle",
          theme: "outline",
          size: "large"
        }
      );
      google.accounts.id.prompt();
    },
    async getID() {
      return await request("id", null, "GET");
    }
  }
});