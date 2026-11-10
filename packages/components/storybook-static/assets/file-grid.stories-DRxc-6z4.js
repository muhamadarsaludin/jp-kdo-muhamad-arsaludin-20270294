import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./image-plus-Dr2WcmsU.js";import{i as a,n as o,r as s,t as c}from"./file-type-icon-Bv-L00HV.js";import{n as l,t as u}from"./x-Th8ClwsL.js";import{n as d,t as f}from"./cn-BksUxDMQ.js";import{n as p,t as m}from"./use-file-select-ChqGbfVC.js";var h,g,_,v,y,b,x;function S(){return(S=e((()=>{h=t(),d(),r(),a(),l(),o(),m(),g=n(),_={sm:`size-16`,md:`size-20`,lg:`size-24`},v={rounded:`rounded-lg`,circle:`rounded-full`},y={sm:`size-8`,md:`size-10`,lg:`size-12`},b={sm:`size-6`,md:`size-7`,lg:`size-8`},x=(0,h.forwardRef)(function({items:e,onAdd:t,onRemove:n,onItemClick:r,itemClickLabel:a=e=>`Edit ${e.name??`item`}`,onReorder:o,accept:l,maxBytes:d,max:m,shape:x=`rounded`,size:S=`md`,disabled:C=!1,addLabel:w=`Add`,removeLabel:T=e=>`Remove ${e.name??`item`}`,onError:E,addIcon:D=(0,g.jsx)(i,{"aria-hidden":!0,className:`size-5`}),className:O,...k},A){let j=(0,h.useRef)(null),[M,N]=(0,h.useState)(null),[P,F]=(0,h.useState)(null),I=m===void 0?1/0:Math.max(0,m-e.length),L=!C&&I>0,{getInputProps:R,getRootProps:z,isDragging:B}=p({accept:l,maxBytes:d,multiple:!0,disabled:!L,onFiles:e=>{let n=I===1/0?e:e.slice(0,I);n.length>0&&t?.(n)},onError:E}),V=v[x],H=_[S];return(0,g.jsxs)(`div`,{...k,ref:A,"data-slot":`file-grid`,className:f(`flex flex-wrap gap-3`,O),children:[e.map(e=>{let t=e.type?.startsWith(`image/`),i=e.type?.startsWith(`video/`),l=t&&!!e.src||i&&!!(e.src||e.poster),d;return d=l&&i?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`video`,{"data-slot":`file-grid-video`,src:e.src,poster:e.poster,muted:!0,playsInline:!0,preload:`metadata`,"aria-label":e.alt??e.name??``,className:`size-full object-cover`}),(0,g.jsx)(`span`,{"aria-hidden":`true`,className:`pointer-events-none absolute inset-0 flex items-center justify-center`,children:(0,g.jsx)(s,{className:f(`fill-white text-white drop-shadow-sm`,b[S])})})]}):l?(0,g.jsx)(`img`,{"data-slot":`file-grid-image`,src:e.src,alt:e.alt??e.name??``,className:`size-full object-cover`}):(0,g.jsx)(c,{type:e.type,name:e.name,className:y[S]}),(0,g.jsxs)(`div`,{"data-slot":`file-grid-item`,draggable:o!==void 0,onDragStart:t=>{o&&(j.current=e.id,N(e.id),t.dataTransfer&&(t.dataTransfer.effectAllowed=`move`,t.dataTransfer.setData(`text/plain`,e.id)))},onDragOver:t=>{o&&(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect=`move`),F(e.id))},onDragLeave:()=>{o&&F(t=>t===e.id?null:t)},onDrop:t=>{if(!o)return;t.preventDefault();let n=j.current??t.dataTransfer?.getData(`text/plain`)??``;n&&n!==e.id&&o(n,e.id),j.current=null,N(null),F(null)},onDragEnd:()=>{j.current=null,N(null),F(null)},className:f(`relative flex shrink-0 items-center justify-center overflow-hidden border border-secondary bg-secondary`,H,V,o&&`cursor-grab active:cursor-grabbing`,M===e.id&&`opacity-60`,P===e.id&&M!==e.id&&`ring-2 ring-brand-primary`),children:[r?(0,g.jsx)(`button`,{type:`button`,"aria-label":a(e),onClick:()=>r(e),className:`flex size-full cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:-outline-offset-2`,children:d}):d,n?(0,g.jsx)(`button`,{type:`button`,"aria-label":T(e),onClick:t=>{t.stopPropagation(),n(e.id)},className:`absolute top-1 right-1 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-primary-inverse text-primary-inverse outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-secondary-inverse focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2`,children:(0,g.jsx)(u,{"aria-hidden":!0,className:`size-3`})}):null,e.badge?(0,g.jsx)(`span`,{className:`pointer-events-none absolute top-1 left-1 z-10`,children:e.badge}):null]},e.id)}),L?(0,g.jsxs)(`div`,{...z(),"data-slot":`file-grid-add`,"data-dragging":B||void 0,className:f(`flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border border-primary border-dashed text-tertiary outline-none transition-colors`,H,V,`focus-visible:border-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50`,B&&`border-brand-primary bg-brand-muted-primary text-brand-primary`),children:[(0,g.jsx)(`input`,{...R()}),D,(0,g.jsx)(`span`,{className:`text-xs`,children:w})]}):null]})}),x.__docgenInfo={description:``,methods:[],displayName:`FileGrid`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  poster?: string;
  badge?: ReactNode;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`src`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`string`,required:!1}},{key:`alt`,value:{name:`string`,required:!1}},{key:`poster`,value:{name:`string`,required:!1}},{key:`badge`,value:{name:`ReactNode`,required:!1}}]}}],raw:`FileGridItem[]`},description:``},onAdd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(files: File[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`File`}],raw:`File[]`},name:`files`}],return:{name:`void`}}},description:``},onRemove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onItemClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileGridItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  poster?: string;
  badge?: ReactNode;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`src`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`string`,required:!1}},{key:`alt`,value:{name:`string`,required:!1}},{key:`poster`,value:{name:`string`,required:!1}},{key:`badge`,value:{name:`ReactNode`,required:!1}}]}},name:`item`}],return:{name:`void`}}},description:``},itemClickLabel:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileGridItem) => string`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  poster?: string;
  badge?: ReactNode;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`src`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`string`,required:!1}},{key:`alt`,value:{name:`string`,required:!1}},{key:`poster`,value:{name:`string`,required:!1}},{key:`badge`,value:{name:`ReactNode`,required:!1}}]}},name:`item`}],return:{name:`string`}}},description:``,defaultValue:{value:'(item) => `Edit ${item.name ?? "item"}`',computed:!1}},onReorder:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(fromId: string, toId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`fromId`},{type:{name:`string`},name:`toId`}],return:{name:`void`}}},description:``},accept:{required:!1,tsType:{name:`string`},description:``},maxBytes:{required:!1,tsType:{name:`number`},description:``},max:{required:!1,tsType:{name:`number`},description:``},shape:{required:!1,tsType:{name:`union`,raw:`"rounded" | "circle"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"circle"`}]},description:``,defaultValue:{value:`"rounded"`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},addLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Add"`,computed:!1}},removeLabel:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FileGridItem) => string`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  poster?: string;
  badge?: ReactNode;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`src`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`string`,required:!1}},{key:`alt`,value:{name:`string`,required:!1}},{key:`poster`,value:{name:`string`,required:!1}},{key:`badge`,value:{name:`ReactNode`,required:!1}}]}},name:`item`}],return:{name:`string`}}},description:``,defaultValue:{value:'(item) => `Remove ${item.name ?? "item"}`',computed:!1}},onError:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(error: FileSelectError) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  code: FileSelectErrorCode;
  file: File;
  message: string;
}`,signature:{properties:[{key:`code`,value:{name:`union`,raw:`"type" | "size" | "count" | "totalSize"`,elements:[{name:`literal`,value:`"type"`},{name:`literal`,value:`"size"`},{name:`literal`,value:`"count"`},{name:`literal`,value:`"totalSize"`}],required:!0}},{key:`file`,value:{name:`File`,required:!0}},{key:`message`,value:{name:`string`,required:!0}}]}},name:`error`}],return:{name:`void`}}},description:``},addIcon:{required:!1,tsType:{name:`ReactNode`},description:``,defaultValue:{value:`<ImagePlus aria-hidden className="size-5" />`,computed:!1}}}}})))()}function C(e){let[t,n]=(0,T.useState)(O);return(0,E.jsx)(x,{...e,items:t,onAdd:e=>n(t=>[...t,...e.map(e=>({id:crypto.randomUUID(),src:e.type.startsWith(`image/`)?URL.createObjectURL(e):void 0,name:e.name,type:e.type}))]),onRemove:e=>n(t=>t.filter(t=>t.id!==e))})}function w(e){let[t,n]=(0,T.useState)(O);return(0,E.jsx)(x,{...e,items:t,onReorder:(e,t)=>n(n=>{let r=n.findIndex(t=>t.id===e),i=n.findIndex(e=>e.id===t);if(r<0||i<0||r===i)return n;let a=[...n],[o]=a.splice(r,1);return o&&a.splice(i,0,o),a})})}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{T=t(),S(),E=n(),D=e=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='${e}'/%3E%3Ccircle cx='80' cy='64' r='24' fill='%23ffffff' fill-opacity='0.6'/%3E%3C/svg%3E`,O=[{id:`1`,src:D(`%23c7b9a1`),name:`photo-1.png`,type:`image/png`},{id:`2`,src:D(`%23a1b9c7`),name:`photo-2.png`,type:`image/png`},{id:`3`,src:D(`%23b9a1c7`),name:`photo-3.png`,type:`image/png`}],k=[{id:`1`,name:`contract.pdf`,type:`application/pdf`},{id:`2`,name:`guest-list.xlsx`,type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`},{id:`3`,name:`run-of-show.pptx`,type:`application/vnd.openxmlformats-officedocument.presentationml.presentation`},{id:`4`,name:`processional.mp3`,type:`audio/mpeg`},{id:`5`,name:`sponsor-logos.svg`,type:`image/svg+xml`},{id:`6`,name:`vendor-assets.zip`,type:`application/zip`}],A=[{id:`1`,name:`site-tour.mp4`,type:`video/mp4`,poster:D(`%236b7280`)},{id:`2`,name:`venue-walkthrough.webm`,type:`video/webm`,poster:D(`%238b5cf6`)}],j={title:`Components/FileGrid`,component:x,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{shape:{control:`select`,options:[`rounded`,`circle`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},disabled:{control:`boolean`},max:{control:`number`},addLabel:{control:`text`}},args:{shape:`rounded`,size:`md`,addLabel:`Add`},decorators:[e=>(0,E.jsx)(`div`,{className:`w-96`,children:(0,E.jsx)(e,{})})]},M={args:{items:O}},N={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,E.jsx)(x,{...e,size:`sm`,items:O}),(0,E.jsx)(x,{...e,size:`md`,items:O}),(0,E.jsx)(x,{...e,size:`lg`,items:O})]})},P={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,E.jsx)(x,{...e,shape:`rounded`,items:O}),(0,E.jsx)(x,{...e,shape:`circle`,items:O})]})},F={args:{items:O,onRemove:()=>void 0}},I={args:{items:k,onRemove:()=>void 0}},L={args:{items:A,onRemove:()=>void 0}},R={args:{items:[...O,...k.slice(0,2),...A.slice(0,1)],onRemove:()=>void 0}},z={args:{items:O,addLabel:`Upload`}},B={args:{items:O,max:3}},V={args:{items:[]}},H={args:{items:O,disabled:!0}},U={render:e=>(0,E.jsx)(C,{...e})},W={render:e=>(0,E.jsx)(w,{...e})},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    items: photos
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <FileGrid {...args} size="sm" items={photos} />
      <FileGrid {...args} size="md" items={photos} />
      <FileGrid {...args} size="lg" items={photos} />
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <FileGrid {...args} shape="rounded" items={photos} />
      <FileGrid {...args} shape="circle" items={photos} />
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    items: photos,
    onRemove: () => undefined
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    items: documents,
    onRemove: () => undefined
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    items: videos,
    onRemove: () => undefined
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...photos, ...documents.slice(0, 2), ...videos.slice(0, 1)],
    onRemove: () => undefined
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    items: photos,
    addLabel: "Upload"
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    items: photos,
    max: 3
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    items: photos,
    disabled: true
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveGrid {...args} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <ReorderableGrid {...args} />
}`,...W.parameters?.docs?.source}}},G=[`Default`,`Sizes`,`Shapes`,`WithRemove`,`Documents`,`Videos`,`MixedFiles`,`CustomAddLabel`,`AtMax`,`Empty`,`Disabled`,`Interactive`,`Reorderable`]})))()}K();export{B as AtMax,z as CustomAddLabel,M as Default,H as Disabled,I as Documents,V as Empty,U as Interactive,R as MixedFiles,W as Reorderable,P as Shapes,N as Sizes,L as Videos,F as WithRemove,G as __namedExportsOrder,j as default};