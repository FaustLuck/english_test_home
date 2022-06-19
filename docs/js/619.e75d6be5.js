"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[619],{3122:function(t,e,n){n.d(e,{Z:function(){return m}});var r=n(8473);const i={class:"start_btn"},s={key:0},a=["value"],c={key:1};function o(t,e,n,o,u,h){return(0,r.wg)(),(0,r.iD)("div",i,["test"!==u.path?((0,r.wg)(),(0,r.iD)("div",s)):(0,r.kq)("",!0),(0,r._)("input",{type:"button",value:u.title,onClick:e[0]||(e[0]=(...t)=>h.changeReady&&h.changeReady(...t))},null,8,a),"test"!==u.path?((0,r.wg)(),(0,r.iD)("div",c)):(0,r.kq)("",!0)])}var u=n(299),h={name:"StartButton",data(){return{title:"Начать тест",path:this.$router.currentRoute.value.name}},computed:{...(0,u.rn)(["readyToTest"])},watch:{readyToTest:function(t){this.changeTitle(t)}},methods:{changeReady(){"/"!==this.path?this.$router.push("/"):this.$store.dispatch("changeReady",!this.readyToTest)},changeTitle(t){this.title=t?"Завершить тест":"Начать тест"}}},l=n(5312);const d=(0,l.Z)(h,[["render",o],["__scopeId","data-v-6eaf92e4"]]);var m=d},9626:function(t,e,n){n.r(e),n.d(e,{default:function(){return T}});var r=n(8473),i=n(4887);const s=t=>((0,r.dD)("data-v-54f3c972"),t=t(),(0,r.Cn)(),t),a=s((()=>(0,r._)("div",null,null,-1))),c={key:0};function o(t,e,n,s,o,u){const h=(0,r.up)("loader-spinner"),l=(0,r.up)("start-button"),d=(0,r.up)("difficult-list");return o.loading?((0,r.wg)(),(0,r.j4)(h,{key:0})):((0,r.wg)(),(0,r.iD)("div",{key:1,class:(0,i.C_)({fail:0===o.timerSec})},[(0,r._)("header",{class:(0,i.C_)({warning:o.timerSec>10&&o.timerSec<31,alert:o.timerSec<11&&o.timerSec>0})},[(0,r.Wm)(l),(0,r._)("span",null,(0,i.zw)(o.timerString),1),a],2),t.readyToTest?((0,r.wg)(),(0,r.iD)("div",c,[(0,r.Wm)(d,{questions:o.test},null,8,["questions"])])):(0,r.kq)("",!0)],2))}var u=n(299),h=n(7828);const l={create:function({dictionary:t,limits:e,variants:n}){let r={},i={};for(let s in t){let a=t[s],c=e[s],o=m(a,c).sort(h.qu);i[s]=[...o],i[s]=i[s].map((t=>({answer:void 0,question:t.question}))),o=d(c,o,a,n),r[s]=o}return[r,i]},cancel:function(t,e,n,{dictionary:r}){let i=Object.values(t).reduce(((t,e)=>t+e.length),0);for(let u in r)for(let e of t[u]){let t=r[u].find((t=>t.question===e.question));e.answer||(e.answer="Не выбрано"),e.answer=t.answer===e.answer?[t.answer]:[e.answer,t.answer].sort(),e.correct=1===e.answer.length,e.index=e.answer.findIndex((e=>e===t.answer))}let s=0;Object.values(t).forEach((t=>{s+=t.reduce(((t,e)=>t+e.answer.length),0)})),s=2*i-s;let a={},[c,o]=(0,h._3)();return a[c]={},a[c][o]={test:t,congratulations:s===i,reason:n,["time spent"]:e,questions:i,correctAnswers:s},a}};function d(t,e,n,r){for(let i=0;i<t;i++){let t={...e[i]},s=t.answer,a=m(n.map((t=>t.answer)).filter((t=>t!==s)),r-1);a.push(s),a.sort(),t.answer=a,e[i]={...t}}return e}function m(t,e){let n=[],r=[...t];for(let i=0;i<e;i++){let t=f(r);n.push(t),r=g(t,r)}return n}function g(t,e){return e.filter((e=>t instanceof Object?e.question!==t.question:e!==t))}function f(t){return t[Math.floor(Math.random()*t.length)]}var p=n(3122),w=n(8749),S={name:"TestPage",components:{DifficultList:w.Z,StartButton:p.Z},data(){return{timerString:"",timerSec:0,timerStart:0,counterId:"",loading:!0,test:{}}},watch:{timerSec:function(t){this.timerString=this.timeToString(t),t||this.cancel()},settings:function(t){t?.timer&&(this.loading=!1,this.timerSec=this.timerStart=60*t.timer.min+t.timer.sec)},readyToTest:function(t){t?this.begin():this.cancel()}},async created(){this.$store.dispatch("settings/getSettings")},computed:{...(0,u.rn)("settings",["settings"]),...(0,u.rn)(["readyToTest","answers"]),...(0,u.rn)("authorization",["displayName"])},methods:{timeToString(t){let e=(t%60).toString().padStart(2,"0"),n=(t-e)/60;return`${n}:${e}`},begin(){let t;[this.test,t]=l.create(this.settings),this.timerSec=this.timerStart,this.$store.commit("SAVE_ANSWERS",t),this.start()},cancel(){clearInterval(this.counterId);let t=this.timeToString(this.timerStart-this.timerSec),e=this.timerStart-this.timerSec?"Тест завершен":"Время истекло",n=l.cancel(this.answers,t,e,this.settings);this.$store.dispatch("saveAnswers",n),this.$store.dispatch("changeReady",!1),this.timerSec?this.$router.push("result"):setTimeout((()=>{this.$router.push("result")}),2500)},start(){this.counterId=setInterval((()=>{this.timerSec--}),1e3)}}},v=n(5312);const y=(0,v.Z)(S,[["render",o],["__scopeId","data-v-54f3c972"]]);var T=y}}]);
//# sourceMappingURL=619.e75d6be5.js.map