import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./spinner-DsbQTAUd.js";var i,a,o,s,c,l;function u(){return(u=e((()=>{n(),i=t(),a={title:`Components/Spinner`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},color:{control:`select`,options:[`brand`,`neutral`,`inverse`]},strokeWidth:{control:`number`}},args:{size:`md`,color:`brand`,strokeWidth:12}},o={},s={render:e=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{...e,color:`brand`}),(0,i.jsx)(r,{...e,color:`neutral`}),(0,i.jsx)(`span`,{className:`bg-primary-inverse p-4`,children:(0,i.jsx)(r,{...e,color:`inverse`})})]})},c={render:e=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{...e,size:`sm`}),(0,i.jsx)(r,{...e,size:`md`}),(0,i.jsx)(r,{...e,size:`lg`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      <Spinner {...args} color="brand" />
      <Spinner {...args} color="neutral" />
      <span className="bg-primary-inverse p-4">
        <Spinner {...args} color="inverse" />
      </span>
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
}`,...c.parameters?.docs?.source}}},l=[`Default`,`Colors`,`Size`]})))()}u();export{s as Colors,o as Default,c as Size,l as __namedExportsOrder,a as default};