if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const o=e=>n(e,r),u={module:{uri:r},exports:t,require:o};s[r]=Promise.all(i.map((e=>u[e]||o(e)))).then((e=>(l(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/app-730abe2c.js",revision:null},{url:"assets/app-837cdfb2.css",revision:null},{url:"assets/General-58870761.js",revision:null},{url:"assets/InstallAppPage-d323c053.js",revision:null},{url:"assets/Login-63fdaa07.js",revision:null},{url:"assets/LoginPhonePage-0d9229fc.js",revision:null},{url:"assets/LoginSendSmsPage-ea59304e.js",revision:null},{url:"assets/WelcomePage-d7daf7c3.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
