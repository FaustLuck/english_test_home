import{d as C,n as f,_,r as g,H as V,o as l,h as v,b as i,u as o,c as x,w as d,x as D,y as H,K as I,L as h,F as b,i as L}from"./main-ecb08509.js";import{u as n}from"./history-594134c5.js";import{_ as R}from"./_plugin-vue_export-helper-c27b6911.js";const S=C({__name:"Year",props:{sub:null,year:null},setup(a){var y,m;const e=a,k=f(()=>_(()=>import("./Month-1d92beea.js"),["js/Month-1d92beea.js","js/main-ecb08509.js","css/main-a045c51a.css","js/history-594134c5.js","js/_plugin-vue_export-helper-c27b6911.js","css/Month-0e18ab53.css"])),p=f(()=>_(()=>import("./CalendarHeader-fe3a0a26.js"),["js/CalendarHeader-fe3a0a26.js","js/mdi-2c6fa641.js","js/main-ecb08509.js","css/main-a045c51a.css"])),u=g(!1),r=g(!1),Y=(m=(y=n())==null?void 0:y.getUser(e.sub))==null?void 0:m.minYear,E=new Date().getFullYear();V(async()=>{var c,t;r.value=!1,((t=(c=n().history[e.sub])==null?void 0:c[e.year])==null?void 0:t.length)===void 0&&(u.value=!0,await w(),u.value=!1),r.value=n().checkRange(e.sub,+e.year).length===0});async function w(){await n().getHistoryOfYear(e.year,e.sub),r.value=n().checkRange(e.sub,+e.year).length===0}return(c,t)=>(l(),v(b,null,[i(o(p),{year:+a.year,min:o(Y),max:o(E),onIncrement:t[0]||(t[0]=s=>a.year++),onDecrement:t[1]||(t[1]=s=>a.year--)},null,8,["year","min","max"]),r.value?(l(),x(h,{key:0,color:"transparent",class:"d-flex justify-center align-center h-100"},{default:d(()=>[i(I,null,{default:d(()=>[D(" За "+H(a.year)+" год записей не найдено ",1)]),_:1})]),_:1})):(l(),x(h,{key:1,color:"transparent",class:"calendar"},{default:d(()=>[(l(),v(b,null,L(12,s=>i(o(k),{key:`${a.year}_month_${s}`,year:+a.year,loading:u.value,"month-index":s-1,sub:a.sub},null,8,["year","loading","month-index","sub"])),64))]),_:1}))],64))}});const B=R(S,[["__scopeId","data-v-694d11c0"]]);export{B as default};
