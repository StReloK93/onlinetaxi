import{d as V,b as k,n as R,c as o,o as S,e as B,w as t,g as e,v as C,j as D,h as d,f as n,s as N}from"./app-6622c7aa.js";const O=n("div",{class:"text-center py-4"},[n("img",{src:"/favicon.ico",width:"100",class:"d-inline"})],-1),T=n("h3",{class:"text-h4 text-center"}," Xush kelibsiz ",-1),U=n("p",{class:"text-caption text-center"}," Iltimos malumotlaringizni kiriting ",-1),j=n("span",null,"Haydovchi",-1),z=n("span",null,"Yo'lovchi",-1),H=n("span",null,"Dasturga kirish",-1),F=V({__name:"WelcomePage",setup(I){const p=k(),a=R({role:4,name:null});async function m(_){(await _.then()).valid!=!1&&p.sendUserData(a)}return(_,l)=>{const f=o("v-text-field"),s=o("v-col"),c=o("v-icon"),i=o("v-btn"),u=o("v-radio"),v=o("v-radio-group"),h=o("v-row"),x=o("v-card-text"),g=o("v-form"),w=o("v-card"),b=o("v-container"),y=o("v-app");return S(),B(y,{class:"tw-h-screen login-page"},{default:t(()=>[e(b,{class:"tw-flex tw-h-full tw-justify-center tw-items-center"},{default:t(()=>[e(w,{width:"500"},{default:t(()=>[O,T,U,e(g,{onSubmit:C(m,["prevent"])},{default:t(()=>[e(x,null,{default:t(()=>[e(h,null,{default:t(()=>[e(s,{cols:"12"},{default:t(()=>[e(f,{modelValue:a.name,"onUpdate:modelValue":l[0]||(l[0]=r=>a.name=r),label:"F.I.SH",variant:"filled",rules:D(N)},null,8,["modelValue","rules"])]),_:1}),e(s,{cols:"6",class:"py-0 pr-1"},{default:t(()=>[e(i,{tag:"label",color:a.role==3?"default":"primary",for:"TaxiRadio",variant:"tonal",class:"w-100"},{default:t(()=>[j,e(c,{end:""},{default:t(()=>[d(" mdi-taxi ")]),_:1})]),_:1},8,["color"])]),_:1}),e(s,{cols:"6",class:"py-0 pl-1"},{default:t(()=>[e(i,{tag:"label",color:a.role==4?"default":"primary",for:"passengerRadio",variant:"tonal",class:"w-100"},{default:t(()=>[z,e(c,{end:""},{default:t(()=>[d(" mdi-account ")]),_:1})]),_:1},8,["color"])]),_:1}),e(v,{modelValue:a.role,"onUpdate:modelValue":l[1]||(l[1]=r=>a.role=r),hidden:""},{default:t(()=>[e(u,{id:"passengerRadio",label:"Option One",value:3}),e(u,{id:"TaxiRadio",label:"Option 2 (string)",value:4})]),_:1},8,["modelValue"]),e(s,{cols:"12"},{default:t(()=>[e(i,{class:"w-100",type:"submit"},{default:t(()=>[H,e(c,{end:""},{default:t(()=>[d(" mdi-login ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{F as default};
