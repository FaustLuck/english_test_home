"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[621],{4621:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var n=s(3396);const a=["value"];function i(t,e,s,i,u,h){return(0,n.wg)(),(0,n.iD)("input",{type:"button",value:h.title,onClick:e[0]||(e[0]=(...t)=>h.changeStatus&&h.changeStatus(...t))},null,8,a)}var u=s(65),h={name:"startButtonComponent",data(){return{}},computed:{...(0,u.rn)("test",["isTesting"]),title(){return this.isTesting?"Завершить тест":"Начать тест"},mode(){return this.$route.name}},methods:{...(0,u.OI)("test",["changeTestStatus"]),...(0,u.OI)(["setLoading"]),...(0,u.nv)("test",["getTest","checkTest"]),async changeStatus(){this.isTesting?(this.changeTestStatus(!1),this.setLoading(!0),this.$router.push({name:"result"})):("test"!==this.mode&&this.$router.replace({name:"test"}),this.setLoading(!0),await this.getTest({sub:""}),this.changeTestStatus(!0),this.setLoading(!1))}}},r=s(89);const o=(0,r.Z)(h,[["render",i],["__scopeId","data-v-5e7a6d2a"]]);var c=o}}]);