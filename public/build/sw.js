if(!self.define){let s,e={};const r=(r,l)=>(r=new URL(r+".js",l).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(l,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const u=s=>r(s,i),o={module:{uri:i},exports:t,require:u};e[i]=Promise.all(l.map((s=>o[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-39703224.css",revision:null},{url:"assets/app-3a647b54.js",revision:null},{url:"assets/CarRides-dcc29033.js",revision:null},{url:"assets/CarRidesAuthUser-d8f72185.js",revision:null},{url:"assets/constants-68fdd4d6.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-a45d1bf2.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-f1b41469.js",revision:null},{url:"assets/Index-254d8d81.js",revision:null},{url:"assets/index-9b00be14.js",revision:null},{url:"assets/InstallApp-136049d4.js",revision:null},{url:"assets/Login-b3f043b4.js",revision:null},{url:"assets/Operator-3a127369.js",revision:null},{url:"assets/Passengers-93533aec.js",revision:null},{url:"assets/PhonePage-e97e5659.js",revision:null},{url:"assets/SecretCode-557783ce.js",revision:null},{url:"assets/SendRoads-9a653fcc.js",revision:null},{url:"assets/Transports-af091fd6.js",revision:null},{url:"assets/useMainStore-33cb683a.js",revision:null},{url:"assets/Welcome-e874d193.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
