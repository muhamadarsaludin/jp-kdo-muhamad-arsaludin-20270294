import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./createLucideIcon-b5K2wI9V.js";import{n as a,t as o}from"./arrow-up-BjBh2-_b.js";import{n as s,t as c}from"./building-complex-CBDBmrW-.js";import{n as l,t as u}from"./users-Pr-zF4po.js";import{n as d,t as f}from"./cn-BksUxDMQ.js";var p,m;function h(){return(h=e((()=>{r(),p={name:`arrow-down`,size:24,node:[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m19 12-7 7-7-7`,key:`1idqje`}]]},p.node,m=i(p)})))()}var g,_;function v(){return(v=e((()=>{r(),g={name:`calendar-check`,size:24,node:[[`path`,{d:`M8 2v3`,key:`1ioesn`}],[`path`,{d:`M16 2v3`,key:`otl347`}],[`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,key:`h1oib`}],[`path`,{d:`M3 9h18`,key:`1pudct`}],[`path`,{d:`m9 15 2 2 4-4`,key:`1grp1n`}]]},g.node,_=i(g)})))()}var y,b;function x(){return(x=e((()=>{r(),y={name:`wallet`,size:24,node:[[`path`,{d:`M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1`,key:`18etb6`}],[`path`,{d:`M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4`,key:`xoc0q4`}]]},y.node,b=i(y)})))()}var S,C;function w(){return(w=e((()=>{S={brand:`bg-brand-muted-primary text-brand-primary`,neutral:`bg-secondary text-tertiary`,info:`bg-info-muted-primary text-info-primary`,success:`bg-success-muted-primary text-success-primary`,warning:`bg-warning-muted-primary text-warning-primary`,error:`bg-error-muted-primary text-error-primary`},C={up:`bg-success-muted-primary text-success-primary`,down:`bg-error-muted-primary text-error-primary`}})))()}function T(e){return e.direction===void 0?e.value<0?`down`:`up`:e.direction}var E,D,O;function k(){return(k=e((()=>{E=t(),d(),h(),a(),w(),D=n(),O=(0,E.forwardRef)(function({label:e,value:t,icon:n,color:r=`brand`,trend:i,className:a,...s},c){let l=i?T(i):`up`,u=l===`down`?m:o;return(0,D.jsxs)(`div`,{ref:c,"data-slot":`stat-card`,className:f(`flex flex-col gap-3 rounded-xl border border-secondary bg-primary p-5`,a),...s,children:[(0,D.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,D.jsxs)(`div`,{className:`min-w-0`,children:[(0,D.jsx)(`p`,{"data-slot":`stat-label`,className:`text-sm text-tertiary`,children:e}),(0,D.jsx)(`p`,{"data-slot":`stat-value`,className:`mt-1 font-semibold text-2xl text-primary tabular-nums`,children:t})]}),n==null?null:(0,D.jsx)(`span`,{"data-slot":`stat-icon`,"aria-hidden":`true`,className:f(`flex size-10 shrink-0 items-center justify-center rounded-lg [&>svg]:size-5`,S[r]),children:n})]}),i==null?null:(0,D.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,D.jsxs)(`span`,{"data-slot":`stat-trend`,"data-direction":l,className:f(`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs`,C[l]),children:[(0,D.jsx)(u,{className:`size-3.5`,"aria-hidden":`true`}),(0,D.jsxs)(`span`,{className:`tabular-nums`,children:[Math.abs(i.value),`%`]})]}),i.label==null?null:(0,D.jsx)(`span`,{"data-slot":`stat-trend-label`,className:`text-sm text-tertiary`,children:i.label})]})]})}),O.displayName=`StatCard`,O.__docgenInfo={description:``,methods:[],displayName:`StatCard`,props:{label:{required:!0,tsType:{name:`ReactNode`},description:`Small caption above the value.`},value:{required:!0,tsType:{name:`ReactNode`},description:`The headline figure (already formatted).`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Visual in the framed slot at the top-right.`},color:{required:!1,tsType:{name:`unknown[number]`,raw:`(typeof statCardColors)[number]`},description:"Tints the icon frame. Defaults to `brand`.",defaultValue:{value:`"brand"`,computed:!1}},trend:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** Percentage delta; its sign drives the direction when \`direction\` is omitted. */
  value: number;
  /** Arrow/color direction. Defaults from the sign of \`value\`. */
  direction?: StatCardTrendDirection;
  /** Supporting text shown next to the delta (e.g. "vs last week"). */
  label?: string;
}`,signature:{properties:[{key:`value`,value:{name:`number`,required:!0},description:"Percentage delta; its sign drives the direction when `direction` is omitted."},{key:`direction`,value:{name:`unknown[number]`,raw:`(typeof statCardTrendDirections)[number]`,required:!1},description:"Arrow/color direction. Defaults from the sign of `value`."},{key:`label`,value:{name:`string`,required:!1},description:`Supporting text shown next to the delta (e.g. "vs last week").`}]}},description:`Delta pill shown in the footer.`}}}})))()}var A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{s(),v(),l(),x(),k(),A=n(),j={title:`Components/StatCard`,component:O,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{color:{control:`select`,options:[`brand`,`neutral`,`info`,`success`,`warning`,`error`]}},args:{label:`Total guests`,value:`1,248`,color:`brand`}},M={render:e=>(0,A.jsx)(`div`,{className:`w-64`,children:(0,A.jsx)(O,{...e,icon:(0,A.jsx)(u,{})})})},N={name:`With trend`,render:e=>(0,A.jsx)(`div`,{className:`w-64`,children:(0,A.jsx)(O,{...e,icon:(0,A.jsx)(_,{}),trend:{value:12.5,label:`vs last week`}})})},P={name:`Trend down`,render:e=>(0,A.jsx)(`div`,{className:`w-64`,children:(0,A.jsx)(O,{...e,label:`Declined RSVPs`,value:`24`,color:`error`,icon:(0,A.jsx)(u,{}),trend:{value:-8}})})},F={render:e=>(0,A.jsxs)(`div`,{className:`flex flex-wrap gap-4`,children:[(0,A.jsx)(`div`,{className:`w-64`,children:(0,A.jsx)(O,{...e,color:`brand`,icon:(0,A.jsx)(c,{})})}),(0,A.jsx)(`div`,{className:`w-64`,children:(0,A.jsx)(O,{...e,label:`Revenue`,value:`$42,000`,color:`success`,icon:(0,A.jsx)(b,{})})}),(0,A.jsx)(`div`,{className:`w-64`,children:(0,A.jsx)(O,{...e,label:`Pending invites`,value:`96`,color:`warning`,icon:(0,A.jsx)(u,{})})})]})},I={render:()=>(0,A.jsxs)(`div`,{className:`grid w-[560px] grid-cols-2 gap-4`,children:[(0,A.jsx)(O,{label:`Total guests`,value:`1,248`,icon:(0,A.jsx)(u,{}),trend:{value:12.5}}),(0,A.jsx)(O,{label:`Confirmed`,value:`912`,color:`success`,icon:(0,A.jsx)(_,{}),trend:{value:6.2}}),(0,A.jsx)(O,{label:`Declined`,value:`24`,color:`error`,icon:(0,A.jsx)(u,{}),trend:{value:-3.1}}),(0,A.jsx)(O,{label:`Revenue`,value:`$42,000`,color:`info`,icon:(0,A.jsx)(b,{}),trend:{value:9.4}})]})},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-64">
      <StatCard {...args} icon={<Users />} />
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: "With trend",
  render: args => <div className="w-64">
      <StatCard {...args} icon={<CalendarCheck />} trend={{
      value: 12.5,
      label: "vs last week"
    }} />
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: "Trend down",
  render: args => <div className="w-64">
      <StatCard {...args} label="Declined RSVPs" value="24" color="error" icon={<Users />} trend={{
      value: -8
    }} />
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap gap-4">
      <div className="w-64">
        <StatCard {...args} color="brand" icon={<Building2 />} />
      </div>
      <div className="w-64">
        <StatCard {...args} label="Revenue" value="$42,000" color="success" icon={<Wallet />} />
      </div>
      <div className="w-64">
        <StatCard {...args} label="Pending invites" value="96" color="warning" icon={<Users />} />
      </div>
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-[560px] grid-cols-2 gap-4">
      <StatCard label="Total guests" value="1,248" icon={<Users />} trend={{
      value: 12.5
    }} />
      <StatCard label="Confirmed" value="912" color="success" icon={<CalendarCheck />} trend={{
      value: 6.2
    }} />
      <StatCard label="Declined" value="24" color="error" icon={<Users />} trend={{
      value: -3.1
    }} />
      <StatCard label="Revenue" value="$42,000" color="info" icon={<Wallet />} trend={{
      value: 9.4
    }} />
    </div>
}`,...I.parameters?.docs?.source}}},L=[`Default`,`WithTrend`,`TrendDown`,`Colors`,`Grid`]})))()}R();export{F as Colors,M as Default,I as Grid,P as TrendDown,N as WithTrend,L as __namedExportsOrder,j as default};