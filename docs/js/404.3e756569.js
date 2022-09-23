(function(){"use strict";var e={6346:function(e,t,n){n.d(t,{l:function(){return U},H:function(){return C}});var i=n(9242),a=n(3396);function o(e,t,n,i,o,r){const s=(0,a.up)("layout-component"),l=(0,a.up)("menu-component"),u=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(s),(0,a.Wm)(l),(0,a._)("form",null,[((0,a.wg)(),(0,a.j4)(u,{key:e.$route.fullPath}))])],64)}var r={components:{LayoutComponent:(0,a.RC)((()=>n.e(58).then(n.bind(n,3058)))),menuComponent:(0,a.RC)((()=>n.e(648).then(n.bind(n,2651))))}},s=n(89);const l=(0,s.Z)(r,[["render",o]]);var u=l,c=n(2483);const f=[{path:"/",name:"test",component:()=>n.e(777).then(n.bind(n,4777))},{path:"/result",name:"result",component:()=>n.e(585).then(n.bind(n,6585))},{path:"/statistic",name:"statistic",component:()=>n.e(282).then(n.bind(n,2282))},{path:"/settings",name:"settings",component:()=>n.e(56).then(n.bind(n,3056))},{path:"/fire-show",name:"fire-show",component:()=>n.e(379).then(n.bind(n,2379))}],d=(0,c.p7)({history:(0,c.PO)("/english_test_home/"),routes:f});var h=d,m=n(6623),p=n(5421),g=n(1178);const v={namespaced:!0,state:{uid:"unauthorizedUser",displayName:"Войти с помощью Google",photoURL:n(4966),isAdmin:!1,isPrivileged:!1,isLogin:!1},mutations:{saveUserInfo(e,t){e.uid=t.uid,e.displayName=t.displayName,e.photoURL=t.photoURL,e.isAdmin=t.isAdmin??!1,e.isPrivileged=t.isPrivileged??!1},changeLoginStatus(e,t){e.isLogin=t}},actions:{async restoreLogin({dispatch:e}){let t=await e("getUID");t&&await e("requestUserInfo",t)},async toLogin({state:e,dispatch:t}){if(e.isLogin)return;const n=new p.hJ;let i=await(0,p.rh)(U,n),a=i.user;await t("requestUserInfo",a.uid)||await t("sendUserInfo",a)},async requestUserInfo({dispatch:e,commit:t},n){const i=(0,g.iH)(C,`users2/${n}/info`);let a=await(0,g.U2)(i);if(a.exists()){let i=await a.val();return i.uid=n,t("saveUserInfo",i),e("setUID"),t("changeLoginStatus",!0),!0}return!1},async sendUserInfo({dispatch:e,commit:t},n){const i=(0,g.iH)(C,`users2/${n.uid}/info/`);await(0,g.t8)(i,{displayName:n.displayName,photoURL:n.photoURL}),t("saveUserInfo",n),e("setUID"),t("changeLoginStatus",!0)},setUID({state:e}){window.localStorage.setItem("uid",e.uid)},getUID(){return window.localStorage.getItem("uid")}}},y={namespaced:!0,state:{settings:{speech:null,timer:null}},mutations:{saveSettings(e,t){e.settings=t},saveTimer(e,t){e.settings.timer=t}},actions:{async requestSettings({commit:e}){const t=(0,g.iH)(C,"/settings");try{let n=await(0,g.U2)(t);if(n.exists()){let t=n.val();e("saveSettings",t)}else console.log("No data available")}catch(n){console.log(n)}},async requestTimer({commit:e}){const t=(0,g.iH)(C,"/settings/timer");try{let n=await(0,g.U2)(t);if(n.exists()){let t=n.val();e("saveTimer",t)}else console.log("No data available")}catch(n){console.log(n)}}},getters:{getSpeech:e=>e.settings.speech,getTimer:e=>e.settings.timer}};var b=n(8661);const w={namespaced:!0,state:{statistic:null,dateList:null},mutations:{saveStatistic(e,t){e.statistic=t},createDateList(e,t){let n={};for(let i in t){n[i]=[];for(let e in t[i].statistic){e=parseInt(e);let[t,a]=(0,b._3)(e),o=n[i].findIndex((e=>e[0]===t));o>-1?n[i][o][1].push({timestamp:e,time:a}):n[i].push([t,[{timestamp:e,time:a}]])}n[i].reverse(),n[i].map((([,e])=>e.reverse()))}e.dateList=n}},actions:{async requestStatistic({commit:e},{uid:t,isAdmin:n=!1}){let i=n?"":`${t}/`;const a=(0,g.iH)(C,`users2/${i}`);let o=await(0,g.U2)(a);if(o.exists()){let i=await o.val();if(n)for(let[e,t]of Object.entries(i))t?.statistic||delete i[e];else{let e={};e[t]=i,i=e}e("saveStatistic",i),e("createDateList",i)}}},getters:{getAnswers(e){return function(t,n){return e.statistic[t].statistic[n]}}}},x={namespaced:!0,state:{answers:null,isTesting:!1,timeSpent:null,timestamp:null,timeLeft:null},mutations:{prepareAnswers(e,{dictionary:t,limits:n}){let i={};for(let a in t)i[a]=(0,b.EF)(t[a],n[a]);e.answers=i},saveTimes(e,t){e.timeSpent=t;let n=new Date;e.timestamp=n.setSeconds(0,0)},changeTestStatus(e,t){e.isTesting=t},saveChoice(e,{choice:t,question:n,difficult:i}){let a=e.answers[i].findIndex((e=>e.question===n));e.answers[i][a].choice=t},saveTimerSec(e,t){e.timeLeft=t}},actions:{async sendAnswersToDB({state:e},{uid:t}){const n=(0,g.iH)(C,`users2/${t}/statistic/${e.timestamp}`);try{await(0,g.t8)(n,{test:e.answers,timeSpent:e.timeSpent})}catch(i){console.log(i)}}}};var S=(0,m.MT)({state:{orderDifficult:["easy","medium","hard"]},getters:{},mutations:{},actions:{},modules:{auth:v,settings:y,statistic:w,test:x}}),I=n(4275);const L={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-zhome.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"},M=(0,I.ZF)(L),C=(0,g.N8)(M),U=(0,p.v0)(M);(0,i.ri)(u).use(S).use(h).mount("#app")},8661:function(e,t,n){function i(e,t){return e.question<t.question?-1:1}function a(e,t){let n=[],a=[...e];for(let i=0;i<t;i++){let e=r(a);n.push(e),a=o(e,a)}return n.sort(i)}function o(e,t){return t.filter((t=>e instanceof Object?t.question!==e.question:t!==e))}function r(e){return e[Math.floor(Math.random()*e.length)]}function s(e){return new Intl.DateTimeFormat("ru-Ru",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(parseInt(e))).split(", ")}function l(e){e.width=window.innerWidth,e.height=window.innerHeight;const t=e.getContext("2d");window.addEventListener("resize",(()=>{e.width=window.innerWidth,e.height=window.innerHeight,t.fillStyle="#000",t.fillRect(0,0,e.width,e.height)})),t.fillStyle="#000",t.fillRect(0,0,e.width,e.height);let n=[],i=[],a=20,o={x:e.width/2,y:e.height/2},r=400;for(let c=0;c<a;c++){let t={x:Math.random()*r/2-r/4+o.x,y:Math.random()*r*2+e.height,size:Math.random()+.5,fill:"#fd1",vx:Math.random()-.5,vy:-(Math.random()+4),ax:.02*Math.random()-.01,far:Math.random()*r+(o.y-r)};t.base={x:t.x,y:t.y,vx:t.vx},n.push(t)}function s(){let e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random());return`rgb(${e},${t},${n}`}function l(){for(let e=0;e<n.length;e++){let t=n[e];if(t.y<=t.far){let e=s();for(let n=0;n<5*a;n++){let n={x:t.x,y:t.y,size:Math.random()+1.5,fill:e,vx:5*Math.random()-2.5,vy:-5*Math.random()+1.5,ay:.05,alpha:1,life:Math.round(Math.random()*r/2)+r/2};n.base={life:n.life,size:n.size},i.push(n)}t.y=t.base.y,t.x=t.base.x,t.vx=t.base.vx,t.ax=.02*Math.random()-.01}t.x+=t.vx,t.y+=t.vy,t.vx+=t.ax}for(let e=i.length-1;e>=0;e--){let t=i[e];t&&(t.x+=t.vx,t.y+=t.vy,t.vy+=t.ay,t.alpha=t.life/t.base.life,t.size=t.alpha*t.base.size,t.alpha=t.alpha>.6?1:t.alpha,t.life--,t.life<=0&&i.splice(e,1))}}function u(){t.globalCompositeOperation="source-over",t.globalAlpha=.18,t.fillStyle="#000",t.fillRect(0,0,e.width,e.height),t.globalCompositeOperation="screen",t.globalAlpha=1;for(let e=0;e<n.length;e++){let i=n[e];t.beginPath(),t.arc(i.x,i.y,i.size,0,2*Math.PI),t.closePath(),t.fillStyle=i.fill,t.fill()}for(let e=0;e<i.length;e++){let n=i[e];t.globalAlpha=n.alpha,t.beginPath(),t.arc(n.x,n.y,n.size,0,2*Math.PI),t.closePath(),t.fillStyle=n.fill,t.fill()}}(function e(){requestAnimationFrame(e),l(),u()})()}n.d(t,{EF:function(){return a},_3:function(){return s},bm:function(){return l}})},4966:function(e,t,n){e.exports=n.p+"img/google.c55233fb.svg"}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,i,a,o){if(!i){var r=1/0;for(c=0;c<e.length;c++){i=e[c][0],a=e[c][1],o=e[c][2];for(var s=!0,l=0;l<i.length;l++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](i[l])}))?i.splice(l--,1):(s=!1,o<r&&(r=o));if(s){e.splice(c--,1);var u=a();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[i,a,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,i){return n.f[i](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{35:"3a57f481",45:"477f4a59",56:"3d29fb00",58:"9365902d",180:"bf777b18",282:"ebea2071",332:"ac339ed2",362:"8035d8bc",379:"cd67068a",380:"de788757",437:"1e20eb74",443:"b54d4d58",585:"565e703a",621:"aac5afdc",644:"6f699bb0",648:"c946b4d6",777:"7c55a7fa"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{35:"0d7e2c80",45:"1de83f21",56:"a26468ea",58:"eaf2e662",180:"1e4b65b4",282:"d163e507",332:"b7fd2489",362:"525aefe5",379:"a9fb080c",380:"903d5919",437:"a26468ea",443:"c822be88",644:"ce912d50",648:"4649ff75"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="english_test_home:";n.l=function(i,a,o,r){if(e[i])e[i].push(a);else{var s,l;if(void 0!==o)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var f=u[c];if(f.getAttribute("src")==i||f.getAttribute("data-webpack")==t+o){s=f;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+o),s.src=i),e[i]=[a];var d=function(t,n){s.onerror=s.onload=null,clearTimeout(h);var a=e[i];if(delete e[i],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((function(e){return e(n)})),t)return t(n)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/english_test_home/"}(),function(){var e=function(e,t,n,i){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var o=function(o){if(a.onerror=a.onload=null,"load"===o.type)n();else{var r=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=r,l.request=s,a.parentNode.removeChild(a),i(l)}};return a.onerror=a.onload=o,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var a=n[i],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var r=document.getElementsByTagName("style");for(i=0;i<r.length;i++){a=r[i],o=a.getAttribute("data-href");if(o===e||o===t)return a}},i=function(i){return new Promise((function(a,o){var r=n.miniCssF(i),s=n.p+r;if(t(r,s))return a();e(i,s,a,o)}))},a={596:0,826:0};n.f.miniCss=function(e,t){var n={35:1,45:1,56:1,58:1,180:1,282:1,332:1,362:1,379:1,380:1,437:1,443:1,644:1,648:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=i(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={596:0,826:0};n.f.j=function(t,i){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)i.push(a[2]);else{var o=new Promise((function(n,i){a=e[t]=[n,i]}));i.push(a[2]=o);var r=n.p+n.u(t),s=new Error,l=function(i){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var o=i&&("load"===i.type?"missing":i.type),r=i&&i.target&&i.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+r+")",s.name="ChunkLoadError",s.type=o,s.request=r,a[1](s)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,i){var a,o,r=i[0],s=i[1],l=i[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(l)var c=l(n)}for(t&&t(i);u<r.length;u++)o=r[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},i=self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(6346)}));i=n.O(i)})();
//# sourceMappingURL=404.3e756569.js.map