import{e as o,j as p}from"./index-2a067a84.js";const j=({direction:s,align:e,alignItems:i,alignSelf:t,justify:n,wrap:a,grow:c,shrink:l})=>o("is-flex",s&&`is-flex-direction-${s}`,n&&`is-justify-content-${n}`,e&&`is-align-content-${e}`,i&&`is-align-items-${i}`,t&&`is-align-self-${t}`,c&&`is-flex-grow-${c}`,l&&`is-flex-shrink-${l}`,a&&`is-flex-wrap-${a}`),d=s=>s&&!Array.isArray(s)&&typeof s=="object"?Object.entries(s).map(([e,i])=>`${e}-${i}`):void 0,u=({children:s,className:e,align:i,alignItems:t,alignSelf:n,direction:a,grow:c,justify:l,shrink:x,spacing:$,wrap:f,...r})=>{const m=o(j({align:i,alignItems:t,alignSelf:n,direction:a,grow:c,justify:l,shrink:x,wrap:f}),d($),e);return p.jsx("div",{className:m,...r,children:s})};export{u as F};
