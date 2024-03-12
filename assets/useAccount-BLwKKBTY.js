import{B as A,r as g,W as R}from"./index-4iJhRmvq.js";function E(e){const r=e.state.current,t=e.state.connections.get(r),n=t==null?void 0:t.accounts,u=n==null?void 0:n[0],s=e.chains.find(c=>c.id===(t==null?void 0:t.chainId)),i=e.state.status;switch(i){case"connected":return{address:u,addresses:n,chain:s,chainId:t==null?void 0:t.chainId,connector:t==null?void 0:t.connector,isConnected:!0,isConnecting:!1,isDisconnected:!1,isReconnecting:!1,status:i};case"reconnecting":return{address:u,addresses:n,chain:s,chainId:t==null?void 0:t.chainId,connector:t==null?void 0:t.connector,isConnected:!!u,isConnecting:!1,isDisconnected:!1,isReconnecting:!0,status:i};case"connecting":return{address:u,addresses:n,chain:s,chainId:t==null?void 0:t.chainId,connector:t==null?void 0:t.connector,isConnected:!1,isConnecting:!0,isDisconnected:!1,isReconnecting:!1,status:i};case"disconnected":return{address:void 0,addresses:void 0,chain:void 0,chainId:void 0,connector:void 0,isConnected:!1,isConnecting:!1,isDisconnected:!0,isReconnecting:!1,status:i}}}function v(e,r){if(e===r)return!0;if(e&&r&&typeof e=="object"&&typeof r=="object"){if(e.constructor!==r.constructor)return!1;let t,n;if(Array.isArray(e)&&Array.isArray(r)){if(t=e.length,t!==r.length)return!1;for(n=t;n--!==0;)if(!v(e[n],r[n]))return!1;return!0}if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===r.toString();const u=Object.keys(e);if(t=u.length,t!==Object.keys(r).length)return!1;for(n=t;n--!==0;)if(!Object.prototype.hasOwnProperty.call(r,u[n]))return!1;for(n=t;n--!==0;){const s=u[n];if(s&&!v(e[s],r[s]))return!1}return!0}return e!==e&&r!==r}function $(e,r){const{onChange:t}=r;return e.subscribe(()=>E(e),t,{equalityFn(n,u){const{connector:s,...i}=n,{connector:c,...o}=u;return v(i,o)&&(s==null?void 0:s.id)===(c==null?void 0:c.id)&&(s==null?void 0:s.uid)===(c==null?void 0:c.uid)}})}const k="2.5.7",I=()=>`wagmi@${k}`;class C extends A{constructor(){super(...arguments),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"WagmiError"})}get docsBaseUrl(){return"https://wagmi.sh/react"}get version(){return I()}}class D extends C{constructor(){super("`useConfig` must be used within `WagmiProvider`.",{docsPath:"https://wagmi.sh/react/api/WagmiProvider"}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"WagmiProviderNotFoundError"})}}function V(e={}){const r=e.config??g.useContext(R);if(!r)throw new D;return r}var O={exports:{}},j={},P={exports:{}},W={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l=g;function q(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var B=typeof Object.is=="function"?Object.is:q,_=l.useState,F=l.useEffect,N=l.useLayoutEffect,K=l.useDebugValue;function L(e,r){var t=r(),n=_({inst:{value:t,getSnapshot:r}}),u=n[0].inst,s=n[1];return N(function(){u.value=t,u.getSnapshot=r,m(u)&&s({inst:u})},[e,t,r]),F(function(){return m(u)&&s({inst:u}),e(function(){m(u)&&s({inst:u})})},[e]),K(t),t}function m(e){var r=e.getSnapshot;e=e.value;try{var t=r();return!B(e,t)}catch{return!0}}function M(e,r){return r()}var T=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?M:L;W.useSyncExternalStore=l.useSyncExternalStore!==void 0?l.useSyncExternalStore:T;P.exports=W;var U=P.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=g,z=U;function G(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var H=typeof Object.is=="function"?Object.is:G,J=z.useSyncExternalStore,Q=p.useRef,X=p.useEffect,Y=p.useMemo,Z=p.useDebugValue;j.useSyncExternalStoreWithSelector=function(e,r,t,n,u){var s=Q(null);if(s.current===null){var i={hasValue:!1,value:null};s.current=i}else i=s.current;s=Y(function(){function o(a){if(!d){if(d=!0,y=a,a=n(a),u!==void 0&&i.hasValue){var f=i.value;if(u(f,a))return h=f}return h=a}if(f=h,H(y,a))return f;var w=n(a);return u!==void 0&&u(f,w)?f:(y=a,h=w)}var d=!1,y,h,x=t===void 0?null:t;return[function(){return o(r())},x===null?void 0:function(){return o(x())}]},[r,t,n,u]);var c=J(e,s[0],s[1]);return X(function(){i.hasValue=!0,i.value=c},[c]),Z(c),c};O.exports=j;var b=O.exports;const S=e=>typeof e=="object"&&!Array.isArray(e);function ee(e,r,t=r,n=v){const u=g.useRef([]),s=b.useSyncExternalStoreWithSelector(e,r,t,i=>i,(i,c)=>{if(S(i)&&S(c)&&u.current.length){for(const o of u.current)if(!n(i[o],c[o]))return!1;return!0}return n(i,c)});if(S(s)){const i={...s};return Object.defineProperties(i,Object.entries(i).reduce((c,[o,d])=>({...c,[o]:{configurable:!1,enumerable:!0,get:()=>(u.current.includes(o)||u.current.push(o),d)}}),{})),i}return s}function re(e={}){const r=V(e);return ee(t=>$(r,{onChange:t}),()=>E(r))}export{re as a,v as d,V as u};
