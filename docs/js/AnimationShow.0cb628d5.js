"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[465],{5612:function(t,e,l){l.r(e),l.d(e,{default:function(){return u}});var a=l(3396);const n={ref:"canvas"};function r(t,e,l,r,o,i){return(0,a.wg)(),(0,a.iD)("canvas",n,null,512)}var o=l(6623);function i(t){[t.width,t.height]=[window.innerWidth,window.innerHeight];const e=t.getContext("2d"),l=t.width,a=t.height,n=Math.round(Math.min(l,a)/4),r=Math.round(l/2),o=Math.round(a/2),i=t=>t*Math.PI/180,s=(t,e)=>Math.random()*(e-t)+t,h="rgb(255, 231, 188)",f="rgb(153, 54, 0)",c="rgb(107, 38, 0)";let u="rgb(42, 42, 42)",y="rgb(29, 29, 29)";const[x,d]=[n/3,n/10];let g=11*-n/12,p=g-n/5,b=[],M=!1,m=1;const v=.1;let w=1;const P={create(t,e){const l={x:t,y:e};let a={x:0,y:0,r:5};const n=Math.round(s(0,1)),r=1===n?-.1*s(0,50):.1*s(0,50);let o=s(-10,10);const i=`hsl(${s(30,60)},100%,${s(50,100)}%)`;return{color:i,coords:{dx:r,dy:o,...a},translate:l}},draw({translate:t,coords:l,color:a}){return e.save(),e.translate(t.x,t.y),e.rotate(30*Math.PI/180),e.fillStyle=a,e.beginPath(),e.arc(l.x,l.y,l.r,0,2*Math.PI),e.fill(),e.restore(),this.update(l)},update(t){return t.r-=.05,t.x+=t.dx,t.y+=t.dy,t.dy++,t}},k={create(t,e,l){const a={x:10*Math.min(t.x,e.x,l.x)/n,y:10*Math.min(t.y,e.y,l.y)/n},r={x:0,y:0};return{a:t,b:e,c:l,delta:a,translate:r}},update({delta:t,translate:e}){return e.x+=t.x,e.y+=t.y,e},draw({a:t,b:l,c:a,translate:n,delta:r}){return e.save(),e.translate(n.x,n.y),e.fillStyle="transparent",e.strokeStyle="black",e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(l.x,l.y),e.lineTo(a.x,a.y),e.clip(),A(),e.restore(),this.update({delta:r,translate:n})}};let S=[],I=1,$=[],T=1,z=0;function A(){const t=n/4,l=Math.acos(t/(2*n));e.save(),e.beginPath(),e.fillStyle=y,e.arc(0,0,n,0,2*Math.PI),e.fill(),e.globalCompositeOperation="source-atop",e.beginPath(),e.arc(0,0,n,-l,l),e.arc(t,0,n,Math.PI-l,Math.PI+l),e.fillStyle=u,e.fill(),e.restore()}function C(){function t(t){const l=i(120);e.beginPath(),e.ellipse(0,p,x,d,0,l*!t,l*t||Math.PI),e.ellipse(0,g,x,d,0,l*t||Math.PI,l*!t,!0),e.ellipse(0,p,x,d,0,l*!t,l*!t),e.stroke(),e.fill()}function l(t){const l=i(160);e.beginPath(),e.ellipse(0,p,x,d,0,l,2*(l-Math.PI),!!t),e.stroke(),e.fill()}for(let a=0;a<2;a++)e.fillStyle=a?u:y,e.strokeStyle=a?u:y,l(a),t(a)}function _(t=0,l=1,a){const r=i(120),o={x:0,y:p},s={x:-x/2,y:p-n/4},h={x:x/3,y:p-n/2},u={x:-x/6,y:p-3*n/4},[y,g]=[x/6,d/6];let b,M;function m(t){const l=(1-t)**3,n=3*t*(1-t)**2,i=3*t**2*(1-t),x=t**3;b=l*o.x+n*s.x+i*h.x+x*u.x,M=l*o.y+n*s.y+i*h.y+x*u.y,e.beginPath(),e.strokeStyle=a||c,e.ellipse(b,M,y,g,0,r,Math.PI),e.stroke(),e.beginPath(),e.strokeStyle=a||f,e.ellipse(b,M,y,g,0,0,r),e.stroke()}function v(){e.beginPath(),e.fillStyle=a||c,e.ellipse(b,M,y,g,0,0,2*Math.PI),e.fill()}for(let e=t;e<=l;e+=.001)m(e);if(v(),a)return[b,M]}function O(){M=!0,A(),C(),_(0,m);const t=Math.max(m,0),e=Math.min(1,m+v);let[l,a]=_(t,e,h);l&&a&&b.push(P.create(l,a)),b=b.filter((t=>(t.coords=P.draw(t),t.coords.r>0))),m-=v/10}function R(){S=S.filter((t=>(t.translate=k.draw(t),Math.abs(t.translate.x)<l&&Math.abs(t.translate.y)<a))),p-=10,g-=10,C(),w-=.01,u=`rgba(42, 42, 42, ${w})`,y=`rgba(29, 29, 29, ${w})`}function E(){I-=.02;for(let t=0;t<$.length;t++){const{r:n,g:r,b:o,o:i}=$[t].color;e.fillStyle=`rgba(${n},${r},${o},${i}`;const s=$[t].pos;e.beginPath(),s.forEach((({x:t,y:l})=>{e.lineTo(t,l)})),e.fill(),$[t].pos=s.map(a),$[t].color=l($[t].color)}function l({r:t,g:e,b:l,o:a}){return{r:t,g:e-1,b:l-.5,o:a-.02}}function a({x:t,y:e}){const l=t/15,a=e/15;return{x:t+l,y:e+a}}$=$.filter((e=>e.pos.every((e=>Math.abs(e.x)<10*t.width&&Math.abs(e.y)<10*t.height))))}function K(){const t="TEST OVER";e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgba(255, 255, 255, 1)",e.save();for(let l=.02;l<.1;l+=.02)e.font=16*(z-l)+"rem Khula sans-serif",e.fillText(t,r,o);e.restore(),e.font=16*z+"rem Khula sans-serif",e.fillText(t,r,o),e.font=16*z+"rem Khula sans-serif",e.strokeStyle="rgba(0, 0, 0, 1)",e.strokeText(t,r,o),z+=.01,T=e.measureText(t).width}function q(){T<1.5*r?(requestAnimationFrame(q),e.fillStyle="#000",e.fillRect(-t.width,-t.height,2*t.width,2*t.height)):setTimeout((()=>console.log("redirect")),3e3),!b.length&&M||O(),!b.length&&w>=0&&R(),w<.5&&I>0&&E(),I<0&&1===T&&(e.rotate(i(30)),e.translate(-r,-o)),I<0&&K()}function F(){const[t,e]=B(n),l=[];for(let a=0;a<e.length;a+=3){const n=k.create(t[e[a]],t[e[a+1]],t[e[a+2]]);l.push(n)}return l}function H(t){const e=100;let l=1,a=[],n=0;for(let r=0;r<t;r++){const t=s(0,2*Math.PI);a.push(t)}return a.sort(),function(){const t=e*Math.cos(a[n])*(1-l/4),r=e*Math.sin(a[n])*(1-l/4);return l*=-1,n++,{x:t,y:r}}}function W(){$[$.length-1]?.flag&&($[$.length-1].flag=!1);let t={r:255,g:236,b:73,o:I};const e=Math.round(s(50,75)),l=H(e);let a=[];for(let n=0;n<e;n++)a.push(l());$.push({flag:!0,pos:a,color:t})}function B(t){const e=1e-7,l=[],a=Math.floor(t/4);for(let h=0;h<a;h++)l.push(n(t));function n(t){const e=Math.random()*(3*t)-1.5*t,l=Math.random()*(3*t)-1.5*t;return{x:e,y:l}}function r(t){let l=t.length;if(l<3)return[];t=t.slice(0);let a=[];for(let e=0;e<l;e++)a.push(e);a.sort(((e,l)=>t[e].x-t[l].x));let n=i(t);t.push(n.p1,n.p2,n.p3);let r=[o(t,l,l+1,l+2)],h=[],f=[];for(let i=a.length-1;i>=0;i--){for(let l=r.length-1;l>=0;l--){let n=t[a[i]].x-r[l].x;if(n>0&&n*n>r[l].r){h.push(r[l]),r.splice(l,1);continue}let o=t[a[i]].y-r[l].y;n*n+o*o-r[l].r>e||(f.push(r[l].a,r[l].b,r[l].b,r[l].c,r[l].c,r[l].a),r.splice(l,1))}s(f);for(let e=f.length-1;e>=0;){let l=f[e];if(e--,e<0)break;let n=f[e];e--,r.push(o(t,n,l,a[i]))}f=[]}for(let e=r.length-1;e>=0;e--)h.push(r[e]);let c=[];for(let e=0;e<h.length;e++)h[e].a<l&&h[e].b<l&&h[e].c<l&&c.push(h[e].a,h[e].b,h[e].c);return c}function o(t,l,a,n){let r,o,i=t[l].x,s=t[l].y,h=t[a].x,f=t[a].y,c=t[n].x,u=t[n].y,y=Math.abs(s-f),x=Math.abs(f-u);if(y<e){let t=-(c-h)/(u-f),e=(h+c)/2,l=(f+u)/2;r=(i+h)/2,o=t*(r-e)+l}else if(x<e){let t=-(h-i)/(f-s),e=(i+h)/2,l=(s+f)/2;r=(h+c)/2,o=t*(r-e)+l}else{let t=-(h-i)/(f-s),e=-(c-h)/(u-f),l=(i+h)/2,a=(s+f)/2,n=(h+c)/2,d=(f+u)/2;r=(t*l-e*n+d-a)/(t-e),o=y>x?t*(r-l)+a:e*(r-n)+d}let d=h-r,g=f-o;return{a:l,b:a,c:n,x:r,y:o,r:d*d+g*g}}function i(t){let e=1e6,l=-1e6,a=1e6,n=-1e6;for(let y=0;y<t.length;y++)e=Math.min(e,t[y].x),a=Math.min(a,t[y].y),l=Math.max(l,t[y].x),n=Math.max(n,t[y].y);let r=l-e,o=n-a,i=Math.max(r,o),s=.5*r+e,h=.5*o+a;const f={x:s-10*i,y:h-10*i},c={x:s,y:h+10*i},u={x:s+10*i,y:h-10*i};return{p1:f,p2:c,p3:u}}function s(t){for(let e=t.length-1;e>=0;){let l=t[e];e--;let a,n,r=t[e];e--;for(let o=e;o>=0;){if(a=t[o],o--,n=t[o],o--,r===n&&l===a){t.splice(e+1,2),t.splice(o+1,2);break}if(r===a&&l===n){t.splice(e+1,2),t.splice(o+1,2);break}}}}return[l,r(l)]}e.translate(r,o),e.rotate(i(-30)),S=F(n),W(),q()}function s(t){t.width=window.innerWidth,t.height=window.innerHeight;const e=t.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,t.width,t.height);let l=[],a=[],n=20,r={x:t.width/2,y:t.height/2},o=400;for(let f=0;f<n;f++){let e={x:Math.random()*o/2-o/4+r.x,y:Math.random()*o*2+t.height,size:Math.random()+.5,fill:"#fd1",vx:Math.random()-.5,vy:-(Math.random()+4),ax:.02*Math.random()-.01,far:Math.random()*o+(r.y-o)};e.base={x:e.x,y:e.y,vx:e.vx},l.push(e)}function i(){let t=Math.floor(256*Math.random()),e=Math.floor(256*Math.random()),l=Math.floor(256*Math.random());return`rgb(${t},${e},${l}`}function s(){for(let t=0;t<l.length;t++){let e=l[t];if(e.y<=e.far){let t=i();for(let l=0;l<5*n;l++){let l={x:e.x,y:e.y,size:Math.random()+1.5,fill:t,vx:5*Math.random()-2.5,vy:-5*Math.random()+1.5,ay:.05,alpha:1,life:Math.round(Math.random()*o/2)+o/2};l.base={life:l.life,size:l.size},a.push(l)}e.y=e.base.y,e.x=e.base.x,e.vx=e.base.vx,e.ax=.02*Math.random()-.01}e.x+=e.vx,e.y+=e.vy,e.vx+=e.ax}for(let t=a.length-1;t>=0;t--){let e=a[t];e&&(e.x+=e.vx,e.y+=e.vy,e.vy+=e.ay,e.alpha=e.life/e.base.life,e.size=e.alpha*e.base.size,e.alpha=e.alpha>.6?1:e.alpha,e.life--,e.life<=0&&a.splice(t,1))}}function h(){e.globalCompositeOperation="source-over",e.globalAlpha=.18,e.fillStyle="#000",e.fillRect(0,0,t.width,t.height),e.globalCompositeOperation="screen",e.globalAlpha=1;for(let t=0;t<l.length;t++){let a=l[t];e.beginPath(),e.arc(a.x,a.y,a.size,0,2*Math.PI),e.closePath(),e.fillStyle=a.fill,e.fill()}for(let t=0;t<a.length;t++){let l=a[t];e.globalAlpha=l.alpha,e.beginPath(),e.arc(l.x,l.y,l.size,0,2*Math.PI),e.closePath(),e.fillStyle=l.fill,e.fill()}}(function t(){requestAnimationFrame(t),s(),h()})()}var h={name:"AnimationShow",computed:{...(0,o.rn)("test",["answers"]),mode(){return this.$route.name}},mounted(){switch(this.mode){case"fire-show":s(this.$refs.canvas);break;case"fail-show":i(this.$refs.canvas);break}}},f=l(89);const c=(0,f.Z)(h,[["render",r],["__scopeId","data-v-783cde60"]]);var u=c}}]);
//# sourceMappingURL=AnimationShow.0cb628d5.js.map