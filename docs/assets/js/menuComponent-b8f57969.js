import{_,m,b as r,c as h,o as t,e as s,f as i,w as a,g as c,h as o,r as l,p,i as u}from"./main-16d7450e.js";const g="/english_test_home/img/settings-4dfbde3a.svg",f="/english_test_home/img/history-2da901f2.svg";const k={name:"menuComponent",computed:{...m("auth",["admin","sub","name","picture","tests"])},methods:{...r("auth",["googleInitialize"]),...h(["setMenuHeight"]),setHeight(){if(!window.matchMedia("(max-width: 768px)").matches)return;let e=this.$el.getBoundingClientRect().height;this.setMenuHeight(e)}},async created(){await this.googleInitialize(),window.addEventListener("resize",this.setHeight),this.setHeight()}},d=e=>(p("data-v-6cfc5b5d"),e=e(),u(),e),v={class:"menu"},w=d(()=>o("img",{src:g,alt:"Настройки"},null,-1)),y=d(()=>o("img",{src:f,alt:"История"},null,-1)),b={key:2,id:"google"},C=["title"],I=["src"];function B(e,H,$,M,S,z){const n=l("router-link");return t(),s("nav",v,[e.admin?(t(),i(n,{key:0,title:"Настройки",to:{path:"settings"}},{default:a(()=>[w]),_:1})):c("",!0),e.tests?(t(),i(n,{key:1,title:"История",to:{path:"users"}},{default:a(()=>[y]),_:1})):c("",!0),e.sub?(t(),s("a",{key:3,title:e.name},[o("img",{src:e.picture,alt:"Аватар"},null,8,I)],8,C)):(t(),s("a",b))])}const E=_(k,[["render",B],["__scopeId","data-v-6cfc5b5d"]]);export{E as default};
