import{d as f,s as h,q as v,f as t,g as s,j as c,w as e,l,i as o,m as g,k as r}from"./app-c2e8e8b9.js";const b=o("div",{class:"text-center py-4 mb-2 ma-n3 rounded bg-amber-lighten-4"},[o("img",{src:"/favicon.ico",width:"100",class:"d-inline"}),o("h3",{class:"text-h6 mt-2 font-weight-medium text-uppercase"},"Shaharlararo online taxi")],-1),k={class:"pa-2 pt-8"},C=f({__name:"InstallAppPage",setup(x){const a=h("deferredPrompt"),p=v();function d(){a&&(a.value.prompt(),a.value.userChoice.then(i=>{i.outcome==="accepted"?p.push({name:"login"}):console.log("user dismissed A2HS prompt"),a.value=null}))}return(i,w)=>{const n=t("v-btn"),m=t("v-card"),_=t("v-container"),u=t("v-app");return s(),c(u,{class:"login-page"},{default:e(()=>[l(_,{class:"d-flex h-100 justify-center align-center px-2"},{default:e(()=>[l(m,{width:"360",class:"pa-3 bg-white"},{default:e(()=>[b,o("div",k,[g(a)?(s(),c(n,{key:0,onClick:d,block:"","append-icon":"mdi-download",color:"black",variant:"tonal"},{default:e(()=>[r(" Ilovani o'rnatish ")]),_:1})):(s(),c(n,{key:1,block:"","append-icon":"mdi-check",color:"black",variant:"tonal",disabled:""},{default:e(()=>[r(" Ilova o'rnatilgan ")]),_:1})),l(n,{block:"",color:"primary",to:{name:"main"},variant:"tonal",class:"mt-2"},{default:e(()=>[r(" Dasturga o'tish ")]),_:1})])]),_:1})]),_:1})]),_:1})}}});export{C as default};