import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./progress-bar-BVWDMuGq.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{n(),i=t(),a={title:`Components/ProgressBar`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{value:{control:{type:`range`,min:0,max:100}},max:{control:`number`},shape:{control:`select`,options:[`bar`,`circle`,`semi`]},size:{control:`select`,options:[`2xs`,`xs`,`sm`,`md`,`lg`]},color:{control:`select`,options:[`brand`,`neutral`,`success`,`warning`,`error`]},indeterminate:{control:`boolean`},showValue:{control:`boolean`}},args:{value:45,max:100,shape:`bar`,size:`md`,color:`brand`,"aria-label":`Progress`},decorators:[e=>(0,i.jsx)(`div`,{className:`w-80`,children:(0,i.jsx)(e,{})})]},o={},s={render:e=>(0,i.jsxs)(`div`,{className:`flex items-center gap-8`,children:[(0,i.jsx)(r,{...e,shape:`bar`,className:`w-48`}),(0,i.jsx)(r,{...e,shape:`circle`,showValue:!0}),(0,i.jsx)(r,{...e,shape:`semi`,showValue:!0})]})},c={args:{shape:`circle`,showValue:!0,value:72}},l={args:{shape:`semi`,showValue:!0,value:72}},u={render:e=>(0,i.jsxs)(`div`,{className:`flex items-end gap-6`,children:[(0,i.jsx)(r,{...e,shape:`circle`,size:`2xs`,showValue:!0}),(0,i.jsx)(r,{...e,shape:`circle`,size:`xs`,showValue:!0}),(0,i.jsx)(r,{...e,shape:`circle`,size:`sm`,showValue:!0}),(0,i.jsx)(r,{...e,shape:`circle`,size:`md`,showValue:!0}),(0,i.jsx)(r,{...e,shape:`circle`,size:`lg`,showValue:!0})]})},d={render:e=>(0,i.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,i.jsx)(r,{...e,size:`2xs`}),(0,i.jsx)(r,{...e,size:`xs`}),(0,i.jsx)(r,{...e,size:`sm`}),(0,i.jsx)(r,{...e,size:`md`}),(0,i.jsx)(r,{...e,size:`lg`})]})},f={render:e=>(0,i.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,i.jsx)(r,{...e,color:`brand`,value:80}),(0,i.jsx)(r,{...e,color:`neutral`,value:65}),(0,i.jsx)(r,{...e,color:`success`,value:100}),(0,i.jsx)(r,{...e,color:`warning`,value:55}),(0,i.jsx)(r,{...e,color:`error`,value:30})]})},p={args:{label:`Uploading wedding-contract.pdf`,showValue:!0}},m={args:{indeterminate:!0,label:`Preparing upload`,size:`md`}},h={args:{value:3,max:8,showValue:!0,label:`Files processed`}},g={render:e=>(0,i.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,i.jsx)(r,{...e,shape:`circle`,size:`md`,value:2,max:6,showValue:!0,valueFormat:(e,t)=>`${e} of ${t}`}),(0,i.jsx)(r,{...e,value:2,max:6,showValue:!0,label:`Setup steps`,valueFormat:(e,t)=>`${e} of ${t}`})]})},_={render:e=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{...e,shape:`circle`,size:`2xs`,showValue:!0}),(0,i.jsx)(r,{...e,shape:`circle`,size:`xs`,showValue:!0}),(0,i.jsx)(r,{...e,size:`2xs`}),(0,i.jsx)(r,{...e,size:`xs`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-8">
      <ProgressBar {...args} shape="bar" className="w-48" />
      <ProgressBar {...args} shape="circle" showValue />
      <ProgressBar {...args} shape="semi" showValue />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    shape: "circle",
    showValue: true,
    value: 72
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    shape: "semi",
    showValue: true,
    value: 72
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-end gap-6">
      <ProgressBar {...args} shape="circle" size="2xs" showValue />
      <ProgressBar {...args} shape="circle" size="xs" showValue />
      <ProgressBar {...args} shape="circle" size="sm" showValue />
      <ProgressBar {...args} shape="circle" size="md" showValue />
      <ProgressBar {...args} shape="circle" size="lg" showValue />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4">
      <ProgressBar {...args} size="2xs" />
      <ProgressBar {...args} size="xs" />
      <ProgressBar {...args} size="sm" />
      <ProgressBar {...args} size="md" />
      <ProgressBar {...args} size="lg" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4">
      <ProgressBar {...args} color="brand" value={80} />
      <ProgressBar {...args} color="neutral" value={65} />
      <ProgressBar {...args} color="success" value={100} />
      <ProgressBar {...args} color="warning" value={55} />
      <ProgressBar {...args} color="error" value={30} />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Uploading wedding-contract.pdf",
    showValue: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    label: "Preparing upload",
    size: "md"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    value: 3,
    max: 8,
    showValue: true,
    label: "Files processed"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:'{\n  render: args => <div className="flex items-center gap-6">\n      <ProgressBar {...args} shape="circle" size="md" value={2} max={6} showValue valueFormat={(current, total) => `${current} of ${total}`} />\n      <ProgressBar {...args} value={2} max={6} showValue label="Setup steps" valueFormat={(current, total) => `${current} of ${total}`} />\n    </div>\n}',...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      <ProgressBar {...args} shape="circle" size="2xs" showValue />
      <ProgressBar {...args} shape="circle" size="xs" showValue />
      <ProgressBar {...args} size="2xs" />
      <ProgressBar {...args} size="xs" />
    </div>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Shapes`,`Circle`,`Semi`,`RingSizes`,`Sizes`,`Colors`,`WithLabel`,`Indeterminate`,`Max`,`CountValue`,`LoaderSized`]})))()}y();export{c as Circle,f as Colors,g as CountValue,o as Default,m as Indeterminate,_ as LoaderSized,h as Max,u as RingSizes,l as Semi,s as Shapes,d as Sizes,p as WithLabel,v as __namedExportsOrder,a as default};