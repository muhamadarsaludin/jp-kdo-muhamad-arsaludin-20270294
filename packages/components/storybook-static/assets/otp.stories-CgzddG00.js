import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./cn-BksUxDMQ.js";import{n as a,t as o}from"./dist-DfM7qAcG.js";import{n as s,t as c}from"./field-context-C6liZpf3.js";import{n as l,t as u}from"./field-DWHIWe24.js";var d,f,p;function m(){return(m=e((()=>{a(),d={sm:`h-8`,md:`h-10`,lg:`h-12`},f={sm:`text-sm`,md:`text-sm`,lg:`text-base`},p=o([`flex aspect-square items-center justify-center outline-1 -outline-offset-1 focus-within:ring-3`],{variants:{variant:{filled:`bg-tertiary outline-transparent`,outlined:`bg-primary outline-primary`},shape:{rounded:`rounded-lg`,pill:`rounded-full`},status:{default:`focus-within:outline-brand-primary focus-within:ring-brand-primary/50`,error:`outline-error-primary focus-within:outline-error-primary focus-within:ring-error-primary/50`,warning:`outline-warning-primary focus-within:outline-warning-primary focus-within:ring-warning-primary/50`,success:`outline-success-primary focus-within:outline-success-primary focus-within:ring-success-primary/50`},size:{sm:d.sm,md:d.md,lg:d.lg}},defaultVariants:{variant:`outlined`,shape:`rounded`,status:`default`,size:`md`}})})))()}function h(e,t){return t===`numeric`?e.replace(/\D/g,``):e.replace(/[^a-zA-Z0-9]/g,``)}function g(e,t){let n=e.split(``).slice(0,t);for(;n.length<t;)n.push(``);return n}function _(e,t){let n=e.slice(0,t);for(;n.length<t;)n.push(``);return n}function v(e,t){let n=0;if(t===!0?n=2:typeof t==`number`&&(n=Math.floor(t)),!Number.isFinite(n)||n<1||n>=e)return[];let r=[];for(let t=n;t<e;t+=n)r.push(t);return r}var y,b,x,S;function C(){return(C=e((()=>{y=t(),r(),s(),m(),b=n(),x=(0,y.forwardRef)(function({length:e=6,separator:t=!1,value:n,defaultValue:r=``,onValueChange:a,onComplete:o,mode:s=`numeric`,size:l=`md`,status:u,variant:d=`outlined`,shape:m=`rounded`,disabled:x=!1,autoFocus:S=!1,autoComplete:C=`one-time-code`,webOtp:w=!1,className:T,cellClassName:E,cellLabel:D=(e,t)=>`Digit ${e+1} of ${t}`,...O},k){let A=(0,y.useContext)(c),j=u??A?.status??`default`,[M,N]=(0,y.useState)(()=>g(h(r,s),e)),P=n!==void 0,F=_(P?g(n,e):M,e).map(e=>h(e,s).slice(0,1)),I=(0,y.useRef)([]),L=(0,y.useCallback)(e=>{let t=I.current[e];t&&(t.focus(),t.select())},[]);(0,y.useEffect)(()=>{S&&L(0)},[S,L]);let R=(0,y.useRef)({cells:F,isControlled:P,onValueChange:a,onComplete:o,mode:s,length:e});R.current={cells:F,isControlled:P,onValueChange:a,onComplete:o,mode:s,length:e},(0,y.useEffect)(()=>{if(!w||x||globalThis.OTPCredential===void 0)return;let e=navigator.credentials;if(e?.get===void 0)return;let t=new AbortController;return e.get({otp:{transport:[`sms`]},signal:t.signal}).then(e=>{let t=e?.code,n=R.current,r=t===void 0?``:h(t,n.mode);if(r.length===0)return;let i=[...n.cells],a=r.split(``);for(let e=0;e<a.length&&e<n.length;e+=1){let t=a[e];t!==void 0&&(i[e]=t)}let o=i.join(``),s=n.cells.every(e=>e!==``),c=i.every(e=>e!==``);n.isControlled||N(i),n.onValueChange?.(o),c&&!s&&n.onComplete?.(o);let l=i.indexOf(``);L(l===-1?Math.min(a.length-1,n.length-1):l)}).catch(()=>{}),()=>t.abort()},[w,x,L]);let z=(0,y.useId)(),B=(0,y.useMemo)(()=>Array.from({length:e},(e,t)=>t),[e]),V=(0,y.useMemo)(()=>v(e,t),[e,t]),H=(e,t)=>{let n=e.join(``),r=F.every(e=>e!==``),i=e.every(e=>e!==``);P||N(e),a?.(n),i&&!r&&o?.(n),t!==void 0&&L(t)},U=(t,n)=>{if(x)return;let r=n.target.value,i=h(r,s);if(i.length===0){let e=[...F];e[t]=``,H(e);return}if(i===F[t]&&r!==i)return;if(i.length===1){let n=[...F];n[t]=i,H(n,t<e-1?t+1:void 0);return}let a=[...F],o=i.split(``);for(let n=0;n<o.length&&t+n<e;n+=1){let e=o[n];e!==void 0&&(a[t+n]=e)}let c=a.indexOf(``),l=Math.min(t+o.length-1,e-1);H(a,c===-1?l:c)},W=(t,n)=>{if(n.key===`Backspace`){if(F[t]===``&&t>0){n.preventDefault();let e=[...F];e[t-1]=``,H(e,t-1)}}else n.key===`ArrowLeft`&&t>0?(n.preventDefault(),L(t-1)):n.key===`ArrowRight`&&t<e-1&&(n.preventDefault(),L(t+1))},G=(t,n)=>{if(x)return;n.preventDefault();let r=h(n.clipboardData.getData(`text`),s);if(r.length===0)return;let i=[...F],a=r.split(``);for(let n=0;n<a.length&&t+n<e;n+=1){let e=a[n];e!==void 0&&(i[t+n]=e)}let o=i.indexOf(``),c=Math.min(t+a.length-1,e-1);H(i,o===-1?c:o)},K=e=>{e.target.select()};return(0,b.jsx)(`fieldset`,{ref:k,className:i(`flex min-w-0 items-center gap-2 border-0 p-0`,x&&`opacity-50`,T),...O,children:B.map(t=>(0,b.jsxs)(y.Fragment,{children:[V.includes(t)&&(0,b.jsx)(`span`,{"aria-hidden":`true`,"data-slot":`separator`,className:`select-none text-tertiary`,children:`–`}),(0,b.jsx)(`div`,{className:i(p({variant:d,shape:m,status:j,size:l}),E),children:(0,b.jsx)(`input`,{ref:e=>{I.current[t]=e},id:t===0?A?.controlId:void 0,value:F[t]??``,onChange:e=>U(t,e),onKeyDown:e=>W(t,e),onPaste:e=>G(t,e),onFocus:K,disabled:x||void 0,autoComplete:C,inputMode:s===`numeric`?`numeric`:`text`,pattern:s===`numeric`?`[0-9]*`:void 0,"aria-label":D(t,e),"aria-describedby":A?.descriptionPresent?A.descriptionId:void 0,"aria-invalid":j===`error`||void 0,className:i(f[l],`h-full w-full bg-transparent text-center text-primary outline-none placeholder:text-placeholder disabled:cursor-not-allowed`)})})]},`${z}-cell-${t}`))})}),x.displayName=`Otp`,S=x,x.__docgenInfo={description:``,methods:[],displayName:`Otp`,props:{length:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`6`,computed:!1}},separator:{required:!1,tsType:{name:`union`,raw:`boolean | number`,elements:[{name:`boolean`},{name:`number`}]},description:``,defaultValue:{value:`false`,computed:!1}},value:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`""`,computed:!1}},onValueChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},onComplete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},mode:{required:!1,tsType:{name:`union`,raw:`"numeric" | "alphanumeric"`,elements:[{name:`literal`,value:`"numeric"`},{name:`literal`,value:`"alphanumeric"`}]},description:``,defaultValue:{value:`"numeric"`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}},status:{required:!1,tsType:{name:`union`,raw:`"default" | "warning" | "error" | "success"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"warning"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"success"`}]},description:``},variant:{required:!1,tsType:{name:`NonNullable`,elements:[{name:`VariantProps["variant"]`,raw:`VariantProps<typeof inputInnerVariants>["variant"]`}],raw:`NonNullable<VariantProps<typeof inputInnerVariants>["variant"]>`},description:``,defaultValue:{value:`"outlined"`,computed:!1}},shape:{required:!1,tsType:{name:`union`,raw:`"rounded" | "pill"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"pill"`}]},description:``,defaultValue:{value:`"rounded"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},autoFocus:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},autoComplete:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"one-time-code"`,computed:!1}},webOtp:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},cellClassName:{required:!1,tsType:{name:`string`},description:``},cellLabel:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number, length: number) => string`,signature:{arguments:[{type:{name:`number`},name:`index`},{type:{name:`number`},name:`length`}],return:{name:`string`}}},description:"Accessible label for a cell, defaulting to `Digit {n} of {length}`.",defaultValue:{value:"(index, total) => `Digit ${index + 1} of ${total}`",computed:!1}}}}})))()}var w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{w=t(),l(),C(),T=n(),E={title:`Components/Otp`,component:S,tags:[`autodocs`],argTypes:{length:{control:`number`},mode:{control:`select`,options:[`numeric`,`alphanumeric`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},variant:{control:`select`,options:[`outlined`,`filled`]},shape:{control:`select`,options:[`rounded`,`pill`]},status:{control:`select`,options:[`default`,`warning`,`error`,`success`]},disabled:{control:`boolean`},autoFocus:{control:`boolean`}},args:{length:6,mode:`numeric`,size:`md`,variant:`outlined`,shape:`rounded`,status:`default`,disabled:!1,autoFocus:!1}},D={render:e=>(0,T.jsx)(S,{...e})},O={render:()=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Four boxes`}),(0,T.jsx)(S,{length:4})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Eight boxes`}),(0,T.jsx)(S,{length:8})]})]})},k={render:()=>(0,T.jsx)(`div`,{className:`flex flex-col gap-6`,children:[`sm`,`md`,`lg`].map(e=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary capitalize`,children:e}),(0,T.jsx)(S,{size:e})]},e))})},A={render:()=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Outlined`}),(0,T.jsx)(S,{variant:`outlined`})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Filled`}),(0,T.jsx)(S,{variant:`filled`})]})]})},j={render:()=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Rounded`}),(0,T.jsx)(S,{shape:`rounded`})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Pill`}),(0,T.jsx)(S,{shape:`pill`})]})]})},M={render:()=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Error`}),(0,T.jsx)(S,{status:`error`,defaultValue:`12`})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Warning`}),(0,T.jsx)(S,{status:`warning`,defaultValue:`12`})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Success`}),(0,T.jsx)(S,{status:`success`,defaultValue:`123456`})]})]})},N={render:()=>(0,T.jsx)(S,{disabled:!0,defaultValue:`123`})},P={render:()=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Four boxes, default groups of two`}),(0,T.jsx)(S,{length:4,separator:!0})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Six boxes, default groups of two`}),(0,T.jsx)(S,{length:6,separator:!0,defaultValue:`123`})]}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Six boxes, custom groups of three`}),(0,T.jsx)(S,{length:6,separator:3,defaultValue:`123`})]})]})},F={render:()=>(0,T.jsx)(S,{mode:`alphanumeric`,defaultValue:`A1`})},I={render:function(){let[e,t]=(0,w.useState)(``);return(0,T.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,T.jsx)(S,{length:6,onComplete:t}),(0,T.jsx)(`p`,{className:`text-sm text-tertiary`,"aria-live":`polite`,children:e===``?`Type or paste all six digits.`:`Completed code: ${e}`})]})}},L={render:function(){let[e,t]=(0,w.useState)(`12`);return(0,T.jsxs)(u,{controlId:`otp-demo`,max:6,current:e.length,status:e.length===6?`success`:`default`,children:[(0,T.jsx)(u.Label,{children:`Verification code`}),(0,T.jsx)(u.Content,{children:(0,T.jsx)(S,{length:6,value:e,onValueChange:t})}),(0,T.jsxs)(u.Footer,{children:[(0,T.jsx)(u.HelperText,{children:`Enter the 6-digit code sent to your phone.`}),(0,T.jsx)(u.Counter,{current:e.length,max:6})]})]})}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => <Otp {...args} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Four boxes</p>
        <Otp length={4} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Eight boxes</p>
        <Otp length={8} />
      </div>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as Size[]).map(size => <div className="flex flex-col gap-2" key={size}>
          <p className="text-sm text-tertiary capitalize">{size}</p>
          <Otp size={size} />
        </div>)}
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Outlined</p>
        <Otp variant="outlined" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Filled</p>
        <Otp variant="filled" />
      </div>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Rounded</p>
        <Otp shape="rounded" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Pill</p>
        <Otp shape="pill" />
      </div>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Error</p>
        <Otp status="error" defaultValue="12" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Warning</p>
        <Otp status="warning" defaultValue="12" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Success</p>
        <Otp status="success" defaultValue="123456" />
      </div>
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Otp disabled defaultValue="123" />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Four boxes, default groups of two</p>
        <Otp length={4} separator />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Six boxes, default groups of two</p>
        <Otp length={6} separator defaultValue="123" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-tertiary">Six boxes, custom groups of three</p>
        <Otp length={6} separator={3} defaultValue="123" />
      </div>
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Otp mode="alphanumeric" defaultValue="A1" />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: function CompleteDemo() {
    const [code, setCode] = useState("");
    return <div className="flex flex-col gap-3">
        <Otp length={6} onComplete={setCode} />
        <p className="text-sm text-tertiary" aria-live="polite">
          {code === "" ? "Type or paste all six digits." : \`Completed code: \${code}\`}
        </p>
      </div>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: function FieldDemo() {
    const [code, setCode] = useState("12");
    return <Field controlId="otp-demo" max={6} current={code.length} status={code.length === 6 ? "success" : "default"}>
        <Field.Label>Verification code</Field.Label>
        <Field.Content>
          <Otp length={6} value={code} onValueChange={setCode} />
        </Field.Content>
        <Field.Footer>
          <Field.HelperText>Enter the 6-digit code sent to your phone.</Field.HelperText>
          <Field.Counter current={code.length} max={6} />
        </Field.Footer>
      </Field>;
  }
}`,...L.parameters?.docs?.source}}},R=[`Default`,`Lengths`,`Sizes`,`Variants`,`Shapes`,`Statuses`,`Disabled`,`WithSeparator`,`Alphanumeric`,`WithOnComplete`,`InField`]})))()}z();export{F as Alphanumeric,D as Default,N as Disabled,L as InField,O as Lengths,j as Shapes,k as Sizes,M as Statuses,A as Variants,I as WithOnComplete,P as WithSeparator,R as __namedExportsOrder,E as default};