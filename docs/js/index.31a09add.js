(function(){"use strict";var e={6346:function(e,t,n){n.d(t,{l:function(){return q},H:function(){return _}});var i=n(9242),s=n(3396);function r(e,t,n,i,r,o){const a=(0,s.up)("layout-component"),u=(0,s.up)("menu-component"),c=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(a),(0,s.Wm)(u),(0,s._)("form",null,[((0,s.wg)(),(0,s.j4)(c,{key:e.$route.fullPath}))])],64)}var o={components:{LayoutComponent:(0,s.RC)((()=>n.e(58).then(n.bind(n,3058)))),menuComponent:(0,s.RC)((()=>n.e(962).then(n.bind(n,9382))))}},a=n(89);const u=(0,a.Z)(o,[["render",r]]);var c=u,l=n(2483),f=n(6623),m=n(5421),d=n(1178);const h={namespaced:!0,state:{uid:"unauthorizedUser",displayName:"Войти с помощью Google",photoURL:n(4966),isAdmin:!1,isPrivileged:!1,isLogin:!1},mutations:{saveUserInfoFromGoogle(e,t){e.uid=t.uid,e.displayName=t.displayName,e.photoURL=t.photoURL},saveUserInfoFromDB(e,t){e.isAdmin=t.isAdmin??!1,e.isPrivileged=t.isPrivileged??!1},changeLoginStatus(e,t){e.isLogin=t}},actions:{async restoreLogin({dispatch:e,commit:t}){(0,m.Aj)(q,(async n=>{t("saveUserInfoFromGoogle",n),await e("requestUserInfo",n.uid)}))},async toLogin({state:e,dispatch:t}){if(!e.isLogin)try{const e=new m.hJ;let n=await(0,m.rh)(q,e),i=n.user;await t("requestUserInfo",i.uid)}catch(n){console.log(n)}},async requestUserInfo({commit:e},t){const n=(0,d.iH)(_,`users/${t}/info`);try{let t=await(0,d.U2)(n);if(t.exists()){let n=await t.val();e("saveUserInfoFromDB",n)}e("changeLoginStatus",!0)}catch(i){console.log(i)}}}},p={namespaced:!0,state:{settings:{speech:null,timer:null}},mutations:{saveSettings(e,t){e.settings=t},saveTimer(e,t){e.settings.timer=t}},actions:{async requestSettings({commit:e}){const t=(0,d.iH)(_,"/settings");try{let n=await(0,d.U2)(t);if(n.exists()){let t=n.val();e("saveSettings",t)}}catch(n){console.log(n)}},async requestTimer({commit:e}){const t=(0,d.iH)(_,"/settings/timer");try{let n=await(0,d.U2)(t);if(n.exists()){let t=n.val();e("saveTimer",t)}}catch(n){console.log(n)}}},getters:{getSpeech:e=>e.settings.speech,getTimer:e=>e.settings.timer}};var g=n(8661);const v={namespaced:!0,state:{statistic:null,dateList:null},mutations:{saveStatistic(e,t){e.statistic=t},createDateList(e,t){let n={};for(let i in t){n[i]=[];for(let e in t[i].statistic){e=parseInt(e);let[t,s]=(0,g._)(e),r=n[i].findIndex((e=>e[0]===t));r>-1?n[i][r][1].push({timestamp:e,time:s}):n[i].push([t,[{timestamp:e,time:s}]])}n[i].reverse(),n[i].map((([,e])=>e.reverse()))}e.dateList=n}},actions:{async requestStatistic({commit:e},{uid:t,isAdmin:n=!1}){let i=n?"":`${t}/`;const s=(0,d.iH)(_,`users/${i}`);try{let i=await(0,d.U2)(s);if(i.exists()){let s=await i.val();if(n)for(let[e,t]of Object.entries(s))t?.statistic||delete s[e];else{let e={};e[t]=s,s=e}return e("saveStatistic",s),e("createDateList",s),!0}return!1}catch(r){console.log(r)}}},getters:{getAnswers(e){return function(t,n){return e.statistic[t].statistic[n]}}}},b={namespaced:!0,state:{answers:null,isTesting:!1,timeSpent:null,timestamp:null,timeLeft:null},mutations:{prepareAnswers(e,{dictionary:t,limits:n}){let i={};for(let s in t)i[s]=(0,g.E)(t[s],n[s]);e.answers=i},saveTimes(e,t){e.timeSpent=t;let n=new Date;e.timestamp=n.setSeconds(0,0)},changeTestStatus(e,t){e.isTesting=t},saveChoice(e,{choice:t,question:n,difficult:i}){let s=e.answers[i].findIndex((e=>e.question===n));e.answers[i][s].choice=t},saveTimerSec(e,t){e.timeLeft=t}},actions:{async sendAnswersToDB({state:e},{uid:t}){const n=(0,d.iH)(_,`users/${t}/statistic/${e.timestamp}`);try{await(0,d.t8)(n,{test:e.answers,timeSpent:e.timeSpent})}catch(i){console.log(i)}}}};var y=(0,f.MT)({state:{orderDifficult:["easy","medium","hard"]},getters:{},mutations:{},actions:{},modules:{auth:h,settings:p,statistic:v,test:b}});const w=[{path:"/",name:"test",component:()=>n.e(42).then(n.bind(n,830))},{path:"/result",name:"result",meta:{requireAnswers:!0},component:()=>n.e(498).then(n.bind(n,9729))},{path:"/statistic",name:"statistic",meta:{requireAdmin:!0},component:()=>n.e(170).then(n.bind(n,5846))},{path:"/statistic:uid",name:"statistic-user",props:!0,meta:{requireLogin:!0},component:()=>n.e(576).then(n.bind(n,5969))},{path:"/settings",name:"settings",meta:{requireAdmin:!0},component:()=>n.e(382).then(n.bind(n,5524))},{path:"/fire-show",name:"fire-show",component:()=>n.e(465).then(n.bind(n,5612))},{path:"/fail-show",name:"fail-show",component:()=>n.e(465).then(n.bind(n,5612))}],S=(0,l.p7)({history:(0,l.PO)("/english_test_home/"),routes:w});S.beforeEach(((e,t,n)=>{if("result"!==e.name)if(e.name.includes("show"))"result"===t.name?n():n({name:"test"});else{if(e.meta.requireAdmin){if(!y.state.auth.isAdmin)return void("unauthorizedUser"!==y.state.auth.uid?n({name:"statistic-user",params:{uid:y.state.auth.uid}}):n({name:"test"}));n()}e.meta.requireLogin,y.state.auth.isLogin,n()}else y.state.test.answers?n():n({name:"test"})}));var A=S,L=n(4275);const T={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-zhome.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"};let C=null,q=null,_=null;function I(){C||(C=(0,L.ZF)(T),q=(0,m.v0)(C),_=(0,d.N8)(C))}I(),(0,i.ri)(c).use(y).use(A).mount("#app")},8661:function(e,t,n){function i(e,t){let n=[],i=[...e];for(let a=0;a<t;a++){let e=r(i);n.push(e),i=s(e,i)}return n.sort(o);function s(e,t){return t.filter((t=>e instanceof Object?t.question!==e.question:t!==e))}function r(e){return e[Math.floor(Math.random()*e.length)]}function o(e,t){return e.question<t.question?-1:1}}function s(e){return new Intl.DateTimeFormat("ru-Ru",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(parseInt(e))).split(", ")}n.d(t,{E:function(){return i},_:function(){return s}})},4966:function(e,t,n){e.exports=n.p+"img/google.c55233fb.svg"}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,i,s,r){if(!i){var o=1/0;for(l=0;l<e.length;l++){i=e[l][0],s=e[l][1],r=e[l][2];for(var a=!0,u=0;u<i.length;u++)(!1&r||o>=r)&&Object.keys(n.O).every((function(e){return n.O[e](i[u])}))?i.splice(u--,1):(a=!1,r<o&&(o=r));if(a){e.splice(l--,1);var c=s();void 0!==c&&(t=c)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[i,s,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,i){return n.f[i](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+({42:"TestView",170:"StatisticView",382:"SettingsView",465:"AnimationShow",498:"ResultView",576:"StatisticUserView"}[e]||e)+"."+{42:"5427b4a6",45:"477f4a59",58:"9365902d",170:"7303d882",200:"b17bb90d",332:"ac339ed2",362:"8035d8bc",380:"de788757",382:"97c312c3",437:"1e20eb74",443:"b54d4d58",465:"672aa6cf",498:"06858c5f",576:"e3dcc448",621:"aac5afdc",644:"6f699bb0",954:"6ce01b5a",962:"f0571187"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+({170:"StatisticView",382:"SettingsView",465:"AnimationShow"}[e]||e)+"."+{45:"1de83f21",58:"eaf2e662",170:"a3ff1a05",200:"9bc0e774",332:"b7fd2489",362:"525aefe5",380:"903d5919",382:"a26468ea",437:"a26468ea",443:"c822be88",465:"d4de6065",644:"ce912d50",954:"296796fd",962:"8f667afa"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="english_test_home:";n.l=function(i,s,r,o){if(e[i])e[i].push(s);else{var a,u;if(void 0!==r)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var f=c[l];if(f.getAttribute("src")==i||f.getAttribute("data-webpack")==t+r){a=f;break}}a||(u=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+r),a.src=i),e[i]=[s];var m=function(t,n){a.onerror=a.onload=null,clearTimeout(d);var s=e[i];if(delete e[i],a.parentNode&&a.parentNode.removeChild(a),s&&s.forEach((function(e){return e(n)})),t)return t(n)},d=setTimeout(m.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=m.bind(null,a.onerror),a.onload=m.bind(null,a.onload),u&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/english_test_home/"}(),function(){var e=function(e,t,n,i){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css";var r=function(r){if(s.onerror=s.onload=null,"load"===r.type)n();else{var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=o,u.request=a,s.parentNode.removeChild(s),i(u)}};return s.onerror=s.onload=r,s.href=t,document.head.appendChild(s),s},t=function(e,t){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var s=n[i],r=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(r===e||r===t))return s}var o=document.getElementsByTagName("style");for(i=0;i<o.length;i++){s=o[i],r=s.getAttribute("data-href");if(r===e||r===t)return s}},i=function(i){return new Promise((function(s,r){var o=n.miniCssF(i),a=n.p+o;if(t(o,a))return s();e(i,a,s,r)}))},s={826:0,596:0};n.f.miniCss=function(e,t){var n={45:1,58:1,170:1,200:1,332:1,362:1,380:1,382:1,437:1,443:1,465:1,644:1,954:1,962:1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=i(e).then((function(){s[e]=0}),(function(t){throw delete s[e],t})))}}(),function(){var e={826:0,596:0};n.f.j=function(t,i){var s=n.o(e,t)?e[t]:void 0;if(0!==s)if(s)i.push(s[2]);else{var r=new Promise((function(n,i){s=e[t]=[n,i]}));i.push(s[2]=r);var o=n.p+n.u(t),a=new Error,u=function(i){if(n.o(e,t)&&(s=e[t],0!==s&&(e[t]=void 0),s)){var r=i&&("load"===i.type?"missing":i.type),o=i&&i.target&&i.target.src;a.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",a.name="ChunkLoadError",a.type=r,a.request=o,s[1](a)}};n.l(o,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,r,o=i[0],a=i[1],u=i[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(s in a)n.o(a,s)&&(n.m[s]=a[s]);if(u)var l=u(n)}for(t&&t(i);c<o.length;c++)r=o[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(l)},i=self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(6346)}));i=n.O(i)})();
//# sourceMappingURL=index.31a09add.js.map