import{_ as h,m as s,c as i,b as a,o as u,e as r}from"./main-2a3cd1b3.js";const d={name:"startButtonComponent",computed:{...s("test",["isTesting"]),...s("auth",["sub"]),...s(["mode","isLoading"]),title(){return this.testMode?this.isTesting?"Завершить тест":"Начать тест":this.isLoading?"Подождите...":"Сохранить"},testMode(){return this.mode==="test"||this.mode==="result"},settingMode(){return this.mode==="settings"}},methods:{...i("test",["changeTestStatus"]),...i(["setLoading"]),...a("test",["getTest"]),...a("settings",["saveChanges"]),checkClick(){this.testMode&&this.changeStatus(),this.settingMode&&this.save()},async changeStatus(){this.isTesting?(this.changeTestStatus(!1),this.setLoading(!0),this.$router.push({name:"result"})):(this.mode!=="test"&&this.$router.replace({name:"test"}),this.setLoading(!0),await this.getTest({sub:this.sub}),this.changeTestStatus(!0),this.setLoading(!1))},async save(){this.setLoading(!0),await this.saveChanges(this.sub),this.setLoading(!1)}}},c=["value","disabled"];function g(n,e,l,m,p,t){return u(),r("input",{type:"button",value:t.title,disabled:n.isLoading,onClick:e[0]||(e[0]=(...o)=>t.checkClick&&t.checkClick(...o))},null,8,c)}const b=h(d,[["render",g]]);export{b as default};
