import{d as h,u as g,b as x,f as s,g as b,j as w,w as e,l as t,k as i,i as a,x as y,m as d,v as k,y as S,z as C}from"./app-161b8431.js";const j=a("div",{class:"text-center ma-n3 rounded bg-amber-lighten-4 pt-3 pb-2"},[a("img",{src:"/favicon.ico",width:"100",class:"d-inline"}),a("h3",{class:"tw-text-xl mt-1 tw-font-semibold tw-uppercase"},"Shaharlararo online taxi")],-1),z={class:"d-flex w-100"},B=a("img",{src:"/iconos/uz.png",class:"w-100"},null,-1),M={class:"text-end mt-5"},P=h({__name:"LoginPhonePage",setup(N){const r=g(),_={mask:"## ### ## ##",onMaska:o=>{n.success=o.completed,n.phone=o.unmasked}},n=x({phone:"",success:!1,loading:!1});async function p(){n.loading=!0,await r.sendSecretCode({phone:n.phone}),n.loading=!1}return(o,V)=>{const u=s("v-label"),l=s("v-col"),m=s("v-icon"),c=s("v-text-field"),f=s("v-btn"),v=s("v-form");return b(),w(v,{onSubmit:k(p,["prevent"])},{default:e(()=>[j,t(l,{class:"pa-0 pt-5"},{default:e(()=>[t(u,null,{default:e(()=>[i(" Telefon raqamingizni kiriting ")]),_:1})]),_:1}),a("main",z,[t(l,{cols:"4",class:"px-0 py-2"},{default:e(()=>[t(c,{class:"pr-2 flex-0-0",readonly:"",variant:"filled",density:"compact",value:"+998"},{"prepend-inner":e(()=>[t(m,null,{default:e(()=>[B]),_:1})]),_:1})]),_:1}),t(l,{cols:"8",class:"px-0 py-2"},{default:e(()=>[y(t(c,{variant:"filled",inputmode:"tel",density:"compact",rules:d(S)},null,8,["rules"]),[[d(C),void 0,_]])]),_:1})]),a("div",M,[t(f,{type:"submit",loading:n.loading,disabled:!n.success,variant:"tonal",color:"gray","append-icon":"mdi-arrow-right"},{default:e(()=>[i(" SMS junatish ")]),_:1},8,["loading","disabled"])])]),_:1})}}});export{P as default};
