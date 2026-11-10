import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./createLucideIcon-b5K2wI9V.js";import{a,c as o,i as s,n as c,o as l,r as u,s as d,t as f}from"./dropdown-BHx0cs8E.js";import{n as p,t as m}from"./user-round-DIFP8fAo.js";import{n as h,t as g}from"./button-BSiNW2bO.js";var _,v;function y(){return(y=e((()=>{r(),_={name:`pin`,size:24,node:[[`path`,{d:`M12 17v5`,key:`bb1du9`}],[`path`,{d:`M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`,key:`1nkz8b`}]]},_.node,v=i(_)})))()}var b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{b=t(),o(),l(),y(),s(),p(),h(),c(),x=n(),S={title:`Components/Dropdown`,component:f,tags:[`autodocs`],argTypes:{position:{control:`select`,options:[`top-start`,`top-center`,`top-end`,`right-start`,`bottom-start`,`bottom-center`,`bottom-end`,`left-start`]},disabled:{control:`boolean`}},args:{position:`bottom-start`,disabled:!1}},C={render:e=>(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{children:`Event actions`}),defaultOpen:!0,"aria-label":`Event actions`,children:[(0,x.jsx)(f.Label,{children:`Manage event`}),(0,x.jsx)(f.Item,{icon:(0,x.jsx)(a,{}),children:`Edit event`}),(0,x.jsx)(f.Item,{icon:(0,x.jsx)(d,{}),children:`Duplicate event`}),(0,x.jsx)(f.Item,{icon:(0,x.jsx)(v,{}),children:`Pin to top`}),(0,x.jsx)(f.Separator,{}),(0,x.jsx)(f.Item,{icon:(0,x.jsx)(u,{}),destructive:!0,children:`Delete event`})]})},w={name:`Interactive trigger`,render:function(){let[e,t]=(0,b.useState)(!1);return(0,x.jsxs)(f,{trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Open menu`}),open:e,onOpenChange:t,"aria-label":`Demo actions`,children:[(0,x.jsx)(f.Item,{onClick:()=>t(!1),children:`Profile`}),(0,x.jsx)(f.Item,{onClick:()=>t(!1),children:`Settings`}),(0,x.jsx)(f.Separator,{}),(0,x.jsx)(f.Item,{destructive:!0,onClick:()=>t(!1),children:`Sign out`})]})}},T={render:e=>(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Editor`}),defaultOpen:!0,"aria-label":`Editor actions`,children:[(0,x.jsx)(f.Item,{shortcut:`⌘C`,children:`Copy link`}),(0,x.jsx)(f.Item,{shortcut:`⌘E`,children:`Edit details`}),(0,x.jsx)(f.Item,{shortcut:`⌘D`,children:`Duplicate`})]})},E={name:`Plain items`,render:e=>(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Share`}),defaultOpen:!0,"aria-label":`Share actions`,children:[(0,x.jsx)(f.Label,{children:`Invite`}),(0,x.jsx)(f.Item,{children:`Copy invitation link`}),(0,x.jsx)(f.Item,{children:`Send via WhatsApp`}),(0,x.jsx)(f.Item,{children:`Send via email`})]})},D={name:`Single select`,render:function(e){let[t,n]=(0,b.useState)(`id`);return(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Language`}),defaultOpen:!0,"aria-label":`Language`,selectionMode:`single`,value:t,onValueChange:n,children:[(0,x.jsx)(f.Label,{children:`Language`}),(0,x.jsx)(f.Item,{value:`id`,children:`Indonesian`}),(0,x.jsx)(f.Item,{value:`en`,children:`English`})]})}},O={name:`Radio selection`,render:function(e){let[t,n]=(0,b.useState)(`email`);return(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Delivery`}),defaultOpen:!0,"aria-label":`Delivery channel`,selectionMode:`single`,selectionIndicator:`radio`,selectionPosition:`start`,value:t,onValueChange:n,children:[(0,x.jsx)(f.Label,{children:`Channel`}),(0,x.jsx)(f.Item,{value:`email`,children:`Email`}),(0,x.jsx)(f.Item,{value:`sms`,children:`SMS`}),(0,x.jsx)(f.Item,{value:`whatsapp`,children:`WhatsApp`})]})}},k={name:`Checkmark selection`,render:function(e){let[t,n]=(0,b.useState)(`email`);return(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Delivery`}),defaultOpen:!0,"aria-label":`Delivery channel`,selectionMode:`single`,selectionIndicator:`checkmark`,value:t,onValueChange:n,children:[(0,x.jsx)(f.Label,{children:`Channel`}),(0,x.jsx)(f.Item,{value:`email`,children:`Email`}),(0,x.jsx)(f.Item,{value:`sms`,children:`SMS`}),(0,x.jsx)(f.Item,{value:`whatsapp`,children:`WhatsApp`})]})}},A={name:`Rich items`,render:function(e){let[t,n]=(0,b.useState)(`ayu`);return(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Assignee`}),defaultOpen:!0,"aria-label":`Assignee`,selectionMode:`single`,selectionIndicator:`checkmark`,value:t,onValueChange:n,children:[(0,x.jsx)(f.Label,{children:`Team`}),(0,x.jsx)(f.Item,{value:`ayu`,startContent:(0,x.jsx)(m,{}),description:`ayu@wedo.co.id`,endContent:(0,x.jsx)(`span`,{className:`text-tertiary text-xs`,children:`Owner`}),children:`Ayu`}),(0,x.jsx)(f.Item,{value:`bima`,startContent:(0,x.jsx)(m,{}),description:`bima@wedo.co.id`,children:`Bima`}),(0,x.jsx)(f.Item,{value:`citra`,startContent:(0,x.jsx)(m,{}),description:`Invitation pending`,disabled:!0,children:`Citra`}),(0,x.jsx)(f.Separator,{}),(0,x.jsx)(f.Item,{shortcut:`⌘E`,startContent:(0,x.jsx)(a,{}),children:`Edit details`})]})}},j={name:`Menu gap`,render:e=>(0,x.jsxs)(f,{...e,trigger:(0,x.jsx)(g,{variant:`outline`,color:`neutral`,children:`Actions`}),defaultOpen:!0,menuClassName:`gap-1`,"aria-label":`Event actions`,children:[(0,x.jsx)(f.Item,{startContent:(0,x.jsx)(d,{}),children:`Copy link`}),(0,x.jsx)(f.Item,{startContent:(0,x.jsx)(v,{}),children:`Pin to top`}),(0,x.jsx)(f.Item,{startContent:(0,x.jsx)(a,{}),children:`Edit event`}),(0,x.jsx)(f.Separator,{}),(0,x.jsx)(f.Item,{startContent:(0,x.jsx)(u,{}),destructive:!0,children:`Delete event`})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <Dropdown {...args} trigger={<Button>Event actions</Button>} defaultOpen aria-label="Event actions">
      <Dropdown.Label>Manage event</Dropdown.Label>
      <Dropdown.Item icon={<Pencil />}>Edit event</Dropdown.Item>
      <Dropdown.Item icon={<Copy />}>Duplicate event</Dropdown.Item>
      <Dropdown.Item icon={<Pin />}>Pin to top</Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item icon={<Trash2 />} destructive>
        Delete event
      </Dropdown.Item>
    </Dropdown>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: "Interactive trigger",
  render: function TriggerDropdown() {
    const [open, setOpen] = useState(false);
    return <Dropdown trigger={<Button variant="outline" color="neutral">
            Open menu
          </Button>} open={open} onOpenChange={setOpen} aria-label="Demo actions">
        <Dropdown.Item onClick={() => setOpen(false)}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={() => setOpen(false)}>Settings</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item destructive onClick={() => setOpen(false)}>
          Sign out
        </Dropdown.Item>
      </Dropdown>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
          Editor
        </Button>} defaultOpen aria-label="Editor actions">
      <Dropdown.Item shortcut="⌘C">Copy link</Dropdown.Item>
      <Dropdown.Item shortcut="⌘E">Edit details</Dropdown.Item>
      <Dropdown.Item shortcut="⌘D">Duplicate</Dropdown.Item>
    </Dropdown>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "Plain items",
  render: args => <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
          Share
        </Button>} defaultOpen aria-label="Share actions">
      <Dropdown.Label>Invite</Dropdown.Label>
      <Dropdown.Item>Copy invitation link</Dropdown.Item>
      <Dropdown.Item>Send via WhatsApp</Dropdown.Item>
      <Dropdown.Item>Send via email</Dropdown.Item>
    </Dropdown>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "Single select",
  render: function SingleSelectDropdown(args) {
    const [value, setValue] = useState("id");
    return <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
            Language
          </Button>} defaultOpen aria-label="Language" selectionMode="single" value={value} onValueChange={setValue}>
        <Dropdown.Label>Language</Dropdown.Label>
        <Dropdown.Item value="id">Indonesian</Dropdown.Item>
        <Dropdown.Item value="en">English</Dropdown.Item>
      </Dropdown>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: "Radio selection",
  render: function RadioSelectionDropdown(args) {
    const [value, setValue] = useState("email");
    return <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
            Delivery
          </Button>} defaultOpen aria-label="Delivery channel" selectionMode="single" selectionIndicator="radio" selectionPosition="start" value={value} onValueChange={setValue}>
        <Dropdown.Label>Channel</Dropdown.Label>
        <Dropdown.Item value="email">Email</Dropdown.Item>
        <Dropdown.Item value="sms">SMS</Dropdown.Item>
        <Dropdown.Item value="whatsapp">WhatsApp</Dropdown.Item>
      </Dropdown>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Checkmark selection",
  render: function CheckmarkSelectionDropdown(args) {
    const [value, setValue] = useState("email");
    return <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
            Delivery
          </Button>} defaultOpen aria-label="Delivery channel" selectionMode="single" selectionIndicator="checkmark" value={value} onValueChange={setValue}>
        <Dropdown.Label>Channel</Dropdown.Label>
        <Dropdown.Item value="email">Email</Dropdown.Item>
        <Dropdown.Item value="sms">SMS</Dropdown.Item>
        <Dropdown.Item value="whatsapp">WhatsApp</Dropdown.Item>
      </Dropdown>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: "Rich items",
  render: function RichItemsDropdown(args) {
    const [value, setValue] = useState("ayu");
    return <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
            Assignee
          </Button>} defaultOpen aria-label="Assignee" selectionMode="single" selectionIndicator="checkmark" value={value} onValueChange={setValue}>
        <Dropdown.Label>Team</Dropdown.Label>
        <Dropdown.Item value="ayu" startContent={<UserRound />} description="ayu@wedo.co.id" endContent={<span className="text-tertiary text-xs">Owner</span>}>
          Ayu
        </Dropdown.Item>
        <Dropdown.Item value="bima" startContent={<UserRound />} description="bima@wedo.co.id">
          Bima
        </Dropdown.Item>
        <Dropdown.Item value="citra" startContent={<UserRound />} description="Invitation pending" disabled>
          Citra
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item shortcut="⌘E" startContent={<Pencil />}>
          Edit details
        </Dropdown.Item>
      </Dropdown>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: "Menu gap",
  render: args => <Dropdown {...args} trigger={<Button variant="outline" color="neutral">
          Actions
        </Button>} defaultOpen menuClassName="gap-1" aria-label="Event actions">
      <Dropdown.Item startContent={<Copy />}>Copy link</Dropdown.Item>
      <Dropdown.Item startContent={<Pin />}>Pin to top</Dropdown.Item>
      <Dropdown.Item startContent={<Pencil />}>Edit event</Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item startContent={<Trash2 />} destructive>
        Delete event
      </Dropdown.Item>
    </Dropdown>
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Trigger`,`Shortcuts`,`PlainItems`,`SingleSelect`,`RadioSelection`,`CheckmarkSelection`,`RichItems`,`MenuGap`]})))()}N();export{k as CheckmarkSelection,C as Default,j as MenuGap,E as PlainItems,O as RadioSelection,A as RichItems,T as Shortcuts,D as SingleSelect,w as Trigger,M as __namedExportsOrder,S as default};