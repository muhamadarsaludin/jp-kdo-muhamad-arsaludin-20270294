import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./createLucideIcon-b5K2wI9V.js";import{n as a,t as o}from"./check-CUzujs4o.js";import{i as s,n as c,r as ee,t as te}from"./file-type-icon-Bv-L00HV.js";import{n as l,t as ne}from"./x-Th8ClwsL.js";import{n as u,t as d}from"./cn-BksUxDMQ.js";import{n as f,t as p}from"./spinner-DsbQTAUd.js";import{n as m,t as re}from"./button-BSiNW2bO.js";import{n as h,t as ie}from"./progress-bar-BVWDMuGq.js";var g,_;function v(){return(v=e((()=>{r(),g={name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]},g.node,_=i(g)})))()}function ae(e){return e.status?e.status:e.progress===void 0?`idle`:e.progress>=100?`complete`:`uploading`}function oe({status:e}){return e===`uploading`?(0,b.jsx)(p,{size:`sm`,"aria-hidden":!0,className:`size-3.5`}):e===`complete`?(0,b.jsx)(o,{"aria-hidden":!0,className:`size-3.5`}):(0,b.jsx)(_,{"aria-hidden":!0,className:`size-3.5`})}var y,b,x,S,C,w,T,se,ce,E,D;function O(){return(O=e((()=>{y=t(),u(),a(),v(),s(),l(),m(),c(),h(),f(),b=n(),x={sm:`size-8`,md:`size-10`,lg:`size-12`},S={sm:`size-5`,md:`size-6`,lg:`size-7`},C={sm:`size-3`,md:`size-4`,lg:`size-5`},w={sm:`sm`,md:`sm`,lg:`md`},T={sm:`text-xs`,md:`text-sm`,lg:`text-sm`},se={plain:`rounded-lg hover:bg-primary-hover`,outline:`rounded-xl border border-secondary hover:bg-primary-hover`},ce={uploading:`Uploading...`,complete:`Complete`,failed:`Failed`},E={uploading:`text-tertiary`,complete:`text-success-primary`,failed:`text-error-primary`},D=(0,y.forwardRef)(function({items:e,onRemove:t,onRetry:n,onPreview:r,showStatusIcon:i=!0,statusLabels:a,separator:o=!1,align:s=`center`,size:c=`md`,variant:l=`plain`,className:u,...f},p){return(0,b.jsx)(`ul`,{...f,ref:p,"data-slot":`file-preview`,className:d(`flex flex-col gap-1`,u),children:e.map((e,u)=>{let f=e.type?.startsWith(`image/`),p=e.type?.startsWith(`video/`),m=!e.corrupt&&(f&&!!e.src||p&&!!(e.src||e.poster)),h=e.name??e.id,g=ae(e),_=g===`failed`,v=Math.max(0,Math.min(100,e.progress??0)),D=d(`relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-secondary`,_?`border-error-primary`:`border-secondary`,x[c]),O=r!=null&&m&&!!e.src,k;k=m&&p?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`video`,{"data-slot":`file-preview-video`,src:e.src,poster:e.poster,muted:!0,playsInline:!0,preload:`metadata`,"aria-label":e.alt??h,className:`size-full object-cover`}),(0,b.jsx)(`span`,{"data-slot":`file-preview-play`,"aria-hidden":`true`,className:`pointer-events-none absolute inset-0 flex items-center justify-center`,children:(0,b.jsx)(ee,{className:d(`fill-white text-white drop-shadow-sm`,C[c])})})]}):m?(0,b.jsx)(`img`,{"data-slot":`file-preview-image`,src:e.src,alt:e.alt??h,className:`size-full object-cover`}):(0,b.jsx)(te,{type:e.type,name:e.name,kind:e.corrupt?`corrupt`:void 0,className:S[c]});let A=null;return g===`idle`?e.meta&&(A=(0,b.jsx)(`span`,{className:`block truncate text-tertiary text-xs`,children:e.meta})):A=(0,b.jsxs)(`span`,{className:`flex min-w-0 items-center gap-1.5 text-xs`,children:[e.meta?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`span`,{className:`shrink-0 text-tertiary`,children:e.meta}),(0,b.jsx)(`span`,{"aria-hidden":`true`,className:`text-tertiary`,children:`|`})]}):null,(0,b.jsxs)(`span`,{className:d(`flex shrink-0 items-center gap-1`,E[g]),children:[i?(0,b.jsx)(oe,{status:g}):null,e.statusMessage??a?.[g]??ce[g]]})]}),(0,b.jsxs)(y.Fragment,{children:[o&&u>0?(0,b.jsx)(`li`,{"aria-hidden":`true`,"data-slot":`file-preview-separator`,className:`mx-2 border-primary border-t`}):null,(0,b.jsxs)(`li`,{"data-slot":`file-preview-item`,"data-status":g===`idle`?void 0:g,className:d(`group flex gap-2 px-2 py-2 transition-colors`,s===`top`?`items-start`:`items-center`,se[l]),children:[O?(0,b.jsx)(`button`,{type:`button`,"data-slot":`file-preview-thumb`,"aria-label":`Preview ${h}`,onClick:()=>r?.(e),className:d(D,`cursor-zoom-in focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2`),children:k}):(0,b.jsx)(`span`,{"data-slot":`file-preview-thumb`,className:D,children:k}),(0,b.jsxs)(`span`,{className:`flex min-w-0 flex-1 flex-col`,children:[(0,b.jsx)(`span`,{className:d(`block truncate font-medium text-primary`,T[c]),children:e.name??e.id}),A,g===`uploading`?(0,b.jsx)(ie,{value:v,size:w[c],className:`mt-1.5`,"aria-label":`Uploading ${h}`}):null]}),_&&n?(0,b.jsx)(re,{type:`button`,variant:`text`,color:`brand`,size:`xs`,onClick:()=>n(e.id),children:`Try again`}):null,t?(0,b.jsx)(`button`,{type:`button`,"aria-label":`Remove ${e.name??`item`}`,onClick:()=>t(e.id),className:`flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-tertiary transition-colors hover:bg-secondary hover:text-primary`,children:(0,b.jsx)(ne,{"aria-hidden":!0,className:`size-4`})}):null]})]},e.id)})})}),D.__docgenInfo={description:``,methods:[],displayName:`FilePreview`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  meta?: string;
  poster?: string;
  corrupt?: boolean;
  progress?: number;
  status?: FilePreviewItemStatus;
  statusMessage?: ReactNode;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`src`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`string`,required:!1}},{key:`alt`,value:{name:`string`,required:!1}},{key:`meta`,value:{name:`string`,required:!1}},{key:`poster`,value:{name:`string`,required:!1}},{key:`corrupt`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`status`,value:{name:`union`,raw:`"uploading" | "complete" | "failed"`,elements:[{name:`literal`,value:`"uploading"`},{name:`literal`,value:`"complete"`},{name:`literal`,value:`"failed"`}],required:!1}},{key:`statusMessage`,value:{name:`ReactNode`,required:!1}}]}}],raw:`FilePreviewItem[]`},description:``},onRemove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onPreview:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: FilePreviewItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  meta?: string;
  poster?: string;
  corrupt?: boolean;
  progress?: number;
  status?: FilePreviewItemStatus;
  statusMessage?: ReactNode;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`src`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`string`,required:!1}},{key:`alt`,value:{name:`string`,required:!1}},{key:`meta`,value:{name:`string`,required:!1}},{key:`poster`,value:{name:`string`,required:!1}},{key:`corrupt`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`status`,value:{name:`union`,raw:`"uploading" | "complete" | "failed"`,elements:[{name:`literal`,value:`"uploading"`},{name:`literal`,value:`"complete"`},{name:`literal`,value:`"failed"`}],required:!1}},{key:`statusMessage`,value:{name:`ReactNode`,required:!1}}]}},name:`item`}],return:{name:`void`}}},description:``},showStatusIcon:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},statusLabels:{required:!1,tsType:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"uploading" | "complete" | "failed"`,elements:[{name:`literal`,value:`"uploading"`},{name:`literal`,value:`"complete"`},{name:`literal`,value:`"failed"`}]},{name:`string`}],raw:`Record<FilePreviewItemStatus, string>`}],raw:`Partial<Record<FilePreviewItemStatus, string>>`},description:``},separator:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},align:{required:!1,tsType:{name:`union`,raw:`"top" | "center"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"center"`}]},description:``,defaultValue:{value:`"center"`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}},variant:{required:!1,tsType:{name:`union`,raw:`"plain" | "outline"`,elements:[{name:`literal`,value:`"plain"`},{name:`literal`,value:`"outline"`}]},description:``,defaultValue:{value:`"plain"`,computed:!1}}}}})))()}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,le;function ue(){return(ue=e((()=>{O(),k=n(),A=e=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='${e}'/%3E%3C/svg%3E`,j=[{id:`1`,src:A(`%23c7b9a1`),name:`venue-front.png`,type:`image/png`,meta:`820 KB`},{id:`2`,poster:A(`%236b7280`),name:`site-tour.mp4`,type:`video/mp4`,meta:`12.4 MB`},{id:`3`,name:`contract.pdf`,type:`application/pdf`,meta:`240 KB`},{id:`4`,name:`guest-list.xlsx`,type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,meta:`88 KB`},{id:`5`,name:`processional.mp3`,type:`audio/mpeg`,meta:`6.1 MB`},{id:`6`,name:`sponsor-logos.svg`,type:`image/svg+xml`,meta:`24 KB`},{id:`7`,name:`run-of-show.pptx`,type:`application/vnd.openxmlformats-officedocument.presentationml.presentation`,meta:`4.8 MB`},{id:`8`,name:`vendor-assets.zip`,type:`application/zip`,meta:`48 MB`},{id:`9`,name:`invitation.tsx`,type:`text/typescript`,meta:`3 KB`}],M=[{id:`1`,src:A(`%23c7b9a1`),name:`venue-front.png`,type:`image/png`,meta:`820 KB`},{id:`2`,src:A(`%23a1b9c7`),name:`venue-hall.png`,type:`image/png`,meta:`1.1 MB`},{id:`3`,src:A(`%23b9a1c7`),name:`table-setting.png`,type:`image/png`,meta:`640 KB`},{id:`4`,name:`schedule.pdf`,type:`application/pdf`,meta:`120 KB`}],N=[{id:`1`,name:`contract.pdf`,type:`application/pdf`,meta:`240 KB`},{id:`2`,name:`broken-archive.zip`,type:`application/zip`,meta:`Corrupted`,corrupt:!0},{id:`3`,name:`damaged-photo.png`,type:`image/png`,meta:`Corrupted`,corrupt:!0}],P=[{id:`1`,name:`venue-front.png`,type:`image/png`,meta:`820 KB`,progress:45},{id:`2`,name:`site-tour.mp4`,type:`video/mp4`,meta:`12.4 MB`,progress:82},{id:`3`,name:`contract.pdf`,type:`application/pdf`,meta:`240 KB`,progress:100},{id:`4`,name:`guest-list.xlsx`,type:`application/zip`,meta:`88 KB`,status:`failed`},{id:`5`,name:`processional.mp3`,type:`audio/mpeg`,meta:`6.1 MB`}],F={title:`Components/FilePreview`,component:D,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},variant:{control:`select`,options:[`plain`,`outline`]},showStatusIcon:{control:`boolean`},separator:{control:`boolean`},align:{control:`select`,options:[`top`,`center`]}},args:{size:`md`,variant:`plain`},decorators:[e=>(0,k.jsx)(`div`,{className:`w-96`,children:(0,k.jsx)(e,{})})]},I={args:{items:j}},L={args:{items:j,variant:`outline`}},R={args:{items:j,onRemove:()=>void 0}},z={args:{items:j,onPreview:()=>void 0}},B={args:{items:j,variant:`outline`,onRemove:()=>void 0}},V={args:{items:j,separator:!0}},H={args:{items:j,separator:!0,variant:`outline`,onRemove:()=>void 0}},U={args:{items:P,onRemove:()=>void 0,onRetry:()=>void 0}},W={args:{items:P,align:`top`,onRemove:()=>void 0,onRetry:()=>void 0}},G={args:{items:P,variant:`outline`,onRemove:()=>void 0,onRetry:()=>void 0}},K={args:{items:P,onRemove:()=>void 0,onRetry:()=>void 0,showStatusIcon:!1}},q={args:{items:P.filter(e=>e.progress&&e.progress<100),onRemove:()=>void 0}},J={args:{items:[{id:`1`,name:`contract.pdf`,type:`application/pdf`,progress:100}],onRemove:()=>void 0}},Y={args:{items:[{id:`1`,name:`guest-list.xlsx`,type:`application/zip`,status:`failed`}],onRemove:()=>void 0,onRetry:()=>void 0}},X={args:{items:M}},Z={args:{items:N}},Q={render:e=>(0,k.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,k.jsx)(D,{...e,size:`sm`,items:j}),(0,k.jsx)(D,{...e,size:`md`,items:j}),(0,k.jsx)(D,{...e,size:`lg`,items:j})]})},$={args:{items:[]}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed,
    variant: "outline"
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed,
    onRemove: () => undefined
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed,
    onPreview: () => undefined
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed,
    variant: "outline",
    onRemove: () => undefined
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed,
    separator: true
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixed,
    separator: true,
    variant: "outline",
    onRemove: () => undefined
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    items: uploadStates,
    onRemove: () => undefined,
    onRetry: () => undefined
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    items: uploadStates,
    align: "top",
    onRemove: () => undefined,
    onRetry: () => undefined
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    items: uploadStates,
    variant: "outline",
    onRemove: () => undefined,
    onRetry: () => undefined
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    items: uploadStates,
    onRemove: () => undefined,
    onRetry: () => undefined,
    showStatusIcon: false
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    items: uploadStates.filter(item => item.progress && item.progress < 100),
    onRemove: () => undefined
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "1",
      name: "contract.pdf",
      type: "application/pdf",
      progress: 100
    }],
    onRemove: () => undefined
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "1",
      name: "guest-list.xlsx",
      type: "application/zip",
      status: "failed"
    }],
    onRemove: () => undefined,
    onRetry: () => undefined
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    items: imageOnly
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    items: withCorrupt
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <FilePreview {...args} size="sm" items={mixed} />
      <FilePreview {...args} size="md" items={mixed} />
      <FilePreview {...args} size="lg" items={mixed} />
    </div>
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...$.parameters?.docs?.source}}},le=[`Default`,`Outline`,`WithRemove`,`WithPreview`,`OutlineWithRemove`,`Separator`,`SeparatorOutline`,`UploadStates`,`AlignTop`,`UploadStatesOutline`,`WithoutStatusIcon`,`Uploading`,`Complete`,`Failed`,`ImagesOnly`,`Corrupt`,`Sizes`,`Empty`]})))()}ue();export{W as AlignTop,J as Complete,Z as Corrupt,I as Default,$ as Empty,Y as Failed,X as ImagesOnly,L as Outline,B as OutlineWithRemove,V as Separator,H as SeparatorOutline,Q as Sizes,U as UploadStates,G as UploadStatesOutline,q as Uploading,z as WithPreview,R as WithRemove,K as WithoutStatusIcon,le as __namedExportsOrder,F as default};