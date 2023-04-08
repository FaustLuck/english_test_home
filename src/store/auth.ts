import { defineStore } from "pinia";
import { ref } from "vue";
import { requestGet, requestPost } from "@/utils/requests";

export const useAuthStore = defineStore("auth", () => {
  const sub = ref("");
  const name = ref("");
  const picture = ref("");
  const tests = ref(false);
  const isLogin = ref(false);

  async function googleInitialize() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_client_id,
      auto_select: true,
      callback: async (response: { credential: any; }) => {
        {
          const token = response.credential;
          parseJwt(token);
          await requestPost("/user/login", { token });
          await getUserInfo();
        }
      }
    });
    const element = document.getElementById("google");
    if (element) {
      // @ts-ignore
      google.accounts.id.renderButton(
        element,
        {
          type: "icon",
          shape: "circle",
          theme: "outline",
          size: "large"
        }
      );
    }
    // @ts-ignore
    google.accounts.id.prompt();
  }

  function parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(window.atob(base64).split("").map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    const { sub: userSub } = JSON.parse(jsonPayload);
    sub.value = userSub;
  }

  async function getUserInfo() {
    const info = await requestGet(`/user/login/${sub.value}`);
    name.value = info.name;
    picture.value = info.picture;
    tests.value = info.tests;
    isLogin.value = true;
  }

  return {
    sub,
    name,
    picture,
    tests,
    isLogin,
    googleInitialize
  };
});