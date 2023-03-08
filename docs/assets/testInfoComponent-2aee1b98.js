import{_ as S,d as u,a as m,m as p,b as g,c as b,z as M,o as n,f as _,e as c,t as a,g as d,h as s,F as w,j as C,n as I,r as f,p as k,i as L}from"./main-73d6e790.js";const D={name:"testInfoComponent",components:{itemPreloader:u(()=>m(()=>import("./itemPreloader-e132bfa3.js"),["assets/itemPreloader-e132bfa3.js","assets/main-73d6e790.js","assets/main-f7af7ba4.css","assets/itemPreloader-6b651cd2.css"])),preloaderComponent:u(()=>m(()=>import("./preloaderComponent-22c2e33f.js"),["assets/preloaderComponent-22c2e33f.js","assets/main-73d6e790.js","assets/main-f7af7ba4.css","assets/preloaderComponent-82881bbd.css"])),testDifficultComponent:u(()=>m(()=>import("./testDifficultComponent-2952ba8b.js"),["assets/testDifficultComponent-2952ba8b.js","assets/main-73d6e790.js","assets/main-f7af7ba4.css","assets/testDifficultComponent-a08c258f.css"]))},props:{timestamp:Number,testInfo:Object,sub:String,heightTitle:Number},data(){var t,e;return{displayMode:0,date:0,time:0,localTest:null,localTimeSpent:(t=this.testInfo)==null?void 0:t.timeSpent,localTimeLeft:(e=this.testInfo)==null?void 0:e.timeLeft}},watch:{result(t){t&&this.mode==="result"&&(this.localTest=this.result,this.localTimeSpent=this.timeSpent,this.localTimeLeft=this.timeLeft,this.isCongratulation&&this.$emit("show","fire"),this.isFail&&this.$emit("show","fail"),this.setLoading(!1))},async sub(t){t&&await this.saveTest({sub:t})}},computed:{...p("test",["timeSpent","result","timeLeft"]),...p(["orderDifficult","isLoading","mode"]),...p("auth",["name"]),length(){return this.mode==="result"?Object.values(this.result).reduce((t,e)=>t+e.length,0):this.testInfo.questions},correct(){return this.mode==="result"?Object.values(this.result).reduce((t,e)=>t+e.filter(r=>r.answer===(r==null?void 0:r.choice)).length,0):this.testInfo.correct},timeSpentToString(){let t=(this.localTimeSpent%60).toString().padStart(2,"0");return`${(this.localTimeSpent-t)/60}:${t}`},isCongratulation(){return this.length===this.correct},isFail(){return this.localTimeLeft===0}},methods:{...g("statistic",["getResult"]),...g("test",["checkTest","saveTest"]),...b(["setLoading"]),async changeDisplayMode(t){if(this.mode==="result"&&!this.localTest||(this.displayMode++,this.displayMode>2&&(this.displayMode=0),(this.isCongratulation||!this.correct)&&this.displayMode===1&&(this.displayMode=2),this.displayMode===0))return;await this.getResultFromBD();let e=t.target.closest(".info");setTimeout(()=>this.scroll(e),0)},async getResultFromBD(){this.localTest||(this.localTest=await this.getResult({sub:this.sub,timestamp:this.timestamp}))},scroll(t){let e=t.getBoundingClientRect().top;e!==this.heightTitle&&this.displayMode>0&&window.scrollBy({top:e-this.heightTitle,behavior:"smooth"})},filterTest(t){return this.localTest[t].filter(e=>e.answer!==(e==null?void 0:e.choice))}},async mounted(){[this.date,this.time]=M(this.timestamp),this.mode==="result"&&(await this.checkTest({sub:this.sub}),this.displayMode=2,this.sub&&await this.saveTest({sub:this.sub}))}},h=t=>(k("data-v-5d04c392"),t=t(),L(),t),B={key:0,class:"info__login"},F={class:"info__detail-clickable"},R={class:"info__detail"},E=h(()=>s("span",null,"Время тестирования:",-1)),O={class:"info__detail"},A=h(()=>s("span",null,"Кол-во верных ответов / вопросов:",-1)),P={class:"info__detail"},V=h(()=>s("span",null,"Времени затрачено:",-1)),j={key:0,class:"info__detail-fail"},N=h(()=>s("span",null,"Время вышло!",-1)),z=[N],q={key:2};function G(t,e,r,H,i,o){const y=f("preloader-component"),T=f("item-preloader"),v=f("test-difficult-component");return t.isLoading&&t.mode==="result"?(n(),_(y,{key:0})):(n(),c("section",{key:1,class:I(["info",{fail:o.isFail&&t.mode!=="result"&&!i.displayMode,congratulation:o.isCongratulation&&t.mode!=="result"&&!i.displayMode}]),onClick:e[0]||(e[0]=(...l)=>o.changeDisplayMode&&o.changeDisplayMode(...l))},[t.mode==="result"?(n(),c("div",B,a(t.name?t.name:"Вход не выполнен"),1)):d("",!0),s("div",F,[s("div",R,[E,s("span",null,a(i.date)+" "+a(i.time),1)]),s("div",O,[A,s("span",null,a(o.correct)+" / "+a(o.length),1)]),s("div",P,[V,s("span",null,a(o.timeSpentToString),1)]),o.isFail&&t.mode==="result"?(n(),c("div",j,z)):d("",!0)]),i.displayMode>0&&!i.localTest?(n(),_(T,{key:1})):d("",!0),i.displayMode>0&&i.localTest?(n(),c("div",q,[(n(!0),c(w,null,C(t.orderDifficult,l=>(n(),_(v,{key:l,difficult:l,"part-answers":i.displayMode===1?o.filterTest(l):i.localTest[l]},null,8,["difficult","part-answers"]))),128))])):d("",!0)],2))}const K=S(D,[["render",G],["__scopeId","data-v-5d04c392"]]);export{K as default};
