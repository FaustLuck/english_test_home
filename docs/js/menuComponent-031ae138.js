import{_ as h,m as l,b as i,e as n,c as m,o as t,f as s,g as c,w as _,h as r,i as o,r as p,p as g,j as u}from"./main-c86dc07d.js";const f="/english_test_home/img/settings-4dfbde3a.svg",k="/english_test_home/img/history-2da901f2.svg";const v={name:"menuComponent",computed:{...l(i,["isLogin","name","picture","tests"])},methods:{...n(i,["googleInitialize"]),...n(m,["setMenuHeight"]),setHeight(){if(!window.matchMedia("(max-width: 768px)").matches)return;let e=this.$el.getBoundingClientRect().height;this.setMenuHeight(e)}},async created(){await this.googleInitialize(),window.addEventListener("resize",this.setHeight),this.setHeight()}},d=e=>(g("data-v-95aa1f0a"),e=e(),u(),e),w={class:"menu"},y=d(()=>o("img",{src:f,alt:"Настройки"},null,-1)),C=d(()=>o("img",{src:k,alt:"История"},null,-1)),I={key:2,id:"google"},S=["title"],B=["src"];function H(e,$,L,z,M,b){const a=p("router-link");return t(),s("nav",w,[e.isLogin?(t(),c(a,{key:0,title:"Настройки",to:{path:"settings"}},{default:_(()=>[y]),_:1})):r("",!0),e.tests?(t(),c(a,{key:1,title:"История",to:{path:"users"}},{default:_(()=>[C]),_:1})):r("",!0),e.isLogin?(t(),s("a",{key:3,title:e.name},[o("img",{src:e.picture,alt:"Аватар"},null,8,B)],8,S)):(t(),s("a",I))])}const E=h(v,[["render",H],["__scopeId","data-v-95aa1f0a"]]);export{E as default};
