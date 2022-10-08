"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[64],{6346:function(t,e,n){n.d(e,{e:function(){return T},C:function(){return L}});var i=n(9242),a=n(3396);function s(t,e,n,i,s,o){const l=(0,a.up)("layout-component"),r=(0,a.up)("menu-component"),h=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(l),(0,a.Wm)(r),(0,a._)("form",null,[((0,a.wg)(),(0,a.j4)(h,{key:t.$route.fullPath}))])],64)}var o={components:{LayoutComponent:(0,a.RC)((()=>n.e(58).then(n.bind(n,3058)))),menuComponent:(0,a.RC)((()=>n.e(648).then(n.bind(n,2651))))}},l=n(89);const r=(0,l.Z)(o,[["render",s]]);var h=r,c=n(2483);const u=[{path:"/",name:"test",component:()=>n.e(42).then(n.bind(n,4777))},{path:"/result",name:"result",component:()=>n.e(498).then(n.bind(n,6605))},{path:"/statistic",name:"statistic",component:()=>n.e(170).then(n.bind(n,2818))},{path:"/statistic:uid",name:"statistic-user",props:!0,component:()=>n.e(576).then(n.bind(n,4790))},{path:"/settings",name:"settings",component:()=>n.e(382).then(n.bind(n,3056))},{path:"/fire-show",name:"fire-show",component:()=>n.e(465).then(n.bind(n,9624))},{path:"/fail-show",name:"fail-show",component:()=>n.e(465).then(n.bind(n,9624))}],f=(0,c.p7)({history:(0,c.PO)("/english_test_home/"),routes:u});var d=f,m=n(6623);const g={namespaced:!0,state:{uid:"unauthorizedUser",displayName:"Войти с помощью Google",photoURL:n(4966),isAdmin:!1,isPrivileged:!1,isLogin:!1},mutations:{saveUserInfo(t,e){t.uid=e.uid,t.displayName=e.displayName,t.photoURL=e.photoURL,t.isAdmin=e.isAdmin??!1,t.isPrivileged=e.isPrivileged??!1},changeLoginStatus(t,e){t.isLogin=e}},actions:{async restoreLogin({dispatch:t}){let e=await t("getUID");e&&await t("requestUserInfo",e)},async toLogin({state:t,dispatch:e}){if(t.isLogin)return;const i=await T(),{GoogleAuthProvider:a,signInWithPopup:s}=await Promise.all([n.e(77),n.e(789)]).then(n.bind(n,5421)),o=new a;let l=await s(i,o),r=l.user;await e("requestUserInfo",r.uid)||await e("sendUserInfo",r)},async requestUserInfo({dispatch:t,commit:e},i){const a=await L(),{ref:s,get:o}=await Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178)),l=s(a,`users2/${i}/info`);let r=await o(l);if(r.exists()){let n=await r.val();return n.uid=i,e("saveUserInfo",n),t("setUID"),e("changeLoginStatus",!0),!0}return!1},async sendUserInfo({dispatch:t,commit:e},i){const a=await L(),{ref:s,set:o}=Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178)),l=s(a,`users2/${i.uid}/info/`);await o(l,{displayName:i.displayName,photoURL:i.photoURL}),e("saveUserInfo",i),t("setUID"),e("changeLoginStatus",!0)},setUID({state:t}){window.localStorage.setItem("uid",t.uid)},getUID(){return window.localStorage.getItem("uid")}}},p={namespaced:!0,state:{settings:{speech:null,timer:null}},mutations:{saveSettings(t,e){t.settings=e},saveTimer(t,e){t.settings.timer=e}},actions:{async requestSettings({commit:t}){const e=await L(),{ref:i,get:a}=await Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178)),s=i(e,"/settings");try{let e=await a(s);if(e.exists()){let n=e.val();t("saveSettings",n)}else console.log("No data available")}catch(o){console.log(o)}},async requestTimer({commit:t}){const e=await L(),{ref:i,get:a}=await Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178)),s=i(e,"/settings/timer");try{let e=await a(s);if(e.exists()){let n=e.val();t("saveTimer",n)}else console.log("No data available")}catch(o){console.log(o)}}},getters:{getSpeech:t=>t.settings.speech,getTimer:t=>t.settings.timer}};var y=n(8661);const x={namespaced:!0,state:{statistic:null,dateList:null},mutations:{saveStatistic(t,e){t.statistic=e},createDateList(t,e){let n={};for(let i in e){n[i]=[];for(let t in e[i].statistic){t=parseInt(t);let[e,a]=(0,y._3)(t),s=n[i].findIndex((t=>t[0]===e));s>-1?n[i][s][1].push({timestamp:t,time:a}):n[i].push([e,[{timestamp:t,time:a}]])}n[i].reverse(),n[i].map((([,t])=>t.reverse()))}t.dateList=n}},actions:{async requestStatistic({commit:t},{uid:e,isAdmin:i=!1}){let a=i?"":`${e}/`;const s=await L(),{ref:o,get:l}=await Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178)),r=o(s,`users2/${a}`);let h=await l(r);if(h.exists()){let n=await h.val();if(i)for(let[t,e]of Object.entries(n))e?.statistic||delete n[t];else{let t={};t[e]=n,n=t}t("saveStatistic",n),t("createDateList",n)}}},getters:{getAnswers(t){return function(e,n){return t.statistic[e].statistic[n]}}}},b={namespaced:!0,state:{answers:null,isTesting:!1,timeSpent:null,timestamp:null,timeLeft:null},mutations:{prepareAnswers(t,{dictionary:e,limits:n}){let i={};for(let a in e)i[a]=(0,y.EF)(e[a],n[a]);t.answers=i},saveTimes(t,e){t.timeSpent=e;let n=new Date;t.timestamp=n.setSeconds(0,0)},changeTestStatus(t,e){t.isTesting=e},saveChoice(t,{choice:e,question:n,difficult:i}){let a=t.answers[i].findIndex((t=>t.question===n));t.answers[i][a].choice=e},saveTimerSec(t,e){t.timeLeft=e}},actions:{async sendAnswersToDB({state:t},{uid:e}){const i=await L(),{ref:a,set:s}=await Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178)),o=a(i,`users2/${e}/statistic/${t.timestamp}`);try{await s(o,{test:t.answers,timeSpent:t.timeSpent})}catch(l){console.log(l)}}}};var w=(0,m.MT)({state:{orderDifficult:["easy","medium","hard"]},getters:{},mutations:{},actions:{},modules:{auth:g,settings:p,statistic:x,test:b}});const M={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-zhome.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"};let v=null,P=null,I=null;async function S(){if(!v){const{initializeApp:t}=await Promise.all([n.e(77),n.e(213)]).then(n.bind(n,4275));v=t(M)}return v}async function T(){if(!P){const{getAuth:t}=await Promise.all([n.e(77),n.e(789)]).then(n.bind(n,5421));P=t(v)}return P}async function L(){if(!I){const{getDatabase:t}=await Promise.all([n.e(77),n.e(495)]).then(n.bind(n,1178));I=t(v)}return I}S().then((t=>{v=t,(0,i.ri)(h).use(w).use(d).mount("#app")})).catch((t=>{console.log(t)}))},8661:function(t,e,n){function i(t,e){return t.question<e.question?-1:1}function a(t,e){let n=[],a=[...t];for(let i=0;i<e;i++){let t=o(a);n.push(t),a=s(t,a)}return n.sort(i)}function s(t,e){return e.filter((e=>t instanceof Object?e.question!==t.question:e!==t))}function o(t){return t[Math.floor(Math.random()*t.length)]}function l(t){return new Intl.DateTimeFormat("ru-Ru",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(parseInt(t))).split(", ")}function r(t){t.width=window.innerWidth,t.height=window.innerHeight;const e=t.getContext("2d");window.addEventListener("resize",(()=>{t.width=window.innerWidth,t.height=window.innerHeight,e.fillStyle="#000",e.fillRect(0,0,t.width,t.height)})),e.fillStyle="#000",e.fillRect(0,0,t.width,t.height);let n=[],i=[],a=20,s={x:t.width/2,y:t.height/2},o=400;for(let c=0;c<a;c++){let e={x:Math.random()*o/2-o/4+s.x,y:Math.random()*o*2+t.height,size:Math.random()+.5,fill:"#fd1",vx:Math.random()-.5,vy:-(Math.random()+4),ax:.02*Math.random()-.01,far:Math.random()*o+(s.y-o)};e.base={x:e.x,y:e.y,vx:e.vx},n.push(e)}function l(){let t=Math.floor(256*Math.random()),e=Math.floor(256*Math.random()),n=Math.floor(256*Math.random());return`rgb(${t},${e},${n}`}function r(){for(let t=0;t<n.length;t++){let e=n[t];if(e.y<=e.far){let t=l();for(let n=0;n<5*a;n++){let n={x:e.x,y:e.y,size:Math.random()+1.5,fill:t,vx:5*Math.random()-2.5,vy:-5*Math.random()+1.5,ay:.05,alpha:1,life:Math.round(Math.random()*o/2)+o/2};n.base={life:n.life,size:n.size},i.push(n)}e.y=e.base.y,e.x=e.base.x,e.vx=e.base.vx,e.ax=.02*Math.random()-.01}e.x+=e.vx,e.y+=e.vy,e.vx+=e.ax}for(let t=i.length-1;t>=0;t--){let e=i[t];e&&(e.x+=e.vx,e.y+=e.vy,e.vy+=e.ay,e.alpha=e.life/e.base.life,e.size=e.alpha*e.base.size,e.alpha=e.alpha>.6?1:e.alpha,e.life--,e.life<=0&&i.splice(t,1))}}function h(){e.globalCompositeOperation="source-over",e.globalAlpha=.18,e.fillStyle="#000",e.fillRect(0,0,t.width,t.height),e.globalCompositeOperation="screen",e.globalAlpha=1;for(let t=0;t<n.length;t++){let i=n[t];e.beginPath(),e.arc(i.x,i.y,i.size,0,2*Math.PI),e.closePath(),e.fillStyle=i.fill,e.fill()}for(let t=0;t<i.length;t++){let n=i[t];e.globalAlpha=n.alpha,e.beginPath(),e.arc(n.x,n.y,n.size,0,2*Math.PI),e.closePath(),e.fillStyle=n.fill,e.fill()}}(function t(){requestAnimationFrame(t),r(),h()})()}function h(t){[t.width,t.height]=[window.innerWidth,window.innerHeight];const e=t.getContext("2d"),n=t.width,i=t.height,a=Math.round(Math.min(n,i)/4),s=Math.round(n/2),o=Math.round(i/2),l=t=>t*Math.PI/180,r=(t,e)=>Math.random()*(e-t)+t,h="rgb(255, 231, 188)",c="rgb(153, 54, 0)",u="rgb(107, 38, 0)";let f="rgb(42, 42, 42)",d="rgb(29, 29, 29)";const[m,g]=[a/3,a/10];let p=11*-a/12,y=p-a/5,x=[],b=!1,w=1;const M=.1;let v=1;const P={create(t,e){const n={x:t,y:e};let i={x:0,y:0,r:5};const a=Math.round(r(0,1)),s=1===a?-.1*r(0,50):.1*r(0,50);let o=r(-10,10);const l=`hsl(${r(30,60)},100%,${r(50,100)}%)`;return{color:l,coords:{dx:s,dy:o,...i},translate:n}},draw({translate:t,coords:n,color:i}){return e.save(),e.translate(t.x,t.y),e.rotate(30*Math.PI/180),e.fillStyle=i,e.beginPath(),e.arc(n.x,n.y,n.r,0,2*Math.PI),e.fill(),e.restore(),this.update(n)},update(t){return t.r-=.05,t.x+=t.dx,t.y+=t.dy,t.dy++,t}},I={create(t,e,n){const i={x:10*Math.min(t.x,e.x,n.x)/a,y:10*Math.min(t.y,e.y,n.y)/a},s={x:0,y:0};return{a:t,b:e,c:n,delta:i,translate:s}},update({delta:t,translate:e}){return e.x+=t.x,e.y+=t.y,e},draw({a:t,b:n,c:i,translate:a,delta:s}){return e.save(),e.translate(a.x,a.y),e.fillStyle="transparent",e.strokeStyle="black",e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.lineTo(i.x,i.y),e.clip(),A(),e.restore(),this.update({delta:s,translate:a})}};let S=[],T=1,L=[],k=1,U=0;function A(){const t=a/4,n=Math.acos(t/(2*a));e.save(),e.beginPath(),e.fillStyle=d,e.arc(0,0,a,0,2*Math.PI),e.fill(),e.globalCompositeOperation="source-atop",e.beginPath(),e.arc(0,0,a,-n,n),e.arc(t,0,a,Math.PI-n,Math.PI+n),e.fillStyle=f,e.fill(),e.restore()}function $(){function t(t){const n=l(120);e.beginPath(),e.ellipse(0,y,m,g,0,n*!t,n*t||Math.PI),e.ellipse(0,p,m,g,0,n*t||Math.PI,n*!t,!0),e.ellipse(0,y,m,g,0,n*!t,n*!t),e.stroke(),e.fill()}function n(t){const n=l(160);e.beginPath(),e.ellipse(0,y,m,g,0,n,2*(n-Math.PI),!!t),e.stroke(),e.fill()}for(let i=0;i<2;i++)e.fillStyle=i?f:d,e.strokeStyle=i?f:d,n(i),t(i)}function C(t=0,n=1,i){const s=l(120),o={x:0,y:y},r={x:-m/2,y:y-a/4},h={x:m/3,y:y-a/2},f={x:-m/6,y:y-3*a/4},[d,p]=[m/6,g/6];let x,b;function w(t){const n=(1-t)**3,a=3*t*(1-t)**2,l=3*t**2*(1-t),m=t**3;x=n*o.x+a*r.x+l*h.x+m*f.x,b=n*o.y+a*r.y+l*h.y+m*f.y,e.beginPath(),e.strokeStyle=i||u,e.ellipse(x,b,d,p,0,s,Math.PI),e.stroke(),e.beginPath(),e.strokeStyle=i||c,e.ellipse(x,b,d,p,0,0,s),e.stroke()}function M(){e.beginPath(),e.fillStyle=i||u,e.ellipse(x,b,d,p,0,0,2*Math.PI),e.fill()}for(let e=t;e<=n;e+=.001)w(e);if(M(),i)return[x,b]}function D(){b=!0,A(),$(),C(0,w);const t=Math.max(w,0),e=Math.min(1,w+M);let[n,i]=C(t,e,h);n&&i&&x.push(P.create(n,i)),x=x.filter((t=>(t.coords=P.draw(t),t.coords.r>0))),w-=M/10}function q(){S=S.filter((t=>(t.translate=I.draw(t),Math.abs(t.translate.x)<n&&Math.abs(t.translate.y)<i))),y-=10,p-=10,$(),v-=.01,f=`rgba(42, 42, 42, ${v})`,d=`rgba(29, 29, 29, ${v})`}function R(){T-=.02;for(let t=0;t<L.length;t++){const{r:a,g:s,b:o,o:l}=L[t].color;e.fillStyle=`rgba(${a},${s},${o},${l}`;const r=L[t].pos;e.beginPath(),r.forEach((({x:t,y:n})=>{e.lineTo(t,n)})),e.fill(),L[t].pos=r.map(i),L[t].color=n(L[t].color)}function n({r:t,g:e,b:n,o:i}){return{r:t,g:e-1,b:n-.5,o:i-.02}}function i({x:t,y:e}){const n=t/15,i=e/15;return{x:t+n,y:e+i}}L=L.filter((e=>e.pos.every((e=>Math.abs(e.x)<10*t.width&&Math.abs(e.y)<10*t.height))))}function z(){const t="TEST OVER";e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgba(255, 255, 255, 1)",e.save();for(let n=.02;n<.1;n+=.02)e.font=16*(U-n)+"rem Khula sans-serif",e.fillText(t,s,o);e.restore(),e.font=16*U+"rem Khula sans-serif",e.fillText(t,s,o),e.font=16*U+"rem Khula sans-serif",e.strokeStyle="rgba(0, 0, 0, 1)",e.strokeText(t,s,o),U+=.01,k=e.measureText(t).width}function _(){k<1.5*s?(requestAnimationFrame(_),e.fillStyle="#000",e.fillRect(-t.width,-t.height,2*t.width,2*t.height)):setTimeout((()=>console.log("redirect")),3e3),!x.length&&b||D(),!x.length&&v>=0&&q(),v<.5&&T>0&&R(),T<0&&1===k&&(e.rotate(l(30)),e.translate(-s,-o)),T<0&&z()}function E(){const[t,e]=W(a),n=[];for(let i=0;i<e.length;i+=3){const a=I.create(t[e[i]],t[e[i+1]],t[e[i+2]]);n.push(a)}return n}function N(t){const e=100;let n=1,i=[],a=0;for(let s=0;s<t;s++){const t=r(0,2*Math.PI);i.push(t)}return i.sort(),function(){const t=e*Math.cos(i[a])*(1-n/4),s=e*Math.sin(i[a])*(1-n/4);return n*=-1,a++,{x:t,y:s}}}function O(){L[L.length-1]?.flag&&(L[L.length-1].flag=!1);let t={r:255,g:236,b:73,o:T};const e=Math.round(r(50,75)),n=N(e);let i=[];for(let a=0;a<e;a++)i.push(n());L.push({flag:!0,pos:i,color:t})}function W(t){const e=1e-7,n=[],i=Math.floor(t/4);for(let h=0;h<i;h++)n.push(a(t));function a(t){const e=Math.random()*(3*t)-1.5*t,n=Math.random()*(3*t)-1.5*t;return{x:e,y:n}}function s(t){let n=t.length;if(n<3)return[];t=t.slice(0);let i=[];for(let e=0;e<n;e++)i.push(e);i.sort(((e,n)=>t[e].x-t[n].x));let a=l(t);t.push(a.p1,a.p2,a.p3);let s=[o(t,n,n+1,n+2)],h=[],c=[];for(let l=i.length-1;l>=0;l--){for(let n=s.length-1;n>=0;n--){let a=t[i[l]].x-s[n].x;if(a>0&&a*a>s[n].r){h.push(s[n]),s.splice(n,1);continue}let o=t[i[l]].y-s[n].y;a*a+o*o-s[n].r>e||(c.push(s[n].a,s[n].b,s[n].b,s[n].c,s[n].c,s[n].a),s.splice(n,1))}r(c);for(let e=c.length-1;e>=0;){let n=c[e];if(e--,e<0)break;let a=c[e];e--,s.push(o(t,a,n,i[l]))}c=[]}for(let e=s.length-1;e>=0;e--)h.push(s[e]);let u=[];for(let e=0;e<h.length;e++)h[e].a<n&&h[e].b<n&&h[e].c<n&&u.push(h[e].a,h[e].b,h[e].c);return u}function o(t,n,i,a){let s,o,l=t[n].x,r=t[n].y,h=t[i].x,c=t[i].y,u=t[a].x,f=t[a].y,d=Math.abs(r-c),m=Math.abs(c-f);if(d<e){let t=-(u-h)/(f-c),e=(h+u)/2,n=(c+f)/2;s=(l+h)/2,o=t*(s-e)+n}else if(m<e){let t=-(h-l)/(c-r),e=(l+h)/2,n=(r+c)/2;s=(h+u)/2,o=t*(s-e)+n}else{let t=-(h-l)/(c-r),e=-(u-h)/(f-c),n=(l+h)/2,i=(r+c)/2,a=(h+u)/2,g=(c+f)/2;s=(t*n-e*a+g-i)/(t-e),o=d>m?t*(s-n)+i:e*(s-a)+g}let g=h-s,p=c-o;return{a:n,b:i,c:a,x:s,y:o,r:g*g+p*p}}function l(t){let e=1e6,n=-1e6,i=1e6,a=-1e6;for(let d=0;d<t.length;d++)e=Math.min(e,t[d].x),i=Math.min(i,t[d].y),n=Math.max(n,t[d].x),a=Math.max(a,t[d].y);let s=n-e,o=a-i,l=Math.max(s,o),r=.5*s+e,h=.5*o+i;const c={x:r-10*l,y:h-10*l},u={x:r,y:h+10*l},f={x:r+10*l,y:h-10*l};return{p1:c,p2:u,p3:f}}function r(t){for(let e=t.length-1;e>=0;){let n=t[e];e--;let i,a,s=t[e];e--;for(let o=e;o>=0;){if(i=t[o],o--,a=t[o],o--,s===a&&n===i){t.splice(e+1,2),t.splice(o+1,2);break}if(s===i&&n===a){t.splice(e+1,2),t.splice(o+1,2);break}}}}return[n,s(n)]}e.translate(s,o),e.rotate(l(-30)),S=E(a),O(),_()}n.d(e,{EF:function(){return a},_3:function(){return l},_I:function(){return h},bm:function(){return r}})},4966:function(t,e,n){t.exports=n.p+"img/google.c55233fb.svg"}}]);
//# sourceMappingURL=chunk-common.fd53cf0c.js.map