import{_ as i,m as s,c as a,b as o,o as u,e as r}from"./main-73d6e790.js";const c={name:"startButtonComponent",data(){return{}},computed:{...s("test",["isTesting"]),...s(["mode"]),title(){return this.isTesting?"Завершить тест":"Начать тест"}},methods:{...a("test",["changeTestStatus"]),...a(["setLoading"]),...o("test",["getTest"]),async changeStatus(){this.isTesting?(this.changeTestStatus(!1),this.setLoading(!0),this.$router.push({name:"result"})):(this.mode!=="test"&&this.$router.replace({name:"test"}),this.setLoading(!0),await this.getTest({sub:""}),this.changeTestStatus(!0),this.setLoading(!1))}}},h=["value"];function m(l,e,g,p,d,t){return u(),r("input",{type:"button",value:t.title,onClick:e[0]||(e[0]=(...n)=>t.changeStatus&&t.changeStatus(...n))},null,8,h)}const _=i(c,[["render",m]]);export{_ as default};
