import { defineStore } from "pinia";
import { requestPost } from "@/utils/requests";

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
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_client_id,
        auto_select: true,
        callback: async (response) => {
          {
            const token = response.credential;
            const info = await requestPost("/user/login", {token});
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
    }
  }
});