"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[382,866],{5866:function(t,e,n){n.r(e),n.d(e,{default:function(){return d}});var i=n(3396),s=n(7139);const r={key:1};function a(t,e,n,a,o,u){const c=(0,i.up)("card-test-component");return(0,i.wg)(),(0,i.iD)(i.HY,null,[n.partAnswers.length?((0,i.wg)(),(0,i.iD)("div",{key:0,class:(0,s.C_)(["difficult",{pointer:u.isSettingsPage,open:o.isOpen}]),onClick:e[0]||(e[0]=(...t)=>u.toOpen&&u.toOpen(...t))},(0,s.zw)(n.difficult),3)):(0,i.kq)("",!0),o.isOpen?((0,i.wg)(),(0,i.iD)("div",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.partAnswers,((t,e)=>((0,i.wg)(),(0,i.j4)(c,{key:t.answer,"test-item":{...t,difficult:n.difficult},index:e},null,8,["test-item","index"])))),128))])):(0,i.kq)("",!0)],64)}var o={name:"testDifficultComponent",components:{cardTestComponent:(0,i.RC)((()=>n.e(823).then(n.bind(n,9823))))},props:{difficult:String,partAnswers:Array},data(){return{isOpen:!1}},computed:{mode(){return this.$route.name},isSettingsPage(){return"settings"===this.$route.name}},methods:{toOpen(){this.isSettingsPage&&(this.isOpen=!this.isOpen)}},created(){this.isOpen=!this.isSettingsPage}},u=n(89);const c=(0,u.Z)(o,[["render",a],["__scopeId","data-v-2630c66d"]]);var d=c},2968:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var i=n(3396),s=n(7139);const r={key:1},a={class:"time"},o=(0,i._)("span",null,"Ограничение по времени: ",-1),u=(0,i.Uk)(" : "),c={class:"variants"},d=(0,i._)("span",null,"Количество вариантов ответов: ",-1);function l(t,e,n,l,p,f){const g=(0,i.up)("preloader-component"),m=(0,i.up)("test-difficult-component");return p.isLoading?((0,i.wg)(),(0,i.j4)(g,{key:0})):((0,i.wg)(),(0,i.iD)("div",r,[(0,i._)("div",a,[o,(0,i._)("span",null,(0,s.zw)(t.settings.timer.min),1),u,(0,i._)("span",null,(0,s.zw)(t.settings.timer.sec),1)]),(0,i._)("div",c,[d,(0,i._)("span",null,(0,s.zw)(t.settings.variants),1)]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.orderDifficult,(e=>((0,i.wg)(),(0,i.j4)(m,{key:e,difficult:e,"part-answers":t.settings.dictionary[e]},null,8,["difficult","part-answers"])))),128))]))}var p=n(6623),f=n(5866),g={name:"SettingsView",components:{TestDifficultComponent:f["default"],preloaderComponent:(0,i.RC)((()=>n.e(437).then(n.bind(n,4437))))},data(){return{isLoading:!0}},computed:{...(0,p.rn)("auth",["isAdmin"]),...(0,p.rn)("settings",["settings"]),...(0,p.rn)(["orderDifficult"])},methods:{...(0,p.nv)("settings",["requestSettings"])},async created(){this.isLoading=!await this.requestSettings()}},m=n(89);const w=(0,m.Z)(g,[["render",l]]);var h=w}}]);
//# sourceMappingURL=SettingsView.fb0901a4.js.map