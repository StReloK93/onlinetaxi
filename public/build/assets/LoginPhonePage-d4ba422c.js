import{d as g,b as h,m as x,r as t,o as w,c as b,w as e,f as n,g as i,e as s,x as y,h as d,v as k,q as S,y as C}from"./app-9d059da3.js";const B=s("div",{class:"text-center py-4 mb-2 -tw-m-3 tw-rounded tw-bg-yellow-200/40"},[s("img",{src:"/iconos/logo.png",width:"100",class:"d-inline"})],-1),M={class:"d-flex w-100"},N=s("img",{src:"/iconos/uz.png"},null,-1),V={class:"text-end mt-5"},D=g({__name:"LoginPhonePage",setup(j){const r=h(),_={mask:"## ### ## ##",onMaska:a=>{o.success=a.completed,o.phone=a.unmasked}},o=x({phone:"",success:!1,loading:!1});async function p(){o.loading=!0,await r.sendSecretCode({phone:o.phone}),o.loading=!1}return(a,q)=>{const u=t("v-label"),c=t("v-col"),m=t("v-icon"),l=t("v-text-field"),f=t("v-btn"),v=t("v-form");return w(),b(v,{onSubmit:k(p,["prevent"])},{default:e(()=>[B,n(c,{class:"pa-0"},{default:e(()=>[n(u,null,{default:e(()=>[i(" Telefon raqamingizni kiriting ")]),_:1})]),_:1}),s("main",M,[n(c,{cols:"4",class:"px-0 py-2"},{default:e(()=>[n(l,{class:"pr-2 flex-0-0",readonly:"",variant:"filled",density:"compact",value:"+998"},{"prepend-inner":e(()=>[n(m,null,{default:e(()=>[N]),_:1})]),_:1})]),_:1}),n(c,{cols:"8",class:"px-0 py-2"},{default:e(()=>[y(n(l,{variant:"filled",inputmode:"tel",density:"compact",rules:d(S)},null,8,["rules"]),[[d(C),void 0,_]])]),_:1})]),s("div",V,[n(f,{type:"submit",loading:o.loading,disabled:!o.success,variant:"tonal",color:"gray","append-icon":"mdi-arrow-right"},{default:e(()=>[i(" SMS junatish ")]),_:1},8,["loading","disabled"])])]),_:1})}}});export{D as default};
