import{_ as v,d as a,a as i,m as o,t as p,b as f,c as _,e as r,o as t,f as C,g as n,h as s,n as T,r as m}from"./main-6fbbc46d.js";import{s as l}from"./settingsStore-e97c3d8a.js";const k={name:"headerComponent",components:{itemAddComponent:a(()=>i(()=>import("./itemAddComponent-eb3a0bb7.js"),["js/itemAddComponent-eb3a0bb7.js","js/main-6fbbc46d.js","css/main-c8ad37bc.css","js/settingsStore-e97c3d8a.js","css/itemAddComponent-7b5484bc.css"])),buttonComponent:a(()=>i(()=>import("./buttonComponent-38c64383.js"),["js/buttonComponent-38c64383.js","js/main-6fbbc46d.js","css/main-c8ad37bc.css","css/buttonComponent-9f4f48d2.css"])),timerComponent:a(()=>i(()=>import("./timerComponent-347ccd32.js"),["js/timerComponent-347ccd32.js","js/main-6fbbc46d.js","css/main-c8ad37bc.css"]))},computed:{...o(p,["isTesting"]),...o(f,["sub"]),...o(_,["mode","isLoading"]),...o(l,["isSaved"])},methods:{...r(l,["saveChanges"]),...r(_,["setLoading"]),...r(p,["getTest","changeTestStatus"]),async startTest(){this.mode!=="test"&&this.$router.replace({name:"test"}),this.setLoading(!0),await this.getTest(this.sub),this.changeTestStatus(!0),this.setLoading(!1)},async save(){this.isSaved||(this.setLoading(!0),await this.saveChanges(this.sub),this.setLoading(!1))}}};function y(e,d,L,S,b,u){const c=m("button-component"),g=m("item-add-component"),h=m("timer-component");return e.mode!=="users"&&e.mode!=="statistic"?(t(),C("header",{key:0,class:T({settings:e.mode==="settings"})},[["test","result"].includes(e.mode)?(t(),n(c,{key:0,value:e.isTesting?"Завершить тест":"Начать тест",onClick:d[0]||(d[0]=E=>e.isTesting?e.changeTestStatus(!1):u.startTest())},null,8,["value"])):s("",!0),e.mode==="settings"?(t(),n(c,{key:1,value:e.isLoading?"Подождите...":"Сохранить",title:"Сохранить изменения",onClick:u.save},null,8,["value","onClick"])):s("",!0),e.mode==="settings"?(t(),n(g,{key:2})):s("",!0),e.isTesting&&e.mode==="test"?(t(),n(h,{key:3})):s("",!0)],2)):s("",!0)}const P=v(k,[["render",y],["__scopeId","data-v-f2339ccf"]]);export{P as default};