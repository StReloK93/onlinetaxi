if(!self.define){let s,e={};const r=(r,n)=>(r=new URL(r+".js",n).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(n,i)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const u=s=>r(s,l),o={module:{uri:l},exports:t,require:u};e[l]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(i(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-0ba38769.js",revision:null},{url:"assets/app-723ee002.css",revision:null},{url:"assets/CarRides-61757b2d.js",revision:null},{url:"assets/constants-68fdd4d6.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-111620cd.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-78382c3c.js",revision:null},{url:"assets/Index-ff84531c.js",revision:null},{url:"assets/Login-0ff1eddb.js",revision:null},{url:"assets/Operator-fb6c585e.js",revision:null},{url:"assets/Passengers-665c8681.js",revision:null},{url:"assets/PhonePage-cc0eebe0.js",revision:null},{url:"assets/SecretCode-ba4abd71.js",revision:null},{url:"assets/SendRoads-9a54b5ec.js",revision:null},{url:"assets/Transports-eccfbc5c.js",revision:null},{url:"assets/Welcome-7eb4bf16.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
