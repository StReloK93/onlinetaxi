import{d as g,b as h,m as x,c as s,o as b,e as w,w as e,g as n,h as i,f as t,x as y,j as d,v as k,q as S,y as C}from"./app-a7de8b19.js";const j=t("div",{class:"text-center ma-n3 rounded bg-amber-lighten-4"},[t("img",{src:"/iconos/logo.png",width:"100",class:"d-inline"})],-1),B={class:"d-flex w-100"},M=t("img",{src:"/iconos/uz.png",class:"w-100"},null,-1),N={class:"text-end mt-5"},D=g({__name:"LoginPhonePage",setup(V){const r=h(),_={mask:"## ### ## ##",onMaska:a=>{o.success=a.completed,o.phone=a.unmasked}},o=x({phone:"",success:!1,loading:!1});async function p(){o.loading=!0,await r.sendSecretCode({phone:o.phone}),o.loading=!1}return(a,q)=>{const u=s("v-label"),c=s("v-col"),m=s("v-icon"),l=s("v-text-field"),f=s("v-btn"),v=s("v-form");return b(),w(v,{onSubmit:k(p,["prevent"])},{default:e(()=>[j,n(c,{class:"pa-0 pt-5"},{default:e(()=>[n(u,null,{default:e(()=>[i(" Telefon raqamingizni kiriting ")]),_:1})]),_:1}),t("main",B,[n(c,{cols:"4",class:"px-0 py-2"},{default:e(()=>[n(l,{class:"pr-2 flex-0-0",readonly:"",variant:"filled",density:"compact",value:"+998"},{"prepend-inner":e(()=>[n(m,null,{default:e(()=>[M]),_:1})]),_:1})]),_:1}),n(c,{cols:"8",class:"px-0 py-2"},{default:e(()=>[y(n(l,{variant:"filled",inputmode:"tel",density:"compact",rules:d(S)},null,8,["rules"]),[[d(C),void 0,_]])]),_:1})]),t("div",N,[n(f,{type:"submit",loading:o.loading,disabled:!o.success,variant:"tonal",color:"gray","append-icon":"mdi-arrow-right"},{default:e(()=>[i(" SMS junatish ")]),_:1},8,["loading","disabled"])])]),_:1})}}});export{D as default};