import{d as p,r as i,o as r,j as d,F as h,q as g,c as x,w as _,g as N,k as v,p as C,f as t,e as y}from"./app-f25a100e.js";import"./CarRide-c91fac1d.js";import{_ as R,a as A}from"./Edit.vue_vue_type_script_setup_true_lang-541b53bb.js";import"./constants-68fdd4d6.js";const k={class:"tw-leading-none d-flex align-center"},D=p({__name:"PassengerRenderer",props:["params"],setup(c){return(l,e)=>{const o=i("v-icon");return r(),d("div",k,[(r(!0),d(h,null,g(c.params.value,m=>(r(),x(o,{color:"primary"},{default:_(()=>[N("mdi-account")]),_:1}))),256))])}}}),V={class:"d-flex tw-flex-col"},b={class:"d-flex align-center justify-space-between mb-2 px-1"},G=p({__name:"SendRoads",setup(c){const l=v(),e=C({car_rides:null,gridApi:null,rowClass:["tw-max-h-14","bg-white","tw-shadow"]}),o=[{field:"car.type",headerName:"Transport nomi",width:150},{field:"car.number",headerName:"Transport raqami",width:150},{field:"phone",headerName:"Telefon",width:150},{field:"price",headerName:"Narxi",width:150},{field:"free_seat",headerName:"Yo'lovchilar soni",cellRenderer:D,valueFormatter:null}];function m(a){e.gridApi.applyTransaction({add:[a],addIndex:0})}function u(a){e.gridApi.getRowNode(a.id).setData(a)}return axios.get("car-rides/only-success").then(({data:a})=>e.car_rides=a),(a,n)=>{const f=i("AgGridVue"),w=i("v-spacer");return r(),d("main",V,[t(R,{onUpdate:u,ref_key:"editComponent",ref:l},null,512),y("main",b,[t(A,{onCreate:m})]),t(w,null,{default:_(()=>[t(f,{class:"ag-theme-ruzzifer ag-theme-alpine h-100",rowHeight:58,rowClass:e.rowClass,columnDefs:o,rowData:e.car_rides,rowSelection:"multiple",onGridReady:n[0]||(n[0]=s=>e.gridApi=s.api),getRowId:({data:s})=>s.id},null,8,["rowClass","rowData","getRowId"])]),_:1})])}}});export{G as default};