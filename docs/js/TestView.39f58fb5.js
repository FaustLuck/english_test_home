"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[42],{4777:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var n=s(3396);const i={key:1},r={key:0};function a(e,t,s,a,o,u){const h=(0,n.up)("preloader-component"),c=(0,n.up)("header-component"),d=(0,n.up)("card-test-component");return o.isLoading?((0,n.wg)(),(0,n.j4)(h,{key:0})):((0,n.wg)(),(0,n.iD)("div",i,[(0,n.Wm)(c),e.isTesting?((0,n.wg)(),(0,n.iD)("div",r,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.test,((e,t)=>((0,n.wg)(),(0,n.j4)(d,{key:e.question+t,"test-item":e,index:t},null,8,["test-item","index"])))),128))])):(0,n.kq)("",!0)]))}var o=s(6623),u=s(8661),h={name:"TestView",components:{HeaderComponent:(0,n.RC)((()=>s.e(380).then(s.bind(s,2380)))),PreloaderComponent:(0,n.RC)((()=>s.e(437).then(s.bind(s,4437)))),CardTestComponent:(0,n.RC)((()=>s.e(362).then(s.bind(s,362))))},data(){return{test:[],isLoading:!0}},computed:{...(0,o.rn)("settings",["settings"]),...(0,o.rn)("test",["answers","isTesting"]),...(0,o.rn)(["orderDifficult"])},watch:{settings(e){Object.keys(e).length&&(this.isLoading=!1)},answers(e){Object.keys(e).length&&this.createTest()},isTesting(e){return e?this.prepareAnswers(this.settings):this.$router.push({name:"result"})}},methods:{...(0,o.OI)("test",["prepareAnswers"]),...(0,o.nv)("settings",["requestSettings"]),createTest(){this.test=[];for(let e of this.orderDifficult)this.answers[e].forEach((t=>this.test.push(this.createTestItem(t,e))))},toFillVariants(e,t,s){let n=(0,u.EF)(t.filter((t=>t!==e)),s-1);return n.push(e),n.sort(),n},createTestItem(e,t){let{dictionary:s,variants:n}=this.settings;return s=s[t].map((e=>e.answer)),{answer:this.toFillVariants(e.answer,s,n),difficult:t,question:e.question}}},async created(){await this.requestSettings()},beforeRouteEnter(e,t,s){"result"===t.name?s((e=>{e.prepareAnswers(e.settings)})):s()}},c=s(89);const d=(0,c.Z)(h,[["render",a]]);var l=d}}]);
//# sourceMappingURL=TestView.39f58fb5.js.map