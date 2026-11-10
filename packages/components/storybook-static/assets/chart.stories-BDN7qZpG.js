import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./cn-BksUxDMQ.js";import{a,c as o,d as s,f as c,i as l,l as u,n as d,o as f,p,r as m,s as h,t as g}from"./chart.variants-BAJOBDvS.js";function _(e=640){let t=(0,v.useRef)(null),[n,r]=(0,v.useState)(e);return(0,v.useEffect)(()=>{let n=t.current;if(n===null)return;let i=()=>{let t=n.getBoundingClientRect().width;r(t>0?t:e)};if(i(),typeof ResizeObserver>`u`)return window.addEventListener(`resize`,i),()=>window.removeEventListener(`resize`,i);let a=new ResizeObserver(i);return a.observe(n),()=>a.disconnect()},[e]),{elementRef:t,width:n}}var v;function y(){return(y=e((()=>{v=t()})))()}function b(e){return String(Number.isInteger(e)?e:Number(e.toFixed(2)))}function x({type:e,data:t,color:n,curve:r,width:i,height:a,showGrid:l,showAxis:f,min:m,max:_,formatValue:v,gradientId:y,ariaLabel:b}){let x=f?E:D,S={left:x.left,top:x.top,width:Math.max(i-x.left-x.right,0),height:Math.max(a-x.top-x.bottom,0)},C=t.map(e=>e.value),T=s(m??Math.min(0,...C),_??Math.max(0,...C)),k=g[n],A=t.map((e,n)=>({x:c(n,t.length,S.left,S.width),y:p(e.value,T.min,T.max,S.top,S.height)})),j=u(A,r),M=p(Math.min(Math.max(0,T.min),T.max),T.min,T.max,S.top,S.height),N=h(A,M,r),P=Math.max(1,Math.ceil(t.length/Math.max(1,Math.floor(S.width/O))));return(0,w.jsxs)(`svg`,{"data-slot":`chart-svg`,role:`img`,"aria-label":b,width:i,height:a,viewBox:`0 0 ${i} ${a}`,className:`block`,children:[f?T.ticks.map(e=>{let t=p(e,T.min,T.max,S.top,S.height);return(0,w.jsxs)(`g`,{children:[l?(0,w.jsx)(`line`,{"data-slot":`chart-grid`,x1:S.left,x2:S.left+S.width,y1:t,y2:t,className:`stroke-secondary`,strokeOpacity:.6,strokeWidth:1}):null,(0,w.jsx)(`text`,{x:S.left-8,y:t,textAnchor:`end`,dominantBaseline:`middle`,fontSize:11,className:`fill-tertiary`,children:v(e)})]},e)}):null,e===`area`?(0,w.jsx)(`defs`,{children:(0,w.jsxs)(`linearGradient`,{id:y,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,w.jsx)(`stop`,{offset:`5%`,stopColor:d[n],stopOpacity:.32}),(0,w.jsx)(`stop`,{offset:`95%`,stopColor:d[n],stopOpacity:.02})]})}):null,(0,w.jsxs)(`g`,{"data-slot":`chart-series`,className:k,children:[e===`bar`?t.map((e,n)=>{let r=o(n,t.length,e.value,T.min,T.max,S);return(0,w.jsx)(`rect`,{x:r.x,y:r.y,width:r.width,height:r.height,rx:r.radius,fill:`currentColor`},`${e.label}-${n}`)}):null,e===`area`?(0,w.jsx)(`path`,{"data-slot":`chart-area`,d:N,fill:`url(#${y})`,stroke:`none`}):null,e===`line`||e===`area`?(0,w.jsx)(`path`,{"data-slot":`chart-line`,d:j,fill:`none`,stroke:`currentColor`,strokeWidth:1.75,strokeLinecap:`round`,strokeLinejoin:`round`}):null]}),f?t.map((n,r)=>{if(r%P!==0)return null;let i=e===`bar`?S.left+S.width/t.length*(r+.5):c(r,t.length,S.left,S.width);return(0,w.jsx)(`text`,{x:i,y:a-6,textAnchor:`middle`,dominantBaseline:`middle`,fontSize:11,className:`fill-tertiary`,children:n.label},`${n.label}-${r}`)}):null]})}function S({type:e,data:t,colors:n,width:r,height:o,showLegend:s,ariaLabel:c}){let l=n&&n.length>0?n:m,u=Math.max(80,Math.min(o,r-(s?k:0))),d=u/2,p=d,h=u/2,_=Math.max(d-4,0),v=e===`donut`?_*.6:0,y=t.reduce((e,t)=>e+Math.max(t.value,0),0),b=a(t.map(e=>e.value));return(0,w.jsxs)(`div`,{"data-slot":`chart-figure`,className:`flex w-full items-center gap-6`,children:[(0,w.jsx)(`svg`,{"data-slot":`chart-svg`,role:`img`,"aria-label":c,width:u,height:u,viewBox:`0 0 ${u} ${u}`,className:`block shrink-0`,children:t.map((e,t)=>{let n=b[t];if(!n||n.end-n.start<=0)return null;let r=l[t%l.length]??`brand`;return(0,w.jsx)(`path`,{"data-slot":`chart-segment`,d:f(p,h,_,v,n.start,n.end),fill:`currentColor`,className:g[r]},`${e.label}-${t}`)})}),s?(0,w.jsx)(`ul`,{"data-slot":`chart-legend`,className:`flex min-w-0 flex-1 flex-col gap-2 text-sm`,children:t.map((e,t)=>{let n=l[t%l.length]??`brand`,r=y>0?Math.round(Math.max(e.value,0)/y*100):0;return(0,w.jsxs)(`li`,{className:`flex items-center gap-2`,children:[(0,w.jsx)(`span`,{className:i(`size-2.5 shrink-0 rounded-full bg-current`,g[n]),"aria-hidden":`true`}),(0,w.jsx)(`span`,{className:`min-w-0 flex-1 truncate text-primary`,children:e.label}),(0,w.jsxs)(`span`,{className:`shrink-0 text-tertiary tabular-nums`,children:[r,`%`]})]},`${e.label}-${t}`)})}):null]})}var C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{C=t(),r(),y(),l(),w=n(),T=240,E={top:8,right:8,bottom:24,left:44},D={top:8,right:8,bottom:8,left:8},O=64,k=168,A=(0,C.forwardRef)(function({type:e=`line`,data:t,color:n=`brand`,colors:r,curve:a=`smooth`,height:o=T,showGrid:s=!0,showAxis:c=!0,showLegend:l=!0,min:u,max:d,formatValue:f=b,className:p,"aria-label":m=`Chart`,...h},g){let{elementRef:v,width:y}=_(),E=`chart-gradient-${(0,C.useId)().replace(/:/g,``)}`;return(0,w.jsx)(`div`,{ref:e=>{v.current=e,typeof g==`function`?g(e):g&&(g.current=e)},"data-slot":`chart`,"data-type":e,className:i(`w-full`,p),...h,children:e===`pie`||e===`donut`?S({type:e,data:t,colors:r,width:y,height:o,showLegend:l,ariaLabel:m}):x({type:e,data:t,color:n,curve:a,width:y,height:o,showGrid:s,showAxis:c,min:u,max:d,formatValue:f,gradientId:E,ariaLabel:m})})}),A.displayName=`Chart`,A.__docgenInfo={description:``,methods:[],displayName:`Chart`,props:{type:{required:!1,tsType:{name:`union`,raw:`"line" | "area" | "bar" | "pie" | "donut"`,elements:[{name:`literal`,value:`"line"`},{name:`literal`,value:`"area"`},{name:`literal`,value:`"bar"`},{name:`literal`,value:`"pie"`},{name:`literal`,value:`"donut"`}]},description:"`line`, `area`, `bar` (cartesian) or `pie`/`donut` (circular). Defaults to `line`.",defaultValue:{value:`"line"`,computed:!1}},data:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ label: string; value: number }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]}}],raw:`ChartDatum[]`},description:``},color:{required:!1,tsType:{name:`unknown[number]`,raw:`(typeof chartColors)[number]`},description:"Single-series color. Ignored by `pie`/`donut`, which use `colors`.",defaultValue:{value:`"brand"`,computed:!1}},colors:{required:!1,tsType:{name:`Array`,elements:[{name:`unknown[number]`,raw:`(typeof chartColors)[number]`}],raw:`ChartColor[]`},description:"Category colors for `pie`/`donut`. Defaults to the chart palette; cycles when shorter."},curve:{required:!1,tsType:{name:`union`,raw:`"linear" | "smooth" | "step"`,elements:[{name:`literal`,value:`"linear"`},{name:`literal`,value:`"smooth"`},{name:`literal`,value:`"step"`}]},description:'Line shape for `line`/`area`: a smooth cubic, a step, or straight segments. Defaults to `"smooth"`.',defaultValue:{value:`"smooth"`,computed:!1}},height:{required:!1,tsType:{name:`number`},description:"Plot height in pixels. Defaults to `240`.",defaultValue:{value:`240`,computed:!1}},showGrid:{required:!1,tsType:{name:`boolean`},description:"Draws horizontal gridlines (cartesian types). Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},showAxis:{required:!1,tsType:{name:`boolean`},description:"Draws the y tick labels and x category labels (cartesian types). Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},showLegend:{required:!1,tsType:{name:`boolean`},description:"Shows the label list next to a `pie`/`donut`. Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},min:{required:!1,tsType:{name:`number`},description:"Lower bound of the value axis. Defaults to `0` (or the smallest value when negative)."},max:{required:!1,tsType:{name:`number`},description:"Upper bound of the value axis. Defaults to `0` (or the largest value)."},formatValue:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => string`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`string`}}},description:`Formats y tick labels (cartesian). Defaults to the raw number.`,defaultValue:{value:`function defaultFormat(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}`,computed:!1}},"aria-label":{defaultValue:{value:`"Chart"`,computed:!1},required:!1}}}})))()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{j(),M=n(),N={title:`Components/Chart`,component:A,parameters:{layout:`centered`},decorators:[e=>(0,M.jsx)(`div`,{className:`w-[560px]`,children:e()})],tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`line`,`area`,`bar`,`pie`,`donut`]},color:{control:`select`,options:[`brand`,`neutral`,`info`,`success`,`warning`,`error`]},curve:{control:`select`,options:[`smooth`,`linear`,`step`]}},args:{type:`line`,color:`brand`,curve:`smooth`,height:240,showGrid:!0,showAxis:!0,showLegend:!0}},P=[{label:`Jan`,value:120},{label:`Feb`,value:210},{label:`Mar`,value:180},{label:`Apr`,value:320},{label:`May`,value:280},{label:`Jun`,value:410}],F=[{label:`Confirmed`,value:248},{label:`Pending`,value:96},{label:`Declined`,value:24}],I=[{label:`W1`,value:-40},{label:`W2`,value:80},{label:`W3`,value:20},{label:`W4`,value:160}],L={args:{data:P}},R={args:{type:`area`,data:P}},z={args:{type:`bar`,data:P,color:`info`}},B={args:{type:`pie`,data:F}},V={args:{type:`donut`,data:F}},H={name:`Custom colors`,args:{type:`donut`,data:P,colors:[`brand`,`info`,`success`,`warning`,`error`,`neutral`]}},U={name:`With negative values`,args:{type:`bar`,data:I,color:`success`,formatValue:e=>`$${e}`}},W={name:`Without axis`,args:{type:`area`,data:P,showAxis:!1,showGrid:!1,height:160}},G={name:`Step curve`,args:{type:`area`,data:P,curve:`step`}},K={name:`Linear curve`,args:{type:`line`,data:P,curve:`linear`}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    data: guestsPerMonth
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    type: "area",
    data: guestsPerMonth
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    type: "bar",
    data: guestsPerMonth,
    color: "info"
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    type: "pie",
    data: rsvpStatus
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    type: "donut",
    data: rsvpStatus
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: "Custom colors",
  args: {
    type: "donut",
    data: guestsPerMonth,
    colors: ["brand", "info", "success", "warning", "error", "neutral"]
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: "With negative values",
  args: {
    type: "bar",
    data: revenue,
    color: "success",
    formatValue: (value: number) => \`$\${value}\`
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: "Without axis",
  args: {
    type: "area",
    data: guestsPerMonth,
    showAxis: false,
    showGrid: false,
    height: 160
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: "Step curve",
  args: {
    type: "area",
    data: guestsPerMonth,
    curve: "step"
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "Linear curve",
  args: {
    type: "line",
    data: guestsPerMonth,
    curve: "linear"
  }
}`,...K.parameters?.docs?.source}}},q=[`Line`,`Area`,`Bar`,`Pie`,`Donut`,`CustomColors`,`WithNegativeValues`,`WithoutAxis`,`StepCurve`,`LinearCurve`]})))()}J();export{R as Area,z as Bar,H as CustomColors,V as Donut,L as Line,K as LinearCurve,B as Pie,G as StepCurve,U as WithNegativeValues,W as WithoutAxis,q as __namedExportsOrder,N as default};