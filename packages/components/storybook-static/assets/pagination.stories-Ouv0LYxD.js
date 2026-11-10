import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./pagination-BrZjn_K4.js";function a(e){let[t,n]=(0,o.useState)(1);return(0,s.jsx)(i,{...e,page:t,onPageChange:n})}var o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{o=t(),r(),s=n(),c={title:`Components/Pagination`,component:i,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},color:{control:`select`,options:[`brand`,`neutral`,`inverse`]},siblingCount:{control:`number`},boundaryCount:{control:`number`},showEdges:{control:`boolean`},disabled:{control:`boolean`}},args:{total:10,size:`md`,color:`brand`,siblingCount:1,boundaryCount:1,showEdges:!1,disabled:!1}},l={render:e=>(0,s.jsx)(i,{...e,defaultPage:5})},u={name:`With first/last`,render:e=>(0,s.jsx)(i,{...e,defaultPage:5,showEdges:!0})},d={render:e=>(0,s.jsxs)(`div`,{className:`flex flex-col items-start gap-6`,children:[(0,s.jsx)(i,{...e,size:`sm`,defaultPage:5}),(0,s.jsx)(i,{...e,size:`md`,defaultPage:5}),(0,s.jsx)(i,{...e,size:`lg`,defaultPage:5})]})},f={render:e=>(0,s.jsxs)(`div`,{className:`flex flex-col items-start gap-6`,children:[(0,s.jsx)(i,{...e,color:`brand`,defaultPage:5}),(0,s.jsx)(i,{...e,color:`neutral`,defaultPage:5}),(0,s.jsx)(i,{...e,color:`inverse`,defaultPage:5})]})},p={render:e=>(0,s.jsx)(a,{...e})},m={render:e=>(0,s.jsx)(i,{...e,disabled:!0,defaultPage:5})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args} defaultPage={5} />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "With first/last",
  render: args => <Pagination {...args} defaultPage={5} showEdges />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col items-start gap-6">
      <Pagination {...args} size="sm" defaultPage={5} />
      <Pagination {...args} size="md" defaultPage={5} />
      <Pagination {...args} size="lg" defaultPage={5} />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col items-start gap-6">
      <Pagination {...args} color="brand" defaultPage={5} />
      <Pagination {...args} color="neutral" defaultPage={5} />
      <Pagination {...args} color="inverse" defaultPage={5} />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <ControlledPagination {...args} />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args} disabled defaultPage={5} />
}`,...m.parameters?.docs?.source}}},h=[`Default`,`WithEdges`,`Sizes`,`Colors`,`Controlled`,`Disabled`]})))()}g();export{f as Colors,p as Controlled,l as Default,m as Disabled,d as Sizes,u as WithEdges,h as __namedExportsOrder,c as default};