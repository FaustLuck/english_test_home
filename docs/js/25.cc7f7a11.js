"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[25],{6025:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var n=i(3396),s=i(7139);const o={key:0};function r(t,e,i,r,a,l){const p=(0,n.up)("test-info-component");return(0,n.wg)(),(0,n.iD)("div",{class:(0,s.C_)(["date",{open:a.isOpen}]),onClick:e[0]||(e[0]=(...t)=>l.toOpen&&l.toOpen(...t))},[(0,n._)("div",{ref:"title",class:(0,s.C_)({top:a.isTop,date__item:a.isOpen})},(0,s.zw)(i.date)+" Тестов: "+(0,s.zw)(i.timeArray.length),3),a.isOpen?((0,n.wg)(),(0,n.iD)("div",o,[((0,n.wg)(),(0,n.j4)(n.Ob,null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(i.timeArray,(t=>((0,n.wg)(),(0,n.j4)(p,{key:t.timestamp,date:i.date,time:t.time,answers:l.answers(t.timestamp),"height-title":a.heightTitle},null,8,["date","time","answers","height-title"])))),128))],1024))])):(0,n.kq)("",!0)],2)}var a=i(6623),l={name:"dateListComponent",components:{testInfoComponent:(0,n.RC)((()=>i.e(777).then(i.bind(i,2777))))},props:{uid:String,date:String,timeArray:Array},data(){return{isTop:!1,isOpen:!1,heightTitle:0}},computed:{...(0,a.Se)("statistic",["getAnswers"]),...(0,a.rn)(["orderDifficult"])},methods:{getTop(){if(!this.isOpen)return;let t=this.$refs.title.getBoundingClientRect().top;this.isTop=window.matchMedia("(max-width: 768px)")?65===t:0===t},answers(t){return this.getAnswers(this.uid,t)},toOpen(t){t.target===this.$refs.title&&(this.isOpen=!this.isOpen,this.isOpen?window.addEventListener("scroll",this.getTop):window.removeEventListener("scroll",this.getTop))},calculateHeightTitle(){let t=this.$refs.title;if(!t.classList.contains("date__item"))return;let e=parseInt(getComputedStyle(t).marginBottom),i=t.getBoundingClientRect().height,n=parseInt(getComputedStyle(t).top);this.heightTitle=i+e+n}},beforeUnmount(){window.removeEventListener("scroll",this.getTop)},updated(){this.calculateHeightTitle()}},p=i(89);const h=(0,p.Z)(l,[["render",r],["__scopeId","data-v-71938d74"]]);var d=h}}]);
//# sourceMappingURL=25.cc7f7a11.js.map