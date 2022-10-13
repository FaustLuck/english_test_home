(function(){"use strict";var t={6346:function(t,e,n){n.d(e,{l:function(){return C},H:function(){return U}});var i=n(9242),s=n(3396);function r(t,e,n,i,r,a){const o=(0,s.up)("layout-component"),u=(0,s.up)("menu-component"),c=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(o),(0,s.Wm)(u),(0,s._)("form",null,[((0,s.wg)(),(0,s.j4)(c,{key:t.$route.fullPath}))])],64)}var a={components:{LayoutComponent:(0,s.RC)((()=>n.e(58).then(n.bind(n,3058)))),menuComponent:(0,s.RC)((()=>n.e(962).then(n.bind(n,9382))))}},o=n(89);const u=(0,o.Z)(a,[["render",r]]);var c=u,l=n(2483),f=n(6623),m=n(5421),d=n(1178);const h={namespaced:!0,state:{uid:"unauthorizedUser",displayName:"Войти с помощью Google",photoURL:n(4966),isAdmin:null,isPrivileged:!1,isLogin:null},mutations:{saveUserInfoFromGoogle(t,e){t.uid=e.uid,t.displayName=e.displayName,t.photoURL=e.photoURL},saveUserInfoFromDB(t,e){t.isAdmin=e.isAdmin??!1,t.isPrivileged=e.isPrivileged??!1},changeLoginStatus(t,e){t.isLogin=e}},actions:{async restoreLogin({dispatch:t,commit:e}){await(0,m.Aj)(C,(async n=>{if(!n)return e("changeLoginStatus",!1);await t("requestUserInfo",n)}))},async toLogin({state:t,dispatch:e}){if(!t.isLogin)try{const t=new m.hJ;let n=await(0,m.rh)(C,t),i=n.user;await e("requestUserInfo",i)}catch(n){console.log(n)}},async requestUserInfo({commit:t},e){const n=(0,d.iH)(U,`users/${e.uid}/info`);t("saveUserInfoFromGoogle",e),window.localStorage.setItem("uid",e.uid);try{let e=await(0,d.U2)(n);if(e.exists()){let n=await e.val();t("saveUserInfoFromDB",n)}t("changeLoginStatus",!0)}catch(i){console.log(i)}},getUID(){return window.localStorage.getItem("uid")}}},p={namespaced:!0,state:{settings:{speech:null,timer:null}},mutations:{saveSettings(t,e){t.settings=e},saveTimer(t,e){t.settings.timer=e}},actions:{async requestSettings({commit:t,state:e}){if(Object.keys(e.settings).length>2)return!0;const n=(0,d.iH)(U,"/settings");try{let e=await(0,d.U2)(n);if(e.exists()){let n=e.val();t("saveSettings",n)}return!0}catch(i){return console.log(i),!1}},async requestTimer({commit:t,state:e}){if(e.settings.timer)return!0;const n=(0,d.iH)(U,"/settings/timer");try{let e=await(0,d.U2)(n);if(e.exists()){let n=e.val();t("saveTimer",n)}return!0}catch(i){return console.log(i),!1}}},getters:{getSpeech:t=>t.settings.speech,getTimer:t=>t.settings.timer}};var g=n(8661);const v={namespaced:!0,state:{statistic:null,dateList:null},mutations:{saveStatistic(t,e){t.statistic=e},createDateList(t,e){let n={};for(let i in e){n[i]=[];for(let t in e[i].statistic){t=parseInt(t);let[e,s]=(0,g._)(t),r=n[i].findIndex((t=>t[0]===e));r>-1?n[i][r][1].push({timestamp:t,time:s}):n[i].push([e,[{timestamp:t,time:s}]])}n[i].reverse(),n[i].map((([,t])=>t.reverse()))}t.dateList=n}},actions:{async requestStatistic({commit:t,state:e},{uid:n,isAdmin:i=!1}){if(e.statistic&&!i)return!0;let s=i?"":`${n}/`;const r=(0,d.iH)(U,`users/${s}`);try{let e=await(0,d.U2)(r);if(e.exists()){let s=await e.val();if(i)for(let[t,e]of Object.entries(s))e?.statistic||delete s[t];else{let t={};t[n]=s,s=t}return t("saveStatistic",s),t("createDateList",s),!0}return!1}catch(a){console.log(a)}}},getters:{getAnswers(t){return function(e,n){return t.statistic[e].statistic[n]}}}},w={namespaced:!0,state:{answers:null,isTesting:!1,timeSpent:null,timestamp:null,timeLeft:null},mutations:{prepareAnswers(t,{dictionary:e,limits:n}){let i={};for(let s in e)i[s]=(0,g.E)(e[s],n[s]);t.answers=i},saveTimes(t,e){t.timeSpent=e;let n=new Date;t.timestamp=n.setSeconds(0,0)},changeTestStatus(t,e){t.isTesting=e},saveChoice(t,{choice:e,question:n,difficult:i}){let s=t.answers[i].findIndex((t=>t.question===n));t.answers[i][s].choice=e},saveTimerSec(t,e){t.timeLeft=e}},actions:{async sendAnswersToDB({state:t},{uid:e}){const n=(0,d.iH)(U,`users/${e}/statistic/${t.timestamp}`);try{await(0,d.t8)(n,{test:t.answers,timeSpent:t.timeSpent})}catch(i){console.log(i)}}}};var b=(0,f.MT)({state:{orderDifficult:["easy","medium","hard"]},getters:{},mutations:{},actions:{},modules:{auth:h,settings:p,statistic:v,test:w}});const y=[{path:"/",name:"test",component:()=>n.e(42).then(n.bind(n,3295))},{path:"/result",name:"result",meta:{requireAnswers:!0},component:()=>n.e(498).then(n.bind(n,6136))},{path:"/statistic",name:"statistic",meta:{requireAdmin:!0},component:()=>n.e(170).then(n.bind(n,5261))},{path:"/statistic:uid",name:"statistic-user",props:!0,component:()=>n.e(576).then(n.bind(n,8220))},{path:"/settings",name:"settings",meta:{requireAdmin:!0},component:()=>n.e(382).then(n.bind(n,2968))},{path:"/fire-show",name:"fire-show",component:()=>n.e(465).then(n.bind(n,5612))},{path:"/fail-show",name:"fail-show",component:()=>n.e(465).then(n.bind(n,5612))}],S=(0,l.p7)({history:(0,l.PO)("/english_test_home/"),routes:y});S.beforeEach((async(t,e)=>{const n=b.state.auth.isAdmin,i=await b.dispatch("auth/getUID")??b.state.auth.uid;return t.meta.requireAdmin?!!n||("statistic"===t.name&&"unauthorizedUser"!==i?{name:"statistic-user",params:{uid:i}}:{name:"test"}):"statistic-user"===t.name?"unauthorizedUser"===i?{name:"test"}:!(i!==t.params.uid&&!n)||{name:"statistic-user",params:{uid:i}}:"result"===t.name?!!b.state.test.answers||{name:"test"}:t.name.includes("show")?"result"===e.name||{name:"test"}:void 0}));var A=S,L=n(4275);const T={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-zhome.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"};let I=null,C=null,U=null;function _(){I||(I=(0,L.ZF)(T),C=(0,m.v0)(I),U=(0,d.N8)(I))}_(),(0,i.ri)(c).use(b).use(A).mount("#app")},8661:function(t,e,n){function i(t,e){let n=[],i=[...t];for(let o=0;o<e;o++){let t=r(i);n.push(t),i=s(t,i)}return n.sort(a);function s(t,e){return e.filter((e=>t instanceof Object?e.question!==t.question:e!==t))}function r(t){return t[Math.floor(Math.random()*t.length)]}function a(t,e){return t.question<e.question?-1:1}}function s(t){return new Intl.DateTimeFormat("ru-Ru",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(parseInt(t))).split(", ")}n.d(e,{E:function(){return i},_:function(){return s}})},4966:function(t,e,n){t.exports=n.p+"img/google.c55233fb.svg"}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,i,s,r){if(!i){var a=1/0;for(l=0;l<t.length;l++){i=t[l][0],s=t[l][1],r=t[l][2];for(var o=!0,u=0;u<i.length;u++)(!1&r||a>=r)&&Object.keys(n.O).every((function(t){return n.O[t](i[u])}))?i.splice(u--,1):(o=!1,r<a&&(a=r));if(o){t.splice(l--,1);var c=s();void 0!==c&&(e=c)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[i,s,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,i){return n.f[i](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+({42:"TestView",170:"StatisticView",382:"SettingsView",465:"AnimationShow",498:"ResultView",576:"StatisticUserView"}[t]||t)+"."+{42:"f00a87a5",45:"8192f249",49:"34538d77",58:"c76e3887",149:"5f6fd6d5",170:"f912f575",214:"e829ef8f",382:"195051f1",437:"1dfee544",443:"782e7790",465:"0cb628d5",498:"87c9367b",540:"e78b643c",576:"6254f760",621:"76763b40",811:"52a605d4",823:"11d0b201",850:"1b7bad45",962:"c6bca5dd"}[t]+".js"}}(),function(){n.miniCssF=function(t){return"css/"+({42:"TestView",170:"StatisticView",465:"AnimationShow"}[t]||t)+"."+{42:"fae7ae84",45:"1de83f21",58:"eaf2e662",170:"e53d07be",214:"e838f6b6",437:"a26468ea",443:"c822be88",465:"d4de6065",540:"5a7387e4",811:"d311305b",823:"e29af431",850:"29e401e9",962:"8f667afa"}[t]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="english_test_home:";n.l=function(i,s,r,a){if(t[i])t[i].push(s);else{var o,u;if(void 0!==r)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var f=c[l];if(f.getAttribute("src")==i||f.getAttribute("data-webpack")==e+r){o=f;break}}o||(u=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,n.nc&&o.setAttribute("nonce",n.nc),o.setAttribute("data-webpack",e+r),o.src=i),t[i]=[s];var m=function(e,n){o.onerror=o.onload=null,clearTimeout(d);var s=t[i];if(delete t[i],o.parentNode&&o.parentNode.removeChild(o),s&&s.forEach((function(t){return t(n)})),e)return e(n)},d=setTimeout(m.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=m.bind(null,o.onerror),o.onload=m.bind(null,o.onload),u&&document.head.appendChild(o)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/english_test_home/"}(),function(){var t=function(t,e,n,i){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css";var r=function(r){if(s.onerror=s.onload=null,"load"===r.type)n();else{var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.href||e,u=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=o,s.parentNode.removeChild(s),i(u)}};return s.onerror=s.onload=r,s.href=e,document.head.appendChild(s),s},e=function(t,e){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var s=n[i],r=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(r===t||r===e))return s}var a=document.getElementsByTagName("style");for(i=0;i<a.length;i++){s=a[i],r=s.getAttribute("data-href");if(r===t||r===e)return s}},i=function(i){return new Promise((function(s,r){var a=n.miniCssF(i),o=n.p+a;if(e(a,o))return s();t(i,o,s,r)}))},s={596:0,826:0};n.f.miniCss=function(t,e){var n={42:1,45:1,58:1,170:1,214:1,437:1,443:1,465:1,540:1,811:1,823:1,850:1,962:1};s[t]?e.push(s[t]):0!==s[t]&&n[t]&&e.push(s[t]=i(t).then((function(){s[t]=0}),(function(e){throw delete s[t],e})))}}(),function(){var t={596:0,826:0};n.f.j=function(e,i){var s=n.o(t,e)?t[e]:void 0;if(0!==s)if(s)i.push(s[2]);else{var r=new Promise((function(n,i){s=t[e]=[n,i]}));i.push(s[2]=r);var a=n.p+n.u(e),o=new Error,u=function(i){if(n.o(t,e)&&(s=t[e],0!==s&&(t[e]=void 0),s)){var r=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.src;o.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",o.name="ChunkLoadError",o.type=r,o.request=a,s[1](o)}};n.l(a,u,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,r,a=i[0],o=i[1],u=i[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(s in o)n.o(o,s)&&(n.m[s]=o[s]);if(u)var l=u(n)}for(e&&e(i);c<a.length;c++)r=a[c],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(l)},i=self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(6346)}));i=n.O(i)})();
//# sourceMappingURL=404.35bac3be.js.map