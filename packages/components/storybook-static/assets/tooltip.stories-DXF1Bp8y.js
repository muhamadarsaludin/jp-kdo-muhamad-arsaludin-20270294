import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./createLucideIcon-b5K2wI9V.js";import{n as a,t as o}from"./info-CNatF7ut.js";import{n as s,t as c}from"./button-BSiNW2bO.js";import{n as l,t as u}from"./tooltip-DbXyqJcl.js";var d,f;function p(){return(p=e((()=>{r(),d={name:`circle-question-mark`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`help-circle`,`circle-help`]},d.node,f=i(d)})))()}var m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{m=t(),p(),a(),s(),l(),h=n(),g={title:`Components/Tooltip`,component:u,tags:[`autodocs`],argTypes:{defaultPosition:{control:`select`,options:[`top-start`,`top-center`,`top-end`,`bottom-start`,`bottom-center`,`bottom-end`,`left-start`,`left-center`,`left-end`,`right-start`,`right-center`,`right-end`]},showArrow:{control:`boolean`},defaultOpen:{control:`boolean`},disabled:{control:`boolean`},openDelay:{control:{type:`number`,min:0,step:50}},closeDelay:{control:{type:`number`,min:0,step:50}}},args:{defaultPosition:`top-center`,showArrow:!0,defaultOpen:!1,disabled:!1,openDelay:150,closeDelay:0}},_={render:e=>(0,h.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,h.jsx)(u,{...e,trigger:(0,h.jsx)(c,{variant:`outline`,children:`Hover me`}),children:`Tooltips appear on hover and focus.`})})},v={args:{defaultOpen:!0},render:e=>(0,h.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,h.jsx)(u,{...e,trigger:(0,h.jsx)(c,{variant:`outline`,children:`Hover me`}),children:`Tooltips appear on hover and focus.`})})},y={args:{defaultOpen:!0,showArrow:!1},render:e=>(0,h.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,h.jsx)(u,{...e,trigger:(0,h.jsx)(c,{variant:`outline`,children:`Hover me`}),children:`No arrow on this one.`})})},b={args:{defaultOpen:!0},render:e=>(0,h.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,h.jsx)(u,{...e,trigger:(0,h.jsx)(c.Icon,{variant:`ghost`,"aria-label":`More information`,children:(0,h.jsx)(o,{})}),children:`Icon-only triggers keep an accessible label.`})})},x={args:{defaultOpen:!0},render:e=>(0,h.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,h.jsx)(u,{...e,trigger:(0,h.jsx)(c.Icon,{variant:`ghost`,"aria-label":`About the business link`,children:(0,h.jsx)(o,{})}),children:`Used as your business's public address on Wedo Direct. You can change it anytime.`})})},S={args:{defaultOpen:!0,defaultPosition:`right-center`},render:({defaultPosition:e,...t})=>(0,h.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,h.jsxs)(u,{...t,defaultPosition:e,trigger:(0,h.jsx)(c,{variant:`outline`,children:`Anchor`}),children:[`Preferred placement: `,e,`. It flips when there is no room.`]})})},C={render:()=>(0,h.jsxs)(`div`,{className:`flex min-h-64 items-center justify-center gap-3`,children:[(0,h.jsx)(u,{trigger:(0,h.jsx)(c,{variant:`outline`,children:`Slow (600ms)`}),openDelay:600,children:`Shown after a longer hover.`}),(0,h.jsx)(u,{trigger:(0,h.jsx)(c.Icon,{variant:`outline`,"aria-label":`Fast`,children:(0,h.jsx)(f,{})}),openDelay:0,children:`Shown instantly.`})]})},w={render:function(){let[e,t]=(0,m.useState)(!1);return(0,h.jsxs)(`div`,{className:`flex min-h-64 items-center justify-center gap-3`,children:[(0,h.jsx)(c,{variant:`outline`,onClick:()=>t(e=>!e),children:e?`Hide tooltip`:`Show tooltip`}),(0,h.jsx)(u,{trigger:(0,h.jsx)(c,{variant:`subtle`,children:`Anchored`}),open:e,onOpenChange:t,children:`This tooltip is fully controlled by the parent.`})]})}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex min-h-64 items-center justify-center">
      <Tooltip {...args} trigger={<Button variant="outline">Hover me</Button>}>
        Tooltips appear on hover and focus.
      </Tooltip>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: args => <div className="flex min-h-64 items-center justify-center">
      <Tooltip {...args} trigger={<Button variant="outline">Hover me</Button>}>
        Tooltips appear on hover and focus.
      </Tooltip>
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true,
    showArrow: false
  },
  render: args => <div className="flex min-h-64 items-center justify-center">
      <Tooltip {...args} trigger={<Button variant="outline">Hover me</Button>}>
        No arrow on this one.
      </Tooltip>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: args => <div className="flex min-h-64 items-center justify-center">
      <Tooltip {...args} trigger={<Button.Icon variant="ghost" aria-label="More information">
            <Info />
          </Button.Icon>}>
        Icon-only triggers keep an accessible label.
      </Tooltip>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: args => <div className="flex min-h-64 items-center justify-center">
      <Tooltip {...args} trigger={<Button.Icon variant="ghost" aria-label="About the business link">
            <Info />
          </Button.Icon>}>
        Used as your business&apos;s public address on Wedo Direct. You can change it anytime.
      </Tooltip>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true,
    defaultPosition: "right-center"
  },
  render: ({
    defaultPosition,
    ...args
  }) => <div className="flex min-h-64 items-center justify-center">
      <Tooltip {...args} defaultPosition={defaultPosition} trigger={<Button variant="outline">Anchor</Button>}>
        Preferred placement: {defaultPosition}. It flips when there is no room.
      </Tooltip>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-64 items-center justify-center gap-3">
      <Tooltip trigger={<Button variant="outline">Slow (600ms)</Button>} openDelay={600}>
        Shown after a longer hover.
      </Tooltip>
      <Tooltip trigger={<Button.Icon variant="outline" aria-label="Fast">
            <HelpCircle />
          </Button.Icon>} openDelay={0}>
        Shown instantly.
      </Tooltip>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: function ControlledTooltip() {
    const [open, setOpen] = useState(false);
    return <div className="flex min-h-64 items-center justify-center gap-3">
        <Button variant="outline" onClick={() => setOpen(visible => !visible)}>
          {open ? "Hide tooltip" : "Show tooltip"}
        </Button>
        <Tooltip trigger={<Button variant="subtle">Anchored</Button>} open={open} onOpenChange={setOpen}>
          This tooltip is fully controlled by the parent.
        </Tooltip>
      </div>;
  }
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Open`,`WithoutArrow`,`WithIconTrigger`,`WithLongCopy`,`Placement`,`WithDelay`,`Controlled`]})))()}E();export{w as Controlled,_ as Default,v as Open,S as Placement,C as WithDelay,b as WithIconTrigger,x as WithLongCopy,y as WithoutArrow,T as __namedExportsOrder,g as default};