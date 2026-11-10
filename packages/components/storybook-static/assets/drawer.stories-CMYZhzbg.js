import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{t as r}from"./react-dom-BLmVGkIw.js";import{n as i,t as a}from"./calendar-days-BPRvvtpT.js";import{n as o,t as s}from"./input-CyOsgzUo.js";import{n as c,t as l}from"./users-Pr-zF4po.js";import{n as u,t as d}from"./cn-BksUxDMQ.js";import{n as f,t as p}from"./badge-De8Hay21.js";import{n as m,t as h}from"./button-BSiNW2bO.js";import{a as g,c as ee,i as _,l as v,n as te,o as y,r as b,s as x,t as S}from"./use-overlay-n3of1R4B.js";import{n as C,t as w}from"./field-DWHIWe24.js";function ne(e,t){if(t===void 0)return{};let n=typeof t==`number`?`${t}px`:t;return e===`left`||e===`right`?{width:n}:{height:n}}var T,E,D,O,k,A,j;function M(){return(M=e((()=>{T=t(),u(),E=r(),v(),x(),S(),D=n(),O={top:`inset-x-0 top-0 max-h-[90dvh] rounded-b-2xl border-secondary border-b`,bottom:`inset-x-0 bottom-0 max-h-[90dvh] rounded-t-2xl border-secondary border-t`,left:`inset-y-0 left-0 h-full w-80 max-w-[90vw] rounded-r-2xl border-secondary border-r`,right:`inset-y-0 right-0 h-full w-80 max-w-[90vw] rounded-l-2xl border-secondary border-l`},k={top:`-translate-y-full`,bottom:`translate-y-full`,left:`-translate-x-full`,right:`translate-x-full`},A=(0,T.forwardRef)(function({open:e,defaultOpen:t=!1,onOpenChange:n,position:r=`right`,size:i,closeOnOverlayClick:a=!0,closeOnEscape:o=!0,showCloseIcon:s=!0,className:c,overlayClassName:l,children:u,onKeyDown:f,style:p,...m},h){let g=(0,T.useRef)(null),_=(0,T.useId)(),v=(0,T.useId)(),[y,b]=(0,T.useState)(!1),[x,S]=(0,T.useState)(!1),C=(0,T.useCallback)(e=>{g.current=e,typeof h==`function`?h(e):h&&(h.current=e)},[h]),{mounted:w,rendered:A,visible:j,close:M,trapFocus:N}=te({open:e,defaultOpen:t,onOpenChange:n,closeOnEscape:o,exitDuration:300,panelRef:g});return!w||!A?null:(0,D.jsx)(ee.Provider,{value:{onClose:M,showCloseIcon:s,titleId:_,descriptionId:v,setTitlePresent:b,setDescriptionPresent:S},children:(0,E.createPortal)((0,D.jsxs)(`div`,{"data-slot":`overlay`,className:d(`fixed inset-0 z-50 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out`,j?`opacity-100`:`pointer-events-none opacity-0`,l),children:[(0,D.jsx)(`div`,{"data-slot":`scrim`,className:`absolute inset-0 bg-black/30 backdrop-blur-[2px]`,onClick:e=>{a&&e.target===e.currentTarget&&M()}}),(0,D.jsx)(`div`,{ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":y?_:void 0,"aria-describedby":x?v:void 0,tabIndex:-1,onKeyDown:e=>{f?.(e),!e.defaultPrevented&&N(e)},style:{...ne(r,i),...p},className:d(`absolute flex flex-col overflow-hidden border-secondary bg-primary text-primary shadow-2xl outline-none motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out`,O[r],j?`translate-x-0 translate-y-0`:k[r],c),...m,children:u})]}),document.body)})}),A.displayName=`Drawer`,j=Object.assign(A,{Header:y,Body:b,Footer:g,Close:_}),A.__docgenInfo={description:``,methods:[],displayName:`Drawer`,props:{open:{required:!1,tsType:{name:`boolean`},description:"Controlled open state. Pair with `onOpenChange`."},defaultOpen:{required:!1,tsType:{name:`boolean`},description:`Uncontrolled initial open state.`,defaultValue:{value:`false`,computed:!1}},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:`Fires on every open/close request (close button, scrim, Escape).`},position:{required:!1,tsType:{name:`union`,raw:`"top" | "right" | "bottom" | "left"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"right"`},{name:`literal`,value:`"bottom"`},{name:`literal`,value:`"left"`}]},description:'Edge the drawer slides in from. Defaults to `"right"`.',defaultValue:{value:`"right"`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Panel width (`left`/`right`) or height (`top`/`bottom`). Number → px."},closeOnOverlayClick:{required:!1,tsType:{name:`boolean`},description:"Closes when the scrim (outside the panel) is clicked. Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},closeOnEscape:{required:!1,tsType:{name:`boolean`},description:"Closes on `Escape`. Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},showCloseIcon:{required:!1,tsType:{name:`boolean`},description:"Shows the header close button. `Drawer.Header` can override per instance. Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},overlayClassName:{required:!1,tsType:{name:`string`},description:`Classes for the scrim/overlay container.`},children:{required:!1,tsType:{name:`ReactNode`},description:"Drawer body: `Drawer.Header`, `Drawer.Body`, `Drawer.Footer`, or free content."}}}})))()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,re;function ie(){return(ie=e((()=>{N=t(),i(),c(),f(),m(),C(),o(),M(),P=n(),F={title:`Components/Drawer`,component:j,tags:[`autodocs`],argTypes:{position:{control:`select`,options:[`top`,`right`,`bottom`,`left`]},closeOnOverlayClick:{control:`boolean`},closeOnEscape:{control:`boolean`},showCloseIcon:{control:`boolean`}},args:{position:`right`,closeOnOverlayClick:!0,closeOnEscape:!0,showCloseIcon:!0}},I={render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{title:`Event settings`,description:`Adjust the invitation, RSVP, and guest options.`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Drawers slide in from any edge and reuse the same header, body, and footer slots as the Modal.`})}),(0,P.jsxs)(j.Footer,{children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,P.jsx)(h,{children:`Save changes`})]})]})},L={name:`Interactive trigger`,render:function(){let[e,t]=(0,N.useState)(!1),[n,r]=(0,N.useState)(`right`);return(0,P.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[[`top`,`right`,`bottom`,`left`].map(e=>(0,P.jsxs)(h,{variant:`outline`,color:`neutral`,onClick:()=>{r(e),t(!0)},children:[`Open `,e]},e)),(0,P.jsxs)(j,{open:e,onOpenChange:t,position:n,children:[(0,P.jsx)(j.Header,{title:`Drawer from the ${n}`,description:`Fully controlled by the parent state.`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Close it with the button, the scrim, or Escape.`})}),(0,P.jsxs)(j.Footer,{children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,onClick:()=>t(!1),children:`Cancel`}),(0,P.jsx)(h,{onClick:()=>t(!1),children:`Done`})]})]})]})}},R={name:`Position / Left`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,position:`left`,children:[(0,P.jsx)(j.Header,{title:`Event navigation`,description:`Jump between the event workspace sections.`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`nav`,{"aria-label":`Event sections`,className:`flex flex-col gap-1`,children:[`Overview`,`Invitation`,`Guest list`,`Vendors`,`Timeline`].map((e,t)=>(0,P.jsx)(`span`,{"aria-current":t===0?`page`:void 0,className:t===0?`rounded-md bg-brand-muted-primary px-3 py-2 font-medium text-brand-primary text-sm`:`rounded-md px-3 py-2 text-sm text-tertiary`,children:e},e))})})]})},z={name:`Position / Right`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,position:`right`,size:420,children:[(0,P.jsx)(j.Header,{icon:(0,P.jsx)(a,{}),title:`Adit & Sari wedding`,description:`Saturday, 12 October 2026 · Grand Ballroom`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`dl`,{className:`flex flex-col gap-3 text-sm`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,P.jsx)(`dt`,{className:`text-tertiary`,children:`Status`}),(0,P.jsx)(`dd`,{children:(0,P.jsx)(p,{color:`green`,children:`Confirmed`})})]}),(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,P.jsx)(`dt`,{className:`text-tertiary`,children:`Guests`}),(0,P.jsx)(`dd`,{className:`font-medium text-primary`,children:`190 / 248 confirmed`})]}),(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,P.jsx)(`dt`,{className:`text-tertiary`,children:`Venue`}),(0,P.jsx)(`dd`,{className:`font-medium text-primary`,children:`Grand Ballroom`})]})]})}),(0,P.jsxs)(j.Footer,{children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Close`}),(0,P.jsx)(h,{children:`Open event`})]})]})},B={name:`Position / Top`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,position:`top`,children:[(0,P.jsx)(j.Header,{title:`Quick filters`,description:`Filter the guest list without leaving the page.`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`form`,{className:`flex flex-col gap-4 sm:flex-row sm:items-end`,onSubmit:e=>e.preventDefault(),children:[(0,P.jsxs)(w,{controlId:`drawer-filter-search`,className:`flex-1`,children:[(0,P.jsx)(w.Label,{children:`Search guests`}),(0,P.jsx)(w.Content,{children:(0,P.jsx)(s,{id:`drawer-filter-search`,placeholder:`Name or table number`})})]}),(0,P.jsxs)(`div`,{className:`flex gap-2`,children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Reset`}),(0,P.jsx)(h,{children:`Apply filters`})]})]})})]})},V={name:`Position / Bottom`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,position:`bottom`,children:[(0,P.jsx)(j.Header,{title:`Share invitation`,description:`Guests can open this link without signing in.`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`div`,{className:`flex flex-col gap-3 sm:flex-row sm:items-center`,children:[(0,P.jsx)(s,{readOnly:!0,defaultValue:`https://guest.wedo.co.id/adit-sari`,"aria-label":`Invitation link`}),(0,P.jsx)(h,{className:`shrink-0`,children:`Copy link`})]})})]})},H={render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,position:`right`,size:480,children:[(0,P.jsx)(j.Header,{title:`Wide panel`,description:`size={480} renders a 480px wide panel on the right edge.`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Pass a number for pixels (`,(0,P.jsxs)(`code`,{children:[`size=`,480]}),`) or any CSS value (`,(0,P.jsx)(`code`,{children:`size="30rem"`}),`). Side drawers size the width, top and bottom drawers size the height.`]})}),(0,P.jsx)(j.Footer,{children:(0,P.jsx)(h,{children:`Got it`})})]})},U={render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,position:`right`,size:420,children:[(0,P.jsx)(j.Header,{title:`Add vendor`,description:`Track a new vendor for the wedding timeline.`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`form`,{className:`flex flex-col gap-4`,onSubmit:e=>e.preventDefault(),children:[(0,P.jsxs)(w,{controlId:`drawer-vendor-name`,children:[(0,P.jsx)(w.Label,{children:`Vendor name`}),(0,P.jsx)(w.Content,{children:(0,P.jsx)(s,{id:`drawer-vendor-name`,placeholder:`Altar Decoration`})})]}),(0,P.jsxs)(w,{controlId:`drawer-vendor-category`,children:[(0,P.jsx)(w.Label,{children:`Category`}),(0,P.jsx)(w.Content,{children:(0,P.jsx)(s,{id:`drawer-vendor-category`,placeholder:`Decoration, catering, photo`})})]}),(0,P.jsxs)(w,{controlId:`drawer-vendor-contact`,children:[(0,P.jsx)(w.Label,{children:`Contact person`}),(0,P.jsx)(w.Content,{children:(0,P.jsx)(s,{id:`drawer-vendor-contact`,placeholder:`Name or phone number`})})]})]})}),(0,P.jsxs)(j.Footer,{children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,P.jsx)(h,{children:`Add vendor`})]})]})},W=Array.from({length:12},(e,t)=>({id:t+1,text:`the parties agree to coordinate all vendor schedules through the wedo workspace and to keep the guest list in sync before the event day.`})),G={name:`Long content`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{title:`Terms & conditions`,description:`The body scrolls while the header and footer stay in place.`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`div`,{className:`flex flex-col gap-3`,children:W.map(e=>(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Clause `,e.id,`: `,e.text]},e.id))})}),(0,P.jsx)(j.Footer,{children:(0,P.jsx)(h,{children:`Got it`})})]})},K={name:`Without close icon`,render:e=>(0,P.jsxs)(j,{...e,showCloseIcon:!1,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{title:`Remove vendor`,description:`This vendor will be removed from the timeline.`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Use the actions below to confirm — there is no header X button.`})}),(0,P.jsxs)(j.Footer,{children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Keep vendor`}),(0,P.jsx)(h,{color:`error`,children:`Remove`})]})]})},q={render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,closeOnOverlayClick:!1,closeOnEscape:!1,children:[(0,P.jsx)(j.Header,{title:`Unsaved changes`,description:`Finish or discard your edits before leaving.`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`p`,{className:`text-sm text-tertiary`,children:`The scrim and Escape are disabled here, so the drawer only closes through an explicit action.`})}),(0,P.jsxs)(j.Footer,{children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Discard`}),(0,P.jsx)(h,{children:`Keep editing`})]})]})},J={render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{icon:(0,P.jsx)(l,{}),title:`Guest list`,description:`248 guests invited · 190 confirmed`}),(0,P.jsx)(j.Body,{children:(0,P.jsx)(`p`,{className:`text-sm text-tertiary`,children:`The optional header icon works the same as in the Modal — a leading round surface before the title.`})}),(0,P.jsx)(j.Footer,{children:(0,P.jsx)(h,{children:`Manage guests`})})]})},Y={name:`Icon / Vertical`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{icon:(0,P.jsx)(l,{}),iconOrientation:`vertical`,title:`Guest list`,description:`248 guests invited · 190 confirmed`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Set `,(0,P.jsx)(`code`,{children:`iconOrientation="vertical"`}),` to stack the icon above the title block.`]})}),(0,P.jsx)(j.Footer,{children:(0,P.jsx)(h,{children:`Manage guests`})})]})},X={name:`Custom header`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{icon:(0,P.jsx)(l,{}),children:(0,P.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-1`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsx)(`h2`,{className:`font-medium text-base text-primary leading-tight`,children:`Guest list`}),(0,P.jsx)(p,{color:`green`,children:`190 confirmed`})]}),(0,P.jsx)(`p`,{className:`text-sm text-tertiary`,children:`248 guests invited`})]})}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Pass any content as `,(0,P.jsx)(`code`,{children:`Drawer.Header`}),` children to build a custom header when props are not enough.`]})}),(0,P.jsx)(j.Footer,{children:(0,P.jsx)(h,{children:`Manage guests`})})]})},Z={name:`Custom close button`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{title:`Outlined close`,description:`Tweak the auto close button through closeButtonProps.`,closeButtonProps:{variant:`outline`,color:`neutral`,"aria-label":`Close panel`}}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`The close button is a `,(0,P.jsx)(`code`,{children:`Button.Icon`}),` defaulting to `,(0,P.jsx)(`code`,{children:`variant="text"`}),`,`,` `,(0,P.jsx)(`code`,{children:`color="neutral"`}),`, and `,(0,P.jsx)(`code`,{children:`size="sm"`}),`. Override any of them through`,` `,(0,P.jsx)(`code`,{children:`closeButtonProps`}),`, or render an explicit `,(0,P.jsx)(`code`,{children:`Drawer.Close`}),` anywhere inside for full control.`]})}),(0,P.jsx)(j.Footer,{children:(0,P.jsx)(h,{children:`Got it`})})]})},Q={name:`Without separator`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{title:`Soft edges`,description:`Header and footer separators are optional.`,separator:!1}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Turn both header and footer `,(0,P.jsx)(`code`,{children:`separator`}),` off for a seamless look.`]})}),(0,P.jsxs)(j.Footer,{separator:!1,children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,P.jsx)(h,{children:`Continue`})]})]})},$={name:`Header separator only`,render:e=>(0,P.jsxs)(j,{...e,defaultOpen:!0,children:[(0,P.jsx)(j.Header,{title:`Header separator only`,description:`The footer border is turned off.`}),(0,P.jsx)(j.Body,{children:(0,P.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[(0,P.jsx)(`code`,{children:`Drawer.Header`}),` and `,(0,P.jsx)(`code`,{children:`Drawer.Footer`}),` toggle each border independently through`,` `,(0,P.jsx)(`code`,{children:`separator`}),`.`]})}),(0,P.jsxs)(j.Footer,{separator:!1,children:[(0,P.jsx)(h,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,P.jsx)(h,{children:`Continue`})]})]})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header title="Event settings" description="Adjust the invitation, RSVP, and guest options." />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          Drawers slide in from any edge and reuse the same header, body, and footer slots as the Modal.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Save changes</Button>
      </Drawer.Footer>
    </Drawer>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: "Interactive trigger",
  render: function TriggerDrawer() {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<DrawerPosition>("right");
    return <div className="flex flex-wrap items-center gap-2">
        {(["top", "right", "bottom", "left"] as const).map(edge => <Button key={edge} variant="outline" color="neutral" onClick={() => {
        setPosition(edge);
        setOpen(true);
      }}>
            Open {edge}
          </Button>)}
        <Drawer open={open} onOpenChange={setOpen} position={position}>
          <Drawer.Header title={\`Drawer from the \${position}\`} description="Fully controlled by the parent state." />
          <Drawer.Body>
            <p className="text-sm text-tertiary">Close it with the button, the scrim, or Escape.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </Drawer.Footer>
        </Drawer>
      </div>;
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: "Position / Left",
  render: args => <Drawer {...args} defaultOpen position="left">
      <Drawer.Header title="Event navigation" description="Jump between the event workspace sections." />
      <Drawer.Body>
        <nav aria-label="Event sections" className="flex flex-col gap-1">
          {["Overview", "Invitation", "Guest list", "Vendors", "Timeline"].map((section, index) => <span key={section} aria-current={index === 0 ? "page" : undefined} className={index === 0 ? "rounded-md bg-brand-muted-primary px-3 py-2 font-medium text-brand-primary text-sm" : "rounded-md px-3 py-2 text-sm text-tertiary"}>
              {section}
            </span>)}
        </nav>
      </Drawer.Body>
    </Drawer>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: "Position / Right",
  render: args => <Drawer {...args} defaultOpen position="right" size={420}>
      <Drawer.Header icon={<CalendarDays />} title="Adit & Sari wedding" description="Saturday, 12 October 2026 · Grand Ballroom" />
      <Drawer.Body>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-tertiary">Status</dt>
            <dd>
              <Badge color="green">Confirmed</Badge>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-tertiary">Guests</dt>
            <dd className="font-medium text-primary">190 / 248 confirmed</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-tertiary">Venue</dt>
            <dd className="font-medium text-primary">Grand Ballroom</dd>
          </div>
        </dl>
      </Drawer.Body>
      <Drawer.Footer>
        <Button variant="outline" color="neutral">
          Close
        </Button>
        <Button>Open event</Button>
      </Drawer.Footer>
    </Drawer>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: "Position / Top",
  render: args => <Drawer {...args} defaultOpen position="top">
      <Drawer.Header title="Quick filters" description="Filter the guest list without leaving the page." />
      <Drawer.Body>
        <form className="flex flex-col gap-4 sm:flex-row sm:items-end" onSubmit={event => event.preventDefault()}>
          <Field controlId="drawer-filter-search" className="flex-1">
            <Field.Label>Search guests</Field.Label>
            <Field.Content>
              <Input id="drawer-filter-search" placeholder="Name or table number" />
            </Field.Content>
          </Field>
          <div className="flex gap-2">
            <Button variant="outline" color="neutral">
              Reset
            </Button>
            <Button>Apply filters</Button>
          </div>
        </form>
      </Drawer.Body>
    </Drawer>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: "Position / Bottom",
  render: args => <Drawer {...args} defaultOpen position="bottom">
      <Drawer.Header title="Share invitation" description="Guests can open this link without signing in." />
      <Drawer.Body>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input readOnly defaultValue="https://guest.wedo.co.id/adit-sari" aria-label="Invitation link" />
          <Button className="shrink-0">Copy link</Button>
        </div>
      </Drawer.Body>
    </Drawer>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <Drawer {...args} defaultOpen position="right" size={480}>
      <Drawer.Header title="Wide panel" description="size={480} renders a 480px wide panel on the right edge." />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          Pass a number for pixels (<code>size={480}</code>) or any CSS value (<code>size="30rem"</code>). Side drawers
          size the width, top and bottom drawers size the height.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Got it</Button>
      </Drawer.Footer>
    </Drawer>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => <Drawer {...args} defaultOpen position="right" size={420}>
      <Drawer.Header title="Add vendor" description="Track a new vendor for the wedding timeline." />
      <Drawer.Body>
        <form className="flex flex-col gap-4" onSubmit={event => event.preventDefault()}>
          <Field controlId="drawer-vendor-name">
            <Field.Label>Vendor name</Field.Label>
            <Field.Content>
              <Input id="drawer-vendor-name" placeholder="Altar Decoration" />
            </Field.Content>
          </Field>
          <Field controlId="drawer-vendor-category">
            <Field.Label>Category</Field.Label>
            <Field.Content>
              <Input id="drawer-vendor-category" placeholder="Decoration, catering, photo" />
            </Field.Content>
          </Field>
          <Field controlId="drawer-vendor-contact">
            <Field.Label>Contact person</Field.Label>
            <Field.Content>
              <Input id="drawer-vendor-contact" placeholder="Name or phone number" />
            </Field.Content>
          </Field>
        </form>
      </Drawer.Body>
      <Drawer.Footer>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Add vendor</Button>
      </Drawer.Footer>
    </Drawer>
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: "Long content",
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header title="Terms & conditions" description="The body scrolls while the header and footer stay in place." />
      <Drawer.Body>
        <div className="flex flex-col gap-3">
          {clauses.map(clause => <p key={clause.id} className="text-sm text-tertiary">
              Clause {clause.id}: {clause.text}
            </p>)}
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Got it</Button>
      </Drawer.Footer>
    </Drawer>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "Without close icon",
  render: args => <Drawer {...args} showCloseIcon={false} defaultOpen>
      <Drawer.Header title="Remove vendor" description="This vendor will be removed from the timeline." />
      <Drawer.Body>
        <p className="text-sm text-tertiary">Use the actions below to confirm — there is no header X button.</p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button variant="outline" color="neutral">
          Keep vendor
        </Button>
        <Button color="error">Remove</Button>
      </Drawer.Footer>
    </Drawer>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => <Drawer {...args} defaultOpen closeOnOverlayClick={false} closeOnEscape={false}>
      <Drawer.Header title="Unsaved changes" description="Finish or discard your edits before leaving." />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          The scrim and Escape are disabled here, so the drawer only closes through an explicit action.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button variant="outline" color="neutral">
          Discard
        </Button>
        <Button>Keep editing</Button>
      </Drawer.Footer>
    </Drawer>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header icon={<Users />} title="Guest list" description="248 guests invited · 190 confirmed" />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          The optional header icon works the same as in the Modal — a leading round surface before the title.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Manage guests</Button>
      </Drawer.Footer>
    </Drawer>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Icon / Vertical",
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header icon={<Users />} iconOrientation="vertical" title="Guest list" description="248 guests invited · 190 confirmed" />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          Set <code>iconOrientation="vertical"</code> to stack the icon above the title block.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Manage guests</Button>
      </Drawer.Footer>
    </Drawer>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Custom header",
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header icon={<Users />}>
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-base text-primary leading-tight">Guest list</h2>
            <Badge color="green">190 confirmed</Badge>
          </div>
          <p className="text-sm text-tertiary">248 guests invited</p>
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          Pass any content as <code>Drawer.Header</code> children to build a custom header when props are not enough.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Manage guests</Button>
      </Drawer.Footer>
    </Drawer>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Custom close button",
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header title="Outlined close" description="Tweak the auto close button through closeButtonProps." closeButtonProps={{
      variant: "outline",
      color: "neutral",
      "aria-label": "Close panel"
    }} />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          The close button is a <code>Button.Icon</code> defaulting to <code>variant="text"</code>,{" "}
          <code>color="neutral"</code>, and <code>size="sm"</code>. Override any of them through{" "}
          <code>closeButtonProps</code>, or render an explicit <code>Drawer.Close</code> anywhere inside for full
          control.
        </p>
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Got it</Button>
      </Drawer.Footer>
    </Drawer>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Without separator",
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header title="Soft edges" description="Header and footer separators are optional." separator={false} />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          Turn both header and footer <code>separator</code> off for a seamless look.
        </p>
      </Drawer.Body>
      <Drawer.Footer separator={false}>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Continue</Button>
      </Drawer.Footer>
    </Drawer>
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: "Header separator only",
  render: args => <Drawer {...args} defaultOpen>
      <Drawer.Header title="Header separator only" description="The footer border is turned off." />
      <Drawer.Body>
        <p className="text-sm text-tertiary">
          <code>Drawer.Header</code> and <code>Drawer.Footer</code> toggle each border independently through{" "}
          <code>separator</code>.
        </p>
      </Drawer.Body>
      <Drawer.Footer separator={false}>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Continue</Button>
      </Drawer.Footer>
    </Drawer>
}`,...$.parameters?.docs?.source}}},re=[`Default`,`Trigger`,`Left`,`Right`,`Top`,`Bottom`,`Sizes`,`Form`,`LongContent`,`WithoutCloseIcon`,`Persistent`,`WithIcon`,`IconVertical`,`CustomHeader`,`CustomCloseButton`,`WithoutSeparator`,`HeaderOnlySeparator`]})))()}ie();export{V as Bottom,Z as CustomCloseButton,X as CustomHeader,I as Default,U as Form,$ as HeaderOnlySeparator,Y as IconVertical,R as Left,G as LongContent,q as Persistent,z as Right,H as Sizes,B as Top,L as Trigger,J as WithIcon,K as WithoutCloseIcon,Q as WithoutSeparator,re as __namedExportsOrder,F as default};