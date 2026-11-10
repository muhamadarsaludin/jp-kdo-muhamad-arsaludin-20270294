import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./calendar-days-BPRvvtpT.js";import{n as a,t as o}from"./chevron-down-DMJ7MIjn.js";import{n as s,t as c}from"./input-CyOsgzUo.js";import{n as l,t as u}from"./cn-BksUxDMQ.js";import{n as d,t as f}from"./button-BSiNW2bO.js";import{n as p,t as m}from"./popover-vtaOQbw2.js";import{n as h,t as g}from"./list-BG5UUClw.js";function _({selectedKeys:e,defaultSelectedKeys:t,onSelectionChange:n,className:r=`w-56`}){return(0,y.jsx)(`div`,{className:u(`p-1.5`,r),children:(0,y.jsx)(g,{items:[{key:`draft`,label:`Draft`},{key:`scheduled`,label:`Scheduled`},{key:`published`,label:`Published`},{key:`archived`,label:`Archived`}],"aria-label":`Event status`,selectionMode:`single`,selectionIndicator:`checkmark`,selectionPosition:`end`,chevronPosition:`none`,required:!0,selectedKeys:e,defaultSelectedKeys:t,onSelectionChange:n})})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{v=t(),l(),r(),a(),d(),s(),h(),p(),y=n(),b=[`top-start`,`top-center`,`top-end`,`bottom-start`,`bottom-center`,`bottom-end`,`left-start`,`left-center`,`left-end`,`right-start`,`right-center`,`right-end`],x={title:`Components/Popover`,component:m,tags:[`autodocs`],argTypes:{defaultPosition:{control:`select`,options:b},showArrow:{control:`boolean`},matchTriggerWidth:{control:`boolean`},defaultOpen:{control:`boolean`},disabled:{control:`boolean`}},args:{defaultPosition:`bottom-start`,showArrow:!1,matchTriggerWidth:!1,defaultOpen:!1,disabled:!1}},S={draft:`Draft`,scheduled:`Scheduled`,published:`Published`,archived:`Archived`},C=e=>S[String(e)]??``,w={render:()=>(0,y.jsx)(m,{trigger:(0,y.jsx)(f,{children:`Open tray`}),children:(0,y.jsx)(_,{defaultSelectedKeys:[`scheduled`]})})},T={render:()=>(0,y.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,y.jsx)(m,{trigger:(0,y.jsx)(f,{children:`Open tray`}),defaultOpen:!0,children:(0,y.jsx)(_,{defaultSelectedKeys:[`scheduled`]})})})},E={name:`Label and separator`,render:()=>(0,y.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,y.jsx)(m,{trigger:(0,y.jsx)(f,{children:`Filter events`}),defaultOpen:!0,children:(0,y.jsxs)(`div`,{className:`w-56 p-1`,children:[(0,y.jsx)(m.Label,{children:`Status`}),(0,y.jsx)(_,{className:`w-full`,defaultSelectedKeys:[`published`]}),(0,y.jsx)(m.Separator,{}),(0,y.jsx)(m.Label,{children:`Grouping`}),(0,y.jsx)(_,{className:`w-full`,defaultSelectedKeys:[`draft`]})]})})})},D={render:()=>(0,y.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,y.jsx)(m,{trigger:(0,y.jsx)(f,{children:`Open tray`}),defaultOpen:!0,showArrow:!0,children:(0,y.jsx)(`div`,{className:`w-56 p-3 text-primary text-sm`,children:`Arrows suit tooltips and hints better than menus.`})})})},O={render:function(){let[e,t]=(0,v.useState)([`scheduled`]),[n,r]=(0,v.useState)(!0);return(0,y.jsx)(`div`,{className:`flex min-h-64 w-72 items-center`,children:(0,y.jsx)(m,{trigger:(0,y.jsx)(c,{readOnly:!0,placeholder:`Pick a status`,value:C(e[0]),endContent:(0,y.jsx)(o,{"aria-hidden":`true`})}),open:n,onOpenChange:r,matchTriggerWidth:!0,children:(0,y.jsx)(_,{className:`w-full`,selectedKeys:e,onSelectionChange:e=>{t(e),r(!1)}})})})}},k={render:()=>(0,y.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,y.jsx)(m,{trigger:(0,y.jsx)(f.Icon,{variant:`outline`,"aria-label":`Pick a date`,children:(0,y.jsx)(i,{})}),defaultOpen:!0,showArrow:!0,children:(0,y.jsx)(`div`,{className:`w-56 p-3 text-primary text-sm`,children:`Any trigger works: buttons, inputs, icons, or plain text.`})})})},A={argTypes:{defaultPosition:{control:`select`,options:b}},args:{defaultPosition:`right-center`},render:({defaultPosition:e})=>(0,y.jsx)(`div`,{className:`flex min-h-64 items-center justify-center`,children:(0,y.jsx)(m,{trigger:(0,y.jsx)(f,{children:`Anchor`}),defaultOpen:!0,showArrow:!0,defaultPosition:e,children:(0,y.jsxs)(`div`,{className:`w-56 p-3 text-primary text-sm`,children:[`Preferred placement: `,e,`. The tray flips automatically when there is no room.`]})})})},j={render:function(){let[e,t]=(0,v.useState)(!1);return(0,y.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,y.jsx)(f,{variant:`outline`,onClick:()=>t(e=>!e),children:e?`Hide tray`:`Show tray`}),(0,y.jsx)(m,{trigger:(0,y.jsx)(f,{variant:`subtle`,children:`Anchored`}),open:e,onOpenChange:t,children:(0,y.jsx)(`div`,{className:`w-56 p-3 text-primary text-sm`,children:`This tray is fully controlled — the parent owns the open state.`})})]})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Popover trigger={<Button>Open tray</Button>}>
      <MenuList defaultSelectedKeys={["scheduled"]} />
    </Popover>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-64 items-center justify-center">
      <Popover trigger={<Button>Open tray</Button>} defaultOpen>
        <MenuList defaultSelectedKeys={["scheduled"]} />
      </Popover>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "Label and separator",
  render: () => <div className="flex min-h-64 items-center justify-center">
      <Popover trigger={<Button>Filter events</Button>} defaultOpen>
        <div className="w-56 p-1">
          <Popover.Label>Status</Popover.Label>
          <MenuList className="w-full" defaultSelectedKeys={["published"]} />
          <Popover.Separator />
          <Popover.Label>Grouping</Popover.Label>
          <MenuList className="w-full" defaultSelectedKeys={["draft"]} />
        </div>
      </Popover>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-64 items-center justify-center">
      <Popover trigger={<Button>Open tray</Button>} defaultOpen showArrow>
        <div className="w-56 p-3 text-primary text-sm">Arrows suit tooltips and hints better than menus.</div>
      </Popover>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: function InputTriggerPopover() {
    const [selected, setSelected] = useState<ListKey[]>(["scheduled"]);
    const [open, setOpen] = useState(true);
    return <div className="flex min-h-64 w-72 items-center">
        <Popover trigger={<Input readOnly placeholder="Pick a status" value={statusLabel(selected[0])} endContent={<ChevronDown aria-hidden="true" />} />} open={open} onOpenChange={setOpen} matchTriggerWidth>
          <MenuList className="w-full" selectedKeys={selected} onSelectionChange={keys => {
          setSelected(keys);
          setOpen(false);
        }} />
        </Popover>
      </div>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-64 items-center justify-center">
      <Popover trigger={<Button.Icon variant="outline" aria-label="Pick a date">
            <CalendarDays />
          </Button.Icon>} defaultOpen showArrow>
        <div className="w-56 p-3 text-primary text-sm">Any trigger works: buttons, inputs, icons, or plain text.</div>
      </Popover>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  argTypes: {
    defaultPosition: {
      control: "select",
      options: positions
    }
  },
  args: {
    defaultPosition: "right-center"
  },
  render: ({
    defaultPosition
  }) => <div className="flex min-h-64 items-center justify-center">
      <Popover trigger={<Button>Anchor</Button>} defaultOpen showArrow defaultPosition={defaultPosition}>
        <div className="w-56 p-3 text-primary text-sm">
          Preferred placement: {defaultPosition}. The tray flips automatically when there is no room.
        </div>
      </Popover>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: function ControlledPopover() {
    const [open, setOpen] = useState(false);
    return <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => setOpen(visible => !visible)}>
          {open ? "Hide tray" : "Show tray"}
        </Button>
        <Popover trigger={<Button variant="subtle">Anchored</Button>} open={open} onOpenChange={setOpen}>
          <div className="w-56 p-3 text-primary text-sm">
            This tray is fully controlled — the parent owns the open state.
          </div>
        </Popover>
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Open`,`LabelAndSeparator`,`WithArrow`,`WithInputTrigger`,`WithIconTrigger`,`Placement`,`Controlled`]})))()}N();export{j as Controlled,w as Default,E as LabelAndSeparator,T as Open,A as Placement,D as WithArrow,k as WithIconTrigger,O as WithInputTrigger,M as __namedExportsOrder,x as default};