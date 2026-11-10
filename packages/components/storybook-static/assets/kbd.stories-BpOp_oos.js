import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./button-BSiNW2bO.js";import{n as i,t as a}from"./kbd-vddY5m67.js";function o({children:e}){return(0,s.jsx)(`div`,{className:`flex flex-wrap items-center gap-2`,children:e})}var s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{n(),i(),s=t(),c={title:`Components/Kbd`,component:a,tags:[`autodocs`]},l={render:e=>(0,s.jsx)(a,{...e,children:`⌘K`})},u={name:`Modifier keys`,render:()=>(0,s.jsxs)(o,{children:[(0,s.jsx)(a,{children:`⌘`}),(0,s.jsx)(a,{children:`⇧`}),(0,s.jsx)(a,{children:`⌥`}),(0,s.jsx)(a,{children:`⌃`}),(0,s.jsx)(a,{children:`Ctrl`})]})},d={render:()=>(0,s.jsxs)(a.Group,{children:[(0,s.jsx)(a,{children:`Ctrl`}),(0,s.jsx)(`span`,{"aria-hidden":`true`,children:`+`}),(0,s.jsx)(a,{children:`B`})]})},f={render:()=>(0,s.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Press `,(0,s.jsx)(a,{children:`⌘`}),` `,(0,s.jsx)(a,{children:`K`}),` to search.`]})},p={name:`In button`,render:()=>(0,s.jsx)(r,{variant:`outline`,endContent:(0,s.jsx)(a,{children:`⌘K`}),children:`Search`})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <Kbd {...args}>⌘K</Kbd>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Modifier keys",
  render: () => <Row>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⌃</Kbd>
      <Kbd>Ctrl</Kbd>
    </Row>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Kbd.Group>
      <Kbd>Ctrl</Kbd>
      <span aria-hidden="true">+</span>
      <Kbd>B</Kbd>
    </Kbd.Group>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <p className="text-sm text-tertiary">
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
    </p>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "In button",
  render: () => <Button variant="outline" endContent={<Kbd>⌘K</Kbd>}>
      Search
    </Button>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`ModifierKeys`,`Group`,`Inline`,`InButton`]})))()}h();export{l as Default,d as Group,p as InButton,f as Inline,u as ModifierKeys,m as __namedExportsOrder,c as default};