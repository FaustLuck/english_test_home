"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[908],{2908:function(t,e,a){a.r(e),a.d(e,{default:function(){return y}});var l=a(3396);const n={ref:"canvas"};function o(t,e,a,o,r,i){return(0,l.wg)(),(0,l.iD)("canvas",n,null,512)}var r=a(65),i=a(5184);function s(t){[t.width,t.height]=[window.innerWidth,window.innerHeight];const e=t.getContext("2d"),a=t.width,l=t.height,n=Math.round(Math.min(a,l)/4),o=Math.round(a/2),r=Math.round(l/2),s=t=>t*Math.PI/180,h=(t,e)=>Math.random()*(e-t)+t,c="rgb(255, 231, 188)",f="rgb(153, 54, 0)",u="rgb(107, 38, 0)";let y="rgb(42, 42, 42)",x="rgb(29, 29, 29)";const[d,g]=[n/3,n/10];let p=11*-n/12,m=p-n/5,b=[],M=!1,w=1;const v=.1;let P=1;const S={create(t,e){const a={x:t,y:e};let l={x:0,y:0,r:5};const n=Math.round(h(0,1)),o=1===n?-.1*h(0,50):.1*h(0,50);let r=h(-10,10);const i=`hsl(${h(30,60)},100%,${h(50,100)}%)`;return{color:i,coords:{dx:o,dy:r,...l},translate:a}},draw({translate:t,coords:a,color:l}){return e.save(),e.translate(t.x,t.y),e.rotate(30*Math.PI/180),e.fillStyle=l,e.beginPath(),e.arc(a.x,a.y,a.r,0,2*Math.PI),e.fill(),e.restore(),this.update(a)},update(t){return t.r-=.05,t.x+=t.dx,t.y+=t.dy,t.dy++,t}},k={create(t,e,a){const l={x:10*Math.min(t.x,e.x,a.x)/n,y:10*Math.min(t.y,e.y,a.y)/n},o={x:0,y:0};return{a:t,b:e,c:a,delta:l,translate:o}},update({delta:t,translate:e}){return e.x+=t.x,e.y+=t.y,e},draw({a:t,b:a,c:l,translate:n,delta:o}){return e.save(),e.translate(n.x,n.y),e.fillStyle="transparent",e.strokeStyle="black",e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(a.x,a.y),e.lineTo(l.x,l.y),e.clip(),C(),e.restore(),this.update({delta:o,translate:n})}};let I=[],A=1,$=[],T=1,z=0;function C(){const t=n/4,a=Math.acos(t/(2*n));e.save(),e.beginPath(),e.fillStyle=x,e.arc(0,0,n,0,2*Math.PI),e.fill(),e.globalCompositeOperation="source-atop",e.beginPath(),e.arc(0,0,n,-a,a),e.arc(t,0,n,Math.PI-a,Math.PI+a),e.fillStyle=y,e.fill(),e.restore()}function _(){function t(t){const a=s(120);e.beginPath(),e.ellipse(0,m,d,g,0,a*!t,a*t||Math.PI),e.ellipse(0,p,d,g,0,a*t||Math.PI,a*!t,!0),e.ellipse(0,m,d,g,0,a*!t,a*!t),e.stroke(),e.fill()}function a(t){const a=s(160);e.beginPath(),e.ellipse(0,m,d,g,0,a,2*(a-Math.PI),!!t),e.stroke(),e.fill()}for(let l=0;l<2;l++)e.fillStyle=l?y:x,e.strokeStyle=l?y:x,a(l),t(l)}function Z(t=0,a=1,l){const o=s(120),r={x:0,y:m},i={x:-d/2,y:m-n/4},h={x:d/3,y:m-n/2},c={x:-d/6,y:m-3*n/4},[y,x]=[d/6,g/6];let p,b;function M(t){const a=(1-t)**3,n=3*t*(1-t)**2,s=3*t**2*(1-t),d=t**3;p=a*r.x+n*i.x+s*h.x+d*c.x,b=a*r.y+n*i.y+s*h.y+d*c.y,e.beginPath(),e.strokeStyle=l||u,e.ellipse(p,b,y,x,0,o,Math.PI),e.stroke(),e.beginPath(),e.strokeStyle=l||f,e.ellipse(p,b,y,x,0,0,o),e.stroke()}function w(){e.beginPath(),e.fillStyle=l||u,e.ellipse(p,b,y,x,0,0,2*Math.PI),e.fill()}for(let e=t;e<=a;e+=.001)M(e);if(w(),l)return[p,b]}function O(){M=!0,C(),_(),Z(0,w);const t=Math.max(w,0),e=Math.min(1,w+v);let[a,l]=Z(t,e,c);a&&l&&b.push(S.create(a,l)),b=b.filter((t=>(t.coords=S.draw(t),t.coords.r>0))),w-=v/10}function R(){I=I.filter((t=>(t.translate=k.draw(t),Math.abs(t.translate.x)<a&&Math.abs(t.translate.y)<l))),m-=10,p-=10,_(),P-=.01,y=`rgba(42, 42, 42, ${P})`,x=`rgba(29, 29, 29, ${P})`}function q(){A-=.02;for(let t=0;t<$.length;t++){const{r:n,g:o,b:r,o:i}=$[t].color;e.fillStyle=`rgba(${n},${o},${r},${i}`;const s=$[t].pos;e.beginPath(),s.forEach((({x:t,y:a})=>{e.lineTo(t,a)})),e.fill(),$[t].pos=s.map(l),$[t].color=a($[t].color)}function a({r:t,g:e,b:a,o:l}){return{r:t,g:e-1,b:a-.5,o:l-.02}}function l({x:t,y:e}){const a=t/15,l=e/15;return{x:t+a,y:e+l}}$=$.filter((e=>e.pos.every((e=>Math.abs(e.x)<10*t.width&&Math.abs(e.y)<10*t.height))))}function E(){const t="TEST OVER";e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgba(255, 255, 255, 1)",e.save();for(let a=.02;a<.1;a+=.02)e.font=16*(z-a)+"rem Khula sans-serif",e.fillText(t,o,r);e.restore(),e.font=16*z+"rem Khula sans-serif",e.fillText(t,o,r),e.font=16*z+"rem Khula sans-serif",e.strokeStyle="rgba(0, 0, 0, 1)",e.strokeText(t,o,r),z+=.01,T=e.measureText(t).width}function F(){T<1.5*o?(requestAnimationFrame(F),e.fillStyle="#000",e.fillRect(-t.width,-t.height,2*t.width,2*t.height)):setTimeout((()=>i.Z.commit("setAnimationStatus",!1)),3e3),!b.length&&M||O(),!b.length&&P>=0&&R(),P<.5&&A>0&&q(),A<0&&1===T&&(e.rotate(s(30)),e.translate(-o,-r)),A<0&&E()}function K(){const[t,e]=B(n),a=[];for(let l=0;l<e.length;l+=3){const n=k.create(t[e[l]],t[e[l+1]],t[e[l+2]]);a.push(n)}return a}function H(t){const e=100;let a=1,l=[],n=0;for(let o=0;o<t;o++){const t=h(0,2*Math.PI);l.push(t)}return l.sort(),function(){const t=e*Math.cos(l[n])*(1-a/4),o=e*Math.sin(l[n])*(1-a/4);return a*=-1,n++,{x:t,y:o}}}function W(){$[$.length-1]?.flag&&($[$.length-1].flag=!1);let t={r:255,g:236,b:73,o:A};const e=Math.round(h(50,75)),a=H(e);let l=[];for(let n=0;n<e;n++)l.push(a());$.push({flag:!0,pos:l,color:t})}function B(t){const e=1e-7,a=[],l=Math.floor(t/4);for(let h=0;h<l;h++)a.push(n(t));function n(t){const e=Math.random()*(3*t)-1.5*t,a=Math.random()*(3*t)-1.5*t;return{x:e,y:a}}function o(t){let a=t.length;if(a<3)return[];t=t.slice(0);let l=[];for(let e=0;e<a;e++)l.push(e);l.sort(((e,a)=>t[e].x-t[a].x));let n=i(t);t.push(n.p1,n.p2,n.p3);let o=[r(t,a,a+1,a+2)],h=[],c=[];for(let i=l.length-1;i>=0;i--){for(let a=o.length-1;a>=0;a--){let n=t[l[i]].x-o[a].x;if(n>0&&n*n>o[a].r){h.push(o[a]),o.splice(a,1);continue}let r=t[l[i]].y-o[a].y;n*n+r*r-o[a].r>e||(c.push(o[a].a,o[a].b,o[a].b,o[a].c,o[a].c,o[a].a),o.splice(a,1))}s(c);for(let e=c.length-1;e>=0;){let a=c[e];if(e--,e<0)break;let n=c[e];e--,o.push(r(t,n,a,l[i]))}c=[]}for(let e=o.length-1;e>=0;e--)h.push(o[e]);let f=[];for(let e=0;e<h.length;e++)h[e].a<a&&h[e].b<a&&h[e].c<a&&f.push(h[e].a,h[e].b,h[e].c);return f}function r(t,a,l,n){let o,r,i=t[a].x,s=t[a].y,h=t[l].x,c=t[l].y,f=t[n].x,u=t[n].y,y=Math.abs(s-c),x=Math.abs(c-u);if(y<e){let t=-(f-h)/(u-c),e=(h+f)/2,a=(c+u)/2;o=(i+h)/2,r=t*(o-e)+a}else if(x<e){let t=-(h-i)/(c-s),e=(i+h)/2,a=(s+c)/2;o=(h+f)/2,r=t*(o-e)+a}else{let t=-(h-i)/(c-s),e=-(f-h)/(u-c),a=(i+h)/2,l=(s+c)/2,n=(h+f)/2,d=(c+u)/2;o=(t*a-e*n+d-l)/(t-e),r=y>x?t*(o-a)+l:e*(o-n)+d}let d=h-o,g=c-r;return{a:a,b:l,c:n,x:o,y:r,r:d*d+g*g}}function i(t){let e=1e6,a=-1e6,l=1e6,n=-1e6;for(let y=0;y<t.length;y++)e=Math.min(e,t[y].x),l=Math.min(l,t[y].y),a=Math.max(a,t[y].x),n=Math.max(n,t[y].y);let o=a-e,r=n-l,i=Math.max(o,r),s=.5*o+e,h=.5*r+l;const c={x:s-10*i,y:h-10*i},f={x:s,y:h+10*i},u={x:s+10*i,y:h-10*i};return{p1:c,p2:f,p3:u}}function s(t){for(let e=t.length-1;e>=0;){let a=t[e];e--;let l,n,o=t[e];e--;for(let r=e;r>=0;){if(l=t[r],r--,n=t[r],r--,o===n&&a===l){t.splice(e+1,2),t.splice(r+1,2);break}if(o===l&&a===n){t.splice(e+1,2),t.splice(r+1,2);break}}}}return[a,o(a)]}e.translate(o,r),e.rotate(s(-30)),I=K(n),W(),F(),i.Z.commit("setAnimationStatus",!0)}function h(t){let e;t.width=window.innerWidth,t.height=window.innerHeight;const a=t.getContext("2d");a.fillStyle="#000",a.fillRect(0,0,t.width,t.height);let l=[],n=[],o=20,r={x:t.width/2,y:t.height/2},s=400;for(let i=0;i<o;i++){let e={x:Math.random()*s/2-s/4+r.x,y:Math.random()*s*2+t.height,size:Math.random()+.5,fill:"#fd1",vx:Math.random()-.5,vy:-(Math.random()+4),ax:.02*Math.random()-.01,far:Math.random()*s+(r.y-s)};e.base={x:e.x,y:e.y,vx:e.vx},l.push(e)}function h(){let t=Math.floor(256*Math.random()),e=Math.floor(256*Math.random()),a=Math.floor(256*Math.random());return`rgb(${t},${e},${a}`}function c(t){e||(e=t);let a=t-e;a>5e3&&f(),u(),y(),requestAnimationFrame(c)}function f(){let{opacity:e}=getComputedStyle(t);e<=0&&i.Z.commit("setAnimationStatus",!1),e-=.01,t.style.opacity=e}function u(){for(let t=0;t<l.length;t++){let e=l[t];if(e.y<=e.far){let t=h();for(let a=0;a<5*o;a++){let a={x:e.x,y:e.y,size:Math.random()+1.5,fill:t,vx:5*Math.random()-2.5,vy:-5*Math.random()+1.5,ay:.05,alpha:1,life:Math.round(Math.random()*s/2)+s/2};a.base={life:a.life,size:a.size},n.push(a)}e.y=e.base.y,e.x=e.base.x,e.vx=e.base.vx,e.ax=.02*Math.random()-.01}e.x+=e.vx,e.y+=e.vy,e.vx+=e.ax}for(let t=n.length-1;t>=0;t--){let e=n[t];e&&(e.x+=e.vx,e.y+=e.vy,e.vy+=e.ay,e.alpha=e.life/e.base.life,e.size=e.alpha*e.base.size,e.alpha=e.alpha>.6?1:e.alpha,e.life--,e.life<=0&&n.splice(t,1))}}function y(){a.globalCompositeOperation="source-over",a.globalAlpha=.18,a.fillStyle="#000",a.fillRect(0,0,t.width,t.height),a.globalCompositeOperation="screen",a.globalAlpha=1;for(let t=0;t<l.length;t++){let e=l[t];a.beginPath(),a.arc(e.x,e.y,e.size,0,2*Math.PI),a.closePath(),a.fillStyle=e.fill,a.fill()}for(let t=0;t<n.length;t++){let e=n[t];a.globalAlpha=e.alpha,a.beginPath(),a.arc(e.x,e.y,e.size,0,2*Math.PI),a.closePath(),a.fillStyle=e.fill,a.fill()}}requestAnimationFrame(c),i.Z.commit("setAnimationStatus",!0)}var c={name:"AnimationShow",computed:{...(0,r.rn)(["mode","isAnimate"])},watch:{isAnimate(t){t||this.$router.replace({name:"test"})}},async mounted(){switch(this.mode){case"fire-show":await h(this.$refs.canvas);break;case"fail-show":s(this.$refs.canvas);break}}},f=a(89);const u=(0,f.Z)(c,[["render",o],["__scopeId","data-v-8cd70764"]]);var y=u}}]);