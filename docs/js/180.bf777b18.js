"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[180],{5180:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var s=i(3396),n=i(7139);const r={key:0};function o(t,e,i,o,a,l){const h=(0,s.up)("test-info-component");return(0,s.wg)(),(0,s.iD)("div",{class:(0,n.C_)(["date",{open:a.isOpen}]),onClick:e[0]||(e[0]=(...t)=>l.toOpen&&l.toOpen(...t))},[(0,s._)("div",{ref:"title",class:(0,n.C_)({top:a.isTop,date__item:a.isOpen})},(0,n.zw)(i.date)+" Тестов: "+(0,n.zw)(i.timeArray.length),3),a.isOpen?((0,s.wg)(),(0,s.iD)("div",r,[((0,s.wg)(),(0,s.j4)(s.Ob,null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.timeArray,(t=>((0,s.wg)(),(0,s.j4)(h,{key:t.timestamp,date:i.date,time:t.time,answers:l.answers(t.timestamp),"height-title":a.heightTitle},null,8,["date","time","answers","height-title"])))),128))],1024))])):(0,s.kq)("",!0)],2)}var a=i(6623),l={name:"dateListComponent",components:{testInfoComponent:(0,s.RC)((()=>i.e(35).then(i.bind(i,9035))))},props:{activeUserUID:String,date:String,timeArray:Array},data(){return{isTop:!1,isOpen:!1,heightTitle:0}},computed:{...(0,a.Se)("statistic",["getAnswers"]),...(0,a.rn)(["orderDifficult"])},methods:{getTop(){this.isOpen&&(this.isTop=0===this.$refs.title.getBoundingClientRect().top)},answers(t){return this.getAnswers(this.activeUserUID,t)},toOpen(t){t.target===this.$refs.title&&(this.isOpen=!this.isOpen,this.isOpen?window.addEventListener("scroll",this.getTop):window.removeEventListener("scroll",this.getTop))},calculateHeightTitle(){if(!this.$refs.title.classList.contains("date__item"))return;let t=getComputedStyle(this.$refs.title).marginBottom;this.heightTitle=this.$refs.title.getBoundingClientRect().height+parseInt(t)}},beforeUnmount(){window.removeEventListener("scroll",this.getTop)},updated(){this.calculateHeightTitle()}},h=i(89);const p=(0,h.Z)(l,[["render",o],["__scopeId","data-v-b4b3dbca"]]);var d=p}}]);
//# sourceMappingURL=180.bf777b18.js.map