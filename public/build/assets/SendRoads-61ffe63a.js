import{_ as m,a as f}from"./Edit.vue_vue_type_script_setup_true_lang-96f9f141.js";import{d as w,k as _,p as u,r as n,j as h,f as o,e as g,w as x,o as C}from"./app-33261b3f.js";import"./constants-68fdd4d6.js";const N={class:"d-flex tw-flex-col"},y={class:"d-flex align-center justify-space-between mb-2 px-1"},k=w({__name:"SendRoads",setup(A){const s=_(),a=u({car_rides:null,gridApi:null,rowClass:["tw-max-h-14","bg-white","tw-shadow"]}),i=[{field:"car.type",headerName:"Transport nomi",width:150},{field:"car.number",headerName:"Transport raqami",width:150},{field:"phone",headerName:"Telefon",width:150},{field:"price",headerName:"Narxi",width:150}];function d(e){a.gridApi.applyTransaction({add:[e],addIndex:0})}function c(e){a.gridApi.getRowNode(e.id).setData(e)}return axios.get("car-rides/only-success").then(({data:e})=>a.car_rides=e),(e,t)=>{const l=n("AgGridVue"),p=n("v-spacer");return C(),h("main",N,[o(m,{onUpdate:c,ref_key:"editComponent",ref:s},null,512),g("main",y,[o(f,{onCreate:d})]),o(p,null,{default:x(()=>[o(l,{class:"ag-theme-ruzzifer ag-theme-alpine h-100",rowHeight:58,rowClass:a.rowClass,columnDefs:i,rowData:a.car_rides,rowSelection:"multiple",onGridReady:t[0]||(t[0]=r=>a.gridApi=r.api),getRowId:({data:r})=>r.id},null,8,["rowClass","rowData","getRowId"])]),_:1})])}}});export{k as default};
