import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./field-DWHIWe24.js";import{n as a,t as o}from"./radio-D-FOH5uI.js";function s(){let[e,t]=(0,c.useState)(`economy`);return(0,l.jsx)(`div`,{className:`flex flex-col gap-4`,children:[{value:`economy`,label:`Economy`,description:`Standard seat with meal.`},{value:`business`,label:`Business`,description:`Extra legroom included.`}].map(n=>(0,l.jsx)(o,{name:`cabin`,value:n.value,label:n.label,description:n.description,checked:e===n.value,onCheckedChange:e=>{e&&t(n.value)}},n.value))})}var c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{c=t(),r(),a(),l=n(),u={title:`Components/Radio`,component:o,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},status:{control:`select`,options:[`default`,`warning`,`error`,`success`]},checked:{control:`boolean`},disabled:{control:`boolean`}},args:{size:`sm`,disabled:!1}},d={render:e=>(0,l.jsx)(o,{...e,name:`default`,"aria-label":`Default`})},f={render:()=>(0,l.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,l.jsx)(o,{size:`sm`,name:`size`,defaultChecked:!0,"aria-label":`Small`}),(0,l.jsx)(o,{size:`md`,name:`size`,"aria-label":`Medium`}),(0,l.jsx)(o,{size:`lg`,name:`size`,"aria-label":`Large`})]})},p={render:()=>(0,l.jsx)(s,{})},m={render:()=>(0,l.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,l.jsx)(o,{label:`Unavailable option`,name:`disabled`,disabled:!0}),(0,l.jsx)(o,{label:`Locked choice`,name:`disabled-locked`,defaultChecked:!0,disabled:!0})]})},h={render:()=>(0,l.jsxs)(i,{status:`error`,children:[(0,l.jsx)(i.Label,{children:`Cabin class`}),(0,l.jsx)(i.Content,{children:(0,l.jsx)(s,{})}),(0,l.jsx)(i.Footer,{children:(0,l.jsx)(i.HelperText,{children:`Pick a cabin to continue.`})})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <Radio {...args} name="default" aria-label="Default" />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <Radio size="sm" name="size" defaultChecked aria-label="Small" />
      <Radio size="md" name="size" aria-label="Medium" />
      <Radio size="lg" name="size" aria-label="Large" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <CabinGroup />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Radio label="Unavailable option" name="disabled" disabled />
      <Radio label="Locked choice" name="disabled-locked" defaultChecked disabled />
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Field status="error">
      <Field.Label>Cabin class</Field.Label>
      <Field.Content>
        <CabinGroup />
      </Field.Content>
      <Field.Footer>
        <Field.HelperText>Pick a cabin to continue.</Field.HelperText>
      </Field.Footer>
    </Field>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Sizes`,`Group`,`Disabled`,`InField`]})))()}_();export{d as Default,m as Disabled,p as Group,h as InField,f as Sizes,g as __namedExportsOrder,u as default};