"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[170],{5846:function(e,t,s){s.r(t),s.d(t,{default:function(){return m}});var i=s(3396),n=s(9242);const a={key:1,class:"users"},r={class:"users__container"};function c(e,t,s,c,u,o){const d=(0,i.up)("preloader-component"),h=(0,i.up)("user-card-component");return u.isLoading?((0,i.wg)(),(0,i.j4)(d,{key:0})):((0,i.wg)(),(0,i.iD)("section",a,[(0,i.wy)((0,i._)("div",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.statistic,((e,t)=>((0,i.wg)(),(0,i.j4)(h,{key:e.info.displayName,user:e,uid:t,onChangeActiveUser:o.changeActiveUser},null,8,["user","uid","onChangeActiveUser"])))),128))],512),[[n.F8,!u.activeUserUID]])]))}var u=s(6623),o={name:"StatisticView",components:{UserCardComponent:(0,i.RC)((()=>s.e(332).then(s.bind(s,4332)))),PreloaderComponent:(0,i.RC)((()=>s.e(437).then(s.bind(s,4437))))},data(){return{isLoading:!0,activeUserUID:"",activeDate:""}},computed:{...(0,u.rn)("auth",["isAdmin","uid"]),...(0,u.rn)("statistic",["statistic","dateList"])},watch:{statistic(e){Object.keys(e).length&&(this.isLoading=!1)}},methods:{...(0,u.nv)("statistic",["requestStatistic"]),...(0,u.nv)("settings",["requestTimer"]),changeActiveUser(e){this.activeUserUID=e,this.$router.push({name:"statistic-user",params:{uid:e}})}},created(){this.requestStatistic({uid:this.uid,isAdmin:this.isAdmin}),this.requestTimer()}},d=s(89);const h=(0,d.Z)(o,[["render",c],["__scopeId","data-v-52cc7a3c"]]);var m=h}}]);
//# sourceMappingURL=StatisticView.7303d882.js.map