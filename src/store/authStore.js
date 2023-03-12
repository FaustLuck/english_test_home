import { requestGet, requestPost } from "@/utils/utils";
import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state() {
    return {
      privileged: false,
      sub: undefined,
      name: undefined,
      picture: undefined,
      tests: undefined
    };
  },
  actions: {
    async googleInitialize() {
      const offset = new Date().getTimezoneOffset();
      google.accounts.id.initialize({
        client_id: await this.getID(),
        auto_select: true,
        callback: async (response) => {
          {
            const token = response.credential;
            const info = await requestPost("/user/login", {token, offset});
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
      return await requestGet("/user/id");
    }
  }
});