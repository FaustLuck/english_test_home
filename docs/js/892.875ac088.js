"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[892],{1892:function(t,n,e){e.r(n),e.d(n,{default:function(){return h}});var s=e(3396),i=e(7139);const r={key:1},a={class:"time"},u=(0,s._)("span",null,"Ограничение по времени: ",-1),l=(0,s.Uk)(" : "),o={class:"variants"},c=(0,s._)("span",null,"Количество вариантов ответов: ",-1);function d(t,n,e,d,p,g){const f=(0,s.up)("preloader-component"),m=(0,s.up)("test-difficult-component");return p.isLoading?((0,s.wg)(),(0,s.j4)(f,{key:0})):((0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",a,[u,(0,s._)("span",null,(0,i.zw)(t.settings.timer.min),1),l,(0,s._)("span",null,(0,i.zw)(t.settings.timer.sec),1)]),(0,s._)("div",o,[c,(0,s._)("span",null,(0,i.zw)(t.settings.variants),1)]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.orderDifficult,(n=>((0,s.wg)(),(0,s.j4)(m,{key:n,difficult:n,"part-answers":t.settings.dictionary[n]},null,8,["difficult","part-answers"])))),128))]))}var p=e(6623),g={name:"SettingsView",components:{testDifficultComponent:(0,s.RC)((()=>e.e(388).then(e.bind(e,9388)))),preloaderComponent:(0,s.RC)((()=>e.e(437).then(e.bind(e,4437))))},data(){return{isLoading:!0}},computed:{...(0,p.rn)("auth",["isAdmin"]),...(0,p.rn)("settings",["settings"]),...(0,p.rn)(["orderDifficult"])},methods:{...(0,p.nv)("settings",["requestSettings"])},async created(){this.isLoading=!await this.requestSettings()}},f=e(89);const m=(0,f.Z)(g,[["render",d]]);var h=m}}]);