import { request } from "@/utils/utils";

export const auth = {
  namespaced: true,
  state: {
    privileged: false,
    sub: null,
    name: null,
    picture: null,
    tests: null
  },
  mutations: {
    changeLoginStatus(state, info) {
      Object.assign(state, info);
    },
  },
  actions: {
    async googleInitialize({dispatch, commit}) {
      //TODO убрать
      // eslint-disable-next-line no-undef
      google.accounts.id.initialize({
        client_id: await dispatch("getID"),
        auto_select: true,
        callback: async (response) => {
          {
            const token = response.credential;
            const info = await request("login", {token});
            commit("changeLoginStatus", info);
          }
        }
      });
      //TODO убрать
      // eslint-disable-next-line no-undef
      google.accounts.id.renderButton(
        document.getElementById("google"),
        {
          type: "icon",
          shape: "circle",
          theme: "outline",
          size: "large"
        }
      );
      //TODO убрать
      // eslint-disable-next-line no-undef
      google.accounts.id.prompt();
    },
    async getID() {
      return await request("id", null, "GET");
    }
  }
};