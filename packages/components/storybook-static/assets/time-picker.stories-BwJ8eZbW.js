import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./createLucideIcon-b5K2wI9V.js";import{n as a,t as o}from"./input-CyOsgzUo.js";import{n as s,t as c}from"./button-BSiNW2bO.js";import{c as l,i as u,n as d,r as f,t as p}from"./time-picker-BxmzMikD.js";var m,h;function g(){return(g=e((()=>{r(),m={name:`clock`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]},m.node,h=i(m)})))()}function _(){let[e,t]=(0,x.useState)(`09:30`);return(0,S.jsx)(p,{value:e,onValueChange:t,trigger:(0,S.jsx)(c,{variant:`outline`,startContent:(0,S.jsx)(h,{}),children:f(e,`24h`)||`Pick a time`})})}function v(){let[e,t]=(0,x.useState)(`14:30`),[n,r]=(0,x.useState)(null),[i,a]=(0,x.useState)(!1),s=(0,x.useRef)(e);return s.current=e,(0,S.jsx)(p,{format:`12h`,value:e,onValueChange:t,open:i,onOpenChange:a,autoFocusPanel:!1,trigger:(0,S.jsx)(o,{"aria-label":`Time`,placeholder:`h:mm AM/PM`,className:`w-56`,endContent:(0,S.jsx)(h,{}),value:n??f(e,`12h`),onFocus:()=>r(f(s.current,`12h`)),onBlur:()=>r(null),onClear:()=>{s.current=null,t(null),r(``)},onKeyDown:e=>{if(e.key!==`Enter`)return;e.preventDefault();let i=n===null?null:l(n);i===null?r(null):(s.current=i,t(i),r(null),a(!1))},onValueChange:r})})}function y(){let[e,t]=(0,x.useState)(`14:30`),[n,r]=(0,x.useState)(!1);return(0,S.jsx)(p,{format:`12h`,value:e,onValueChange:t,open:n,onOpenChange:r,trigger:(0,S.jsx)(o,{"aria-label":`Time`,placeholder:`HH:mm`,className:`w-56`,readOnly:!0,clearable:!1,endContent:(0,S.jsx)(h,{}),value:f(e,`12h`),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),r(!n))}})})}function b(){let[e,t]=(0,x.useState)(`09:30`);return(0,S.jsx)(p,{value:e,onValueChange:t,footer:(0,S.jsxs)(`div`,{className:`mt-1 flex items-center justify-between border-secondary border-t px-1 pt-2`,children:[(0,S.jsx)(`span`,{className:`text-tertiary text-xs`,children:f(e,`24h`)||`No time`}),(0,S.jsx)(c,{size:`xs`,variant:`text`,onClick:()=>t(null),children:`Reset`})]})})}var x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{x=t(),g(),s(),a(),d(),u(),S=n(),C={title:`Components/TimePicker`,component:p,tags:[`autodocs`],argTypes:{mode:{control:`inline-radio`,options:[`wheel`,`list`,`input`]},listAlign:{control:`inline-radio`,options:[`start`,`center`,`end`]},format:{control:`inline-radio`,options:[`24h`,`12h`]},showWheelLabels:{control:`boolean`},wheelLabelVariant:{control:`inline-radio`,options:[`full`,`short`]},locale:{control:`inline-radio`,options:[`en`,`id`]},disabled:{control:`boolean`},showFooter:{control:`boolean`},autoFocusPanel:{control:`boolean`}}},w=Array.from({length:24},(e,t)=>({value:`${String(t).padStart(2,`0`)}:00`})),T=[{value:`09:00`},{value:`09:30`},{value:`10:00`,disabled:!0},{value:`10:30`},{value:`13:00`},{value:`13:30`}],E={render:()=>(0,S.jsx)(p,{defaultValue:`09:30`})},D={name:`12-hour format`,render:()=>(0,S.jsx)(p,{format:`12h`,defaultValue:`14:30`})},O={name:`Wheel without labels`,render:()=>(0,S.jsx)(p,{showWheelLabels:!1,defaultValue:`09:30`})},k={name:`Wheel short labels`,render:()=>(0,S.jsx)(p,{wheelLabelVariant:`short`,defaultValue:`09:30`})},A={name:`Input (M3)`,render:()=>(0,S.jsx)(p,{mode:`input`,defaultValue:`09:30`})},j={name:`Input (M3, 12-hour)`,render:()=>(0,S.jsx)(p,{mode:`input`,format:`12h`,defaultValue:`14:30`})},M={render:()=>(0,S.jsx)(p,{mode:`list`,options:T,defaultValue:`09:30`})},N={name:`List centered (12-hour)`,render:()=>(0,S.jsx)(p,{mode:`list`,format:`12h`,listAlign:`center`,options:T,defaultValue:`09:30`})},P={name:`Long list`,render:()=>(0,S.jsx)(p,{mode:`list`,options:w,defaultValue:`09:00`})},F={name:`List generated (15 minutes)`,render:()=>(0,S.jsx)(p,{mode:`list`,minuteStep:15,defaultValue:`09:30`})},I={name:`Disabled hours and minutes`,render:()=>(0,S.jsx)(p,{defaultValue:`09:00`,disabledHours:[0,1,2,3,4,5,6,7,20,21,22,23],disabledMinutes:e=>e===12?[0,30]:[]})},L={render:()=>(0,S.jsx)(p,{disabled:!0,defaultValue:`09:30`})},R={name:`Without footer`,render:()=>(0,S.jsx)(p,{showFooter:!1,defaultValue:`09:30`})},z={name:`Custom footer`,render:()=>(0,S.jsx)(b,{})},B={render:()=>(0,S.jsx)(p,{locale:`id`,defaultValue:`09:30`})},V={name:`Popover trigger`,render:()=>(0,S.jsx)(_,{})},H={name:`Popover open`,render:()=>(0,S.jsx)(`div`,{className:`flex min-h-96 items-start justify-center`,children:(0,S.jsx)(p,{defaultOpen:!0,defaultValue:`09:30`,trigger:(0,S.jsx)(c,{variant:`outline`,startContent:(0,S.jsx)(h,{}),children:`09:30`})})})},U={name:`Input trigger (typing)`,render:()=>(0,S.jsx)(v,{})},W={name:`Input trigger (readonly)`,render:()=>(0,S.jsx)(y,{})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <TimePicker defaultValue="09:30" />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "12-hour format",
  render: () => <TimePicker format="12h" defaultValue="14:30" />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: "Wheel without labels",
  render: () => <TimePicker showWheelLabels={false} defaultValue="09:30" />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Wheel short labels",
  render: () => <TimePicker wheelLabelVariant="short" defaultValue="09:30" />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: "Input (M3)",
  render: () => <TimePicker mode="input" defaultValue="09:30" />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: "Input (M3, 12-hour)",
  render: () => <TimePicker mode="input" format="12h" defaultValue="14:30" />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <TimePicker mode="list" options={listOptions} defaultValue="09:30" />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: "List centered (12-hour)",
  render: () => <TimePicker mode="list" format="12h" listAlign="center" options={listOptions} defaultValue="09:30" />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: "Long list",
  render: () => <TimePicker mode="list" options={longListOptions} defaultValue="09:00" />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: "List generated (15 minutes)",
  render: () => <TimePicker mode="list" minuteStep={15} defaultValue="09:30" />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: "Disabled hours and minutes",
  render: () => <TimePicker defaultValue="09:00" disabledHours={[0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]} disabledMinutes={hour => hour === 12 ? [0, 30] : []} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <TimePicker disabled defaultValue="09:30" />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: "Without footer",
  render: () => <TimePicker showFooter={false} defaultValue="09:30" />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: "Custom footer",
  render: () => <CustomFooterExample />
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <TimePicker locale="id" defaultValue="09:30" />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: "Popover trigger",
  render: () => <ButtonPopoverExample />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: "Popover open",
  render: () => <div className="flex min-h-96 items-start justify-center">
      <TimePicker defaultOpen defaultValue="09:30" trigger={<Button variant="outline" startContent={<Clock />}>
            09:30
          </Button>} />
    </div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: "Input trigger (typing)",
  render: () => <TypingInputExample />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: "Input trigger (readonly)",
  render: () => <ReadonlyInputExample />
}`,...W.parameters?.docs?.source}}},G=[`Default`,`TwelveHour`,`WheelWithoutLabels`,`WheelShortLabels`,`InputMode`,`InputModeTwelveHour`,`List`,`ListCentered`,`LongList`,`ListGenerated`,`DisabledTimes`,`Disabled`,`WithoutFooter`,`CustomFooter`,`Indonesian`,`PopoverTrigger`,`PopoverOpen`,`InputTriggerTyping`,`InputTriggerReadonly`]})))()}K();export{z as CustomFooter,E as Default,L as Disabled,I as DisabledTimes,B as Indonesian,A as InputMode,j as InputModeTwelveHour,W as InputTriggerReadonly,U as InputTriggerTyping,M as List,N as ListCentered,F as ListGenerated,P as LongList,H as PopoverOpen,V as PopoverTrigger,D as TwelveHour,k as WheelShortLabels,O as WheelWithoutLabels,R as WithoutFooter,G as __namedExportsOrder,C as default};