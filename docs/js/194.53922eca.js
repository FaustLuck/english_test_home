"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[194],{3194:function(t,e,i){i.r(e),i.d(e,{default:function(){return u}});var s=i(3396),n=i(7139);function o(t,e,i,o,l,p){return(0,s.wg)(),(0,s.iD)("div",{class:(0,n.C_)(["container",{open:l.isOpen||i.mustIsOpen}]),onClick:e[0]||(e[0]=(...t)=>p.toOpen&&p.toOpen(...t))},[(0,s._)("div",{ref:"title",class:(0,n.C_)({top:l.isTop||i.mustIsTop,container__title:l.isOpen||i.mustIsTop,sticky:l.isOpen})},(0,n.zw)(i.title),3),l.isOpen||i.mustIsOpen?(0,s.WI)(t.$slots,"default",{key:0,heightTitle:l.heightTitle},void 0,!0):(0,s.kq)("",!0)],2)}var l=i(6623),p={name:"titleComponent",props:{title:String,mustIsOpen:Boolean,mustIsTop:Boolean},data(){return{isOpen:!1,isTop:!1,heightTitle:0}},computed:{...(0,l.rn)(["menuHeight"])},methods:{getTop(){if(!this.isOpen)return;let t=this.$refs.title.getBoundingClientRect().top;this.isTop=t<=this.menuHeight},toOpen(t){t.target===this.$refs.title&&(this.isOpen=!this.isOpen,this.isOpen?(this.$refs.title.style.top=`${this.menuHeight}px`,window.addEventListener("scroll",this.getTop)):window.removeEventListener("scroll",this.getTop))},calculateHeightTitle(){let t=this.$refs.title;if(!t.classList.contains("container__title"))return;let e=parseInt(getComputedStyle(t).marginBottom),i=t.getBoundingClientRect().height,s=parseInt(getComputedStyle(t).top);this.heightTitle=i+e+s}},beforeUnmount(){window.removeEventListener("scroll",this.getTop)},updated(){this.isOpen&&this.calculateHeightTitle()}},r=i(89);const h=(0,r.Z)(p,[["render",o],["__scopeId","data-v-c7ccb120"]]);var u=h}}]);