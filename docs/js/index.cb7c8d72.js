(function(){"use strict";var t={9094:function(t,e,n){n.d(e,{I:function(){return P},u:function(){return q}});var i=n(9197),o=n(8473),r=n.p+"img/settings.e5d69969.svg",s=n.p+"img/statistic.599363b6.svg";const a=t=>((0,o.dD)("data-v-6ea7aeae"),t=t(),(0,o.Cn)(),t),u={class:"container__menu"},c={class:"menu"},l=a((()=>(0,o._)("img",{src:r,alt:"Настройки"},null,-1))),d=a((()=>(0,o._)("img",{src:s,alt:"Статистика"},null,-1)));function f(t,e,n,i,r,s){const a=(0,o.up)("router-link"),f=(0,o.up)("login-button"),m=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",u,[(0,o._)("nav",c,[t.isAdmin?((0,o.wg)(),(0,o.j4)(a,{key:0,title:"Настройки",to:"/settings"},{default:(0,o.w5)((()=>[l])),_:1})):(0,o.kq)("",!0),t.isLogin?((0,o.wg)(),(0,o.j4)(a,{key:1,title:"Статистика",to:"/statistic"},{default:(0,o.w5)((()=>[d])),_:1})):(0,o.kq)("",!0),(0,o.Wm)(f,{onClick:t.toLogin},null,8,["onClick"])])]),(0,o._)("form",null,[((0,o.wg)(),(0,o.j4)(m,{key:t.$route.name}))])],64)}var m=n(299),g={components:{LoginButton:(0,o.RC)((()=>n.e(882).then(n.bind(n,2882))))},computed:{...(0,m.rn)("authorization",["isAdmin","isLogin"])},async created(){await this.restoreLogin()},methods:{...(0,m.nv)("authorization",["restoreLogin","toLogin"])}},p=n(5312);const h=(0,p.Z)(g,[["render",f],["__scopeId","data-v-6ea7aeae"]]);var v=h,y=n(6082);const w=[{path:"/",name:"test",component:()=>Promise.all([n.e(507),n.e(468)]).then(n.bind(n,5988))},{path:"/statistic",name:"statistic",component:()=>Promise.all([n.e(507),n.e(846)]).then(n.bind(n,142))},{path:"/settings",name:"settings",component:()=>Promise.all([n.e(507),n.e(670)]).then(n.bind(n,4082))},{path:"/result",name:"result",component:()=>Promise.all([n.e(507),n.e(846)]).then(n.bind(n,142))},{path:"/fireshow",name:"fireshow",component:()=>n.e(89).then(n.bind(n,1089))}],b=(0,y.p7)({history:(0,y.PO)("/english_test_home/"),routes:w});var _=b,S=n(8733);const A=t=>((0,o.dD)("data-v-4e4a3352"),t=t(),(0,o.Cn)(),t),E={class:"container__preloader"},I=A((()=>(0,o._)("div",{class:"preloader"},[(0,o._)("div",{class:"outer circle"},[(0,o._)("div",{class:"spinner"})]),(0,o._)("div",{class:"inner circle"})],-1))),L=[I];function T(t,e,n,i,r,s){return(0,o.wg)(),(0,o.iD)("div",E,L)}var O={name:"LoaderSpinner"};const k=(0,p.Z)(O,[["render",T],["__scopeId","data-v-4e4a3352"]]);var C=k,N=n(311),D=n(5587),U=n(6563);const R={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-zhome.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"},j=(0,N.ZF)(R),q=(0,D.N8)(j),P=(0,U.v0)(j);(0,i.ri)(v).use(S.Z).use(_).component("LoaderSpinner",C).mount("#app")},8733:function(t,e,n){n.d(e,{Z:function(){return d}});var i=n(299),o=n(9094),r=n(5587);const s={namespaced:!0,state:{statistic:null},mutations:{SAVE_STATISTIC(t,e){t.statistic=e}},actions:{async getStatistic({commit:t},{uid:e,admin:n}){let i=n?"":`${e}/`;const s=(0,r.iH)(o.u,`users/${i}`);let a=await(0,r.U2)(s);if(a.exists()){let i=await a.val();if(n)for(let[t,e]of Object.entries(i))e?.statistic||delete i[t];else{let t={};t[e]=i,i=t}t("SAVE_STATISTIC",i)}}},getters:{getStatistic:t=>t.statistic}};var a=n(6563);const u={namespaced:!0,state:{uid:"unauthorizedUser",displayName:"Войти с помощью Google",photoURL:n(4966),isAdmin:!1,isPrivileged:!1,isLogin:!1},mutations:{SAVE_INFO(t,e){t.uid=e.uid,t.displayName=e.displayName,t.photoURL=e.photoURL,t.isAdmin=e.isAdmin||!1,t.isPrivileged=e.isPrivileged||!1},LOGIN(t,e){t.isLogin=e}},actions:{async restoreLogin({dispatch:t}){let e=await t("getUID");e&&await t("getUserInfo",e)},async toLogin({state:t,dispatch:e}){if(t.isLogin)return;const n=new a.hJ;let i=await(0,a.rh)(o.I,n),r=i.user;await e("getUserInfo",r.uid)||await e("setUserInfo",r),e("setUID",r.uid)},async getUserInfo({commit:t},e){const n=(0,r.iH)(o.u,`users/${e}/info`);let i=await(0,r.U2)(n);if(i.exists()){let n=await i.val();return n.uid=e,t("SAVE_INFO",n),t("LOGIN",!0),!0}return!1},async setUserInfo({commit:t},e){const n=(0,r.iH)(o.u,`users/${e.uid}/info/`);await(0,r.t8)(n,{displayName:e.displayName,photoURL:e.photoURL}),t("SAVE_INFO",e),t("LOGIN",!0)},setUID(t){window.localStorage.setItem("uid",t)},getUID(){return window.localStorage.getItem("uid")}}};var c=n(7828);const l={namespaced:!0,state:{settings:{speech:null}},mutations:{SAVE_SETTINGS(t,e){t.settings=e},EDIT_RECORD(t,{difficult:e,index:n,record:i,prop:o}){t.settings.dictionary[e][n][o]=i},DELETE_RECORD(t,{difficult:e,item:n}){t.settings.dictionary[e]=t.settings.dictionary[e].filter((t=>t.question!==n.question))},ADD_RECORD(t,{difficult:e,item:n}){if(!n.question||!n.answer)return;n.question=(0,c.fm)(n.question),n.answer=(0,c.fm)(n.answer);let i=t.settings.dictionary[e].findIndex((t=>t.question===n.question));i>-1||(t.settings.dictionary[e].push(n),t.settings.dictionary[e].sort(c.qu))},SAVE_LIMIT(t,{difficult:e,limit:n}){t.settings.limits[e]=n}},actions:{async getSettings({commit:t}){const e=(0,r.iH)(o.u,"settings/");let n=await(0,r.U2)(e);if(n.exists()){let e=n.val();t("SAVE_SETTINGS",e)}else console.log("No data available")},async setSettings({commit:t},e){const n=(0,r.iH)(o.u,"settings/");await(0,r.t8)(n,e),t("SAVE_SETTINGS",e)}},getters:{getSpeech:t=>t.settings.speech,getSettings:t=>t}};var d=(0,i.MT)({state:{answers:{},readyToTest:!1},mutations:{SAVE_ANSWERS(t,e){t.answers=e},SAVE_READY(t,e){t.readyToTest=e},UPDATE_ANSWER(t,{answer:e,difficult:n,index:i}){t.answers[n][i].answer=e}},actions:{changeReady({commit:t},e){t("SAVE_READY",e)},saveAnswers({commit:t},e){t("SAVE_ANSWERS",e)},async setAnswer({state:t},{uid:e}){let n={...t.answers},i=Object.keys(n)[0],s=Object.keys(n[i])[0];n=n[i][s];const a=(0,r.iH)(o.u,`users/${e}/statistic/${i}/${s}`);await(0,r.t8)(a,n)}},modules:{statistic:s,authorization:u,settings:l}})},7828:function(t,e,n){n.d(e,{_3:function(){return o},fm:function(){return a},go:function(){return r},qu:function(){return s}});var i=n(8733);function o(){let t=new Intl.DateTimeFormat("ru-Ru",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date).split(", ");return t[0]=t[0].split(".").reverse().join("-"),t}async function r(t){let e=i.Z.getters["settings/getSpeech"];try{let n=await fetch(e+t);if(n.ok){let t=await n.blob(),e=URL.createObjectURL(t);const i=new Audio(e);await i.play()}}catch(n){console.log(n)}}function s(t,e){return t.question<e.question?-1:t.question>e.question?1:0}function a(t){return t.charAt(0).toUpperCase()+t.slice(1)}},4966:function(t,e,n){t.exports=n.p+"img/google.df5d4159.svg"}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,i,o,r){if(!i){var s=1/0;for(l=0;l<t.length;l++){i=t[l][0],o=t[l][1],r=t[l][2];for(var a=!0,u=0;u<i.length;u++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](i[u])}))?i.splice(u--,1):(a=!1,r<s&&(s=r));if(a){t.splice(l--,1);var c=o();void 0!==c&&(e=c)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[i,o,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,i){return n.f[i](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+t+"."+{89:"a5bc80af",468:"b515faca",507:"75b60e23",670:"dd87c97e",846:"3340e3e7",882:"056ce049"}[t]+".js"}}(),function(){n.miniCssF=function(t){return"css/"+t+"."+{89:"40b9b83c",468:"a1b05520",670:"af13d1fd",846:"d0f7184f",882:"dc3d5ed1"}[t]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="english_test_home:";n.l=function(i,o,r,s){if(t[i])t[i].push(o);else{var a,u;if(void 0!==r)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==i||d.getAttribute("data-webpack")==e+r){a=d;break}}a||(u=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",e+r),a.src=i),t[i]=[o];var f=function(e,n){a.onerror=a.onload=null,clearTimeout(m);var o=t[i];if(delete t[i],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(t){return t(n)})),e)return e(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),u&&document.head.appendChild(a)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/english_test_home/"}(),function(){var t=function(t,e,n,i){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var r=function(r){if(o.onerror=o.onload=null,"load"===r.type)n();else{var s=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.href||e,u=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=s,u.request=a,o.parentNode.removeChild(o),i(u)}};return o.onerror=o.onload=r,o.href=e,document.head.appendChild(o),o},e=function(t,e){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var o=n[i],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===t||r===e))return o}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){o=s[i],r=o.getAttribute("data-href");if(r===t||r===e)return o}},i=function(i){return new Promise((function(o,r){var s=n.miniCssF(i),a=n.p+s;if(e(s,a))return o();t(i,a,o,r)}))},o={826:0,596:0};n.f.miniCss=function(t,e){var n={89:1,468:1,670:1,846:1,882:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=i(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}(),function(){var t={826:0,596:0};n.f.j=function(e,i){var o=n.o(t,e)?t[e]:void 0;if(0!==o)if(o)i.push(o[2]);else{var r=new Promise((function(n,i){o=t[e]=[n,i]}));i.push(o[2]=r);var s=n.p+n.u(e),a=new Error,u=function(i){if(n.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var r=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;a.message="Loading chunk "+e+" failed.\n("+r+": "+s+")",a.name="ChunkLoadError",a.type=r,a.request=s,o[1](a)}};n.l(s,u,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,i){var o,r,s=i[0],a=i[1],u=i[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(u)var l=u(n)}for(e&&e(i);c<s.length;c++)r=s[c],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(l)},i=self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9094)}));i=n.O(i)})();
//# sourceMappingURL=index.cb7c8d72.js.map