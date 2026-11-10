import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./button-BSiNW2bO.js";import{n as i,t as a}from"./use-file-select-ChqGbfVC.js";function o({accept:e,maxBytes:t,multiple:n,disabled:a,onFiles:o,onError:c,...l}){let{getInputProps:u,open:d}=i({accept:e,maxBytes:t,multiple:n,disabled:a,onFiles:o,onError:c});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`input`,{...u()}),(0,s.jsx)(r,{...l,type:`button`,disabled:a,onClick:d})]})}var s;function c(){return(c=e((()=>{n(),a(),s=t(),o.__docgenInfo={description:``,methods:[],displayName:`FileButton`,props:{accept:{required:!1,tsType:{name:`string`},description:``},maxBytes:{required:!1,tsType:{name:`number`},description:``},multiple:{required:!1,tsType:{name:`boolean`},description:``},onFiles:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(files: File[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`File`}],raw:`File[]`},name:`files`}],return:{name:`void`}}},description:``},onError:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(error: FileSelectError) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  code: FileSelectErrorCode;
  file: File;
  message: string;
}`,signature:{properties:[{key:`code`,value:{name:`union`,raw:`"type" | "size" | "count" | "totalSize"`,elements:[{name:`literal`,value:`"type"`},{name:`literal`,value:`"size"`},{name:`literal`,value:`"count"`},{name:`literal`,value:`"totalSize"`}],required:!0}},{key:`file`,value:{name:`File`,required:!0}},{key:`message`,value:{name:`string`,required:!0}}]}},name:`error`}],return:{name:`void`}}},description:``}}}})))()}var l,u,d,f,p,m,h;function g(){return(g=e((()=>{c(),l=t(),u={title:`Components/FileButton`,component:o,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`solid`,`subtle`,`outline`,`text`]},color:{control:`select`,options:[`brand`,`neutral`]},size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},disabled:{control:`boolean`},multiple:{control:`boolean`}},args:{variant:`solid`,color:`brand`,size:`md`}},d={render:e=>(0,l.jsx)(o,{...e,children:`Choose file`})},f={render:e=>(0,l.jsx)(o,{...e,multiple:!0,children:`Choose files`})},p={render:e=>(0,l.jsx)(o,{...e,variant:`outline`,color:`neutral`,children:`Upload`})},m={render:e=>(0,l.jsx)(o,{...e,disabled:!0,children:`Choose file`})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <FileButton {...args}>Choose file</FileButton>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <FileButton {...args} multiple>
      Choose files
    </FileButton>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <FileButton {...args} variant="outline" color="neutral">
      Upload
    </FileButton>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <FileButton {...args} disabled>
      Choose file
    </FileButton>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Multiple`,`Outline`,`Disabled`]})))()}g();export{d as Default,m as Disabled,f as Multiple,p as Outline,h as __namedExportsOrder,u as default};