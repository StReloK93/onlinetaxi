import{d as h,b as g,p as b,r as n,c as x,w as e,k as w,o as k,f as s,g as l,e as t,C as y,h as r,I as S}from"./app-ffab9f92.js";import{r as C}from"./constants-68fdd4d6.js";const B=t("div",{class:"text-center pb-4"},[t("img",{src:"/iconos/map.svg",width:"100",class:"d-inline"})],-1),M={class:"d-flex w-100"},N=t("img",{src:"/iconos/uz.png"},null,-1),V={class:"text-end mt-5"},T=h({__name:"PhonePage",setup(j){const d=g(),_={mask:"## ### ## ##",onMaska:a=>{o.success=a.completed,o.phone=a.unmasked}},o=b({phone:"",success:!1,loading:!1});async function p(){o.loading=!0,await d.sendSecretCode({phone:o.phone}),o.loading=!1}return(a,z)=>{const u=n("v-label"),c=n("v-col"),m=n("v-icon"),i=n("v-text-field"),f=n("v-btn"),v=n("v-form");return k(),x(v,{onSubmit:w(p,["prevent"])},{default:e(()=>[B,s(c,{class:"py-0"},{default:e(()=>[s(u,{class:"mb-2"},{default:e(()=>[l(" Telefon raqamingizni kiriting ")]),_:1})]),_:1}),t("main",M,[s(c,{cols:"auto",class:"pr-0"},{default:e(()=>[s(i,{class:"pr-2 flex-0-0",readonly:"",variant:"filled",density:"compact",value:"+998"},{"prepend-inner":e(()=>[s(m,null,{default:e(()=>[N]),_:1})]),_:1})]),_:1}),s(c,{cols:"12",class:"pl-0"},{default:e(()=>[y(s(i,{variant:"filled",density:"compact",rules:r(C)},null,8,["rules"]),[[r(S),void 0,_]])]),_:1})]),t("div",V,[s(f,{type:"submit",loading:o.loading,disabled:!o.success,variant:"tonal",color:"gray","append-icon":"mdi-arrow-right"},{default:e(()=>[l(" SMS junatish ")]),_:1},8,["loading","disabled"])])]),_:1},8,["onSubmit"])}}});export{T as default};
