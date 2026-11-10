import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./cn-BksUxDMQ.js";function i({className:e,shape:t=`rounded`,...n}){return(0,a.jsx)(`div`,{"aria-hidden":`true`,"data-slot":`skeleton`,className:r(`animate-pulse bg-quaternary`,o[t],e),...n})}var a,o;function s(){return(s=e((()=>{n(),a=t(),o={rounded:`rounded-xl`,pill:`rounded-full`},i.__docgenInfo={description:``,methods:[],displayName:`Skeleton`,props:{shape:{required:!1,tsType:{name:`union`,raw:`"rounded" | "pill"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"pill"`}]},description:``,defaultValue:{value:`"rounded"`,computed:!1}}}}})))()}var c,l,u,d,f,p;function m(){return(m=e((()=>{s(),c=t(),l={title:`Components/Skeleton`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{shape:{control:`select`,options:[`rounded`,`pill`]}},args:{shape:`rounded`}},u={render:e=>(0,c.jsx)(i,{...e,className:`h-10 w-64`})},d={render:e=>(0,c.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,c.jsx)(i,{...e,shape:`rounded`,className:`h-10 w-32`}),(0,c.jsx)(i,{...e,shape:`pill`,className:`h-10 w-32`})]})},f={render:e=>(0,c.jsxs)(`div`,{className:`flex w-64 items-center gap-3`,children:[(0,c.jsx)(i,{...e,shape:`pill`,className:`size-12 shrink-0`}),(0,c.jsxs)(`div`,{className:`flex flex-1 flex-col gap-2`,children:[(0,c.jsx)(i,{...e,className:`h-3 w-3/4`}),(0,c.jsx)(i,{...e,className:`h-3 w-1/2`})]})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <Skeleton {...args} className="h-10 w-64" />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      <Skeleton {...args} shape="rounded" className="h-10 w-32" />
      <Skeleton {...args} shape="pill" className="h-10 w-32" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex w-64 items-center gap-3">
      <Skeleton {...args} shape="pill" className="size-12 shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton {...args} className="h-3 w-3/4" />
        <Skeleton {...args} className="h-3 w-1/2" />
      </div>
    </div>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Shapes`,`ProfileCard`]})))()}m();export{u as Default,f as ProfileCard,d as Shapes,p as __namedExportsOrder,l as default};