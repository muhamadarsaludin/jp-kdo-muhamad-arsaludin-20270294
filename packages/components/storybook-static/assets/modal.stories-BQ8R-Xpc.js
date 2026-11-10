import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{t as r}from"./react-dom-BLmVGkIw.js";import{n as i,t as a}from"./calendar-days-BPRvvtpT.js";import{n as o,t as s}from"./input-CyOsgzUo.js";import{n as c,t as l}from"./cn-BksUxDMQ.js";import{n as u,t as d}from"./badge-De8Hay21.js";import{n as f,t as p}from"./button-BSiNW2bO.js";import{a as m,c as h,i as g,l as _,n as v,o as y,r as b,s as x,t as S}from"./use-overlay-n3of1R4B.js";import{n as C,t as w}from"./field-DWHIWe24.js";var T,E,D,O,k,A;function j(){return(j=e((()=>{T=t(),c(),E=r(),_(),x(),S(),D=n(),O={sm:`max-w-sm`,md:`max-w-md`,lg:`max-w-lg`,xl:`max-w-xl`,full:`max-w-[calc(100vw-2rem)] md:max-w-5xl`},k=(0,T.forwardRef)(function({open:e,defaultOpen:t=!1,onOpenChange:n,size:r=`md`,closeOnOverlayClick:i=!0,closeOnEscape:a=!0,showCloseIcon:o=!0,className:s,overlayClassName:c,children:u,onKeyDown:d,...f},p){let m=(0,T.useRef)(null),g=(0,T.useId)(),_=(0,T.useId)(),[y,b]=(0,T.useState)(!1),[x,S]=(0,T.useState)(!1),C=(0,T.useCallback)(e=>{m.current=e,typeof p==`function`?p(e):p&&(p.current=e)},[p]),{mounted:w,rendered:k,visible:A,close:j,trapFocus:M}=v({open:e,defaultOpen:t,onOpenChange:n,closeOnEscape:a,panelRef:m});return!w||!k?null:(0,D.jsx)(h.Provider,{value:{onClose:j,showCloseIcon:o,titleId:g,descriptionId:_,setTitlePresent:b,setDescriptionPresent:S},children:(0,E.createPortal)((0,D.jsx)(`div`,{"data-slot":`overlay`,className:l(`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 p-4 backdrop-blur-[2px] motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out`,A?`opacity-100`:`pointer-events-none opacity-0`,c),onClick:e=>{i&&e.target===e.currentTarget&&j()},children:(0,D.jsx)(`div`,{ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":y?g:void 0,"aria-describedby":x?_:void 0,tabIndex:-1,onKeyDown:e=>{d?.(e),!e.defaultPrevented&&M(e)},className:l(`relative z-10 flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl border border-primary bg-primary text-primary shadow-2xl outline-none motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out`,O[r],A?`scale-100 opacity-100`:`scale-95 opacity-0`,s),...f,children:u})}),document.body)})}),k.displayName=`Modal`,A=Object.assign(k,{Header:y,Body:b,Footer:m,Close:g}),k.__docgenInfo={description:``,methods:[],displayName:`Modal`,props:{open:{required:!1,tsType:{name:`boolean`},description:``},defaultOpen:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},size:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg" | "xl" | "full"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`},{name:`literal`,value:`"xl"`},{name:`literal`,value:`"full"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}},closeOnOverlayClick:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},closeOnEscape:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showCloseIcon:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},overlayClassName:{required:!1,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:``}}}})))()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{M=t(),i(),u(),f(),C(),o(),j(),N=n(),P={title:`Components/Modal`,component:A,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`,`xl`,`full`]},closeOnOverlayClick:{control:`boolean`},closeOnEscape:{control:`boolean`},showCloseIcon:{control:`boolean`}},args:{size:`md`,closeOnOverlayClick:!0,closeOnEscape:!0,showCloseIcon:!0}},F=Array.from({length:12},(e,t)=>({id:t+1,text:`the parties agree to coordinate all vendor schedules through the wedo workspace and to keep the guest list in sync before the event day.`})),I={render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Edit event`,description:`Update the details for Adit & Sari's wedding event.`}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`This dialog keeps the page behind it in place, traps keyboard focus, restores focus on close, and locks body scroll. Use `,(0,N.jsx)(`code`,{children:`Modal.Header`}),`, `,(0,N.jsx)(`code`,{children:`Modal.Body`}),`, and `,(0,N.jsx)(`code`,{children:`Modal.Footer`}),` to lay out forms and confirmations.`]})}),(0,N.jsxs)(A.Footer,{children:[(0,N.jsx)(p,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,N.jsx)(p,{children:`Save changes`})]})]})},L={name:`Interactive trigger`,render:function(){let[e,t]=(0,M.useState)(!1);return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(p,{onClick:()=>t(!0),children:`Open modal`}),(0,N.jsxs)(A,{open:e,onOpenChange:t,children:[(0,N.jsx)(A.Header,{title:`Publish invitation`,description:`The guest link goes live immediately after publishing.`}),(0,N.jsx)(A.Body,{children:(0,N.jsx)(`p`,{className:`text-sm text-tertiary`,children:`You can still edit the content after publishing.`})}),(0,N.jsxs)(A.Footer,{children:[(0,N.jsx)(p,{variant:`outline`,color:`neutral`,onClick:()=>t(!1),children:`Cancel`}),(0,N.jsx)(p,{onClick:()=>t(!1),children:`Publish`})]})]})]})}},R={render:e=>(0,N.jsxs)(A,{...e,size:`lg`,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Edit vendor`,description:`Keep the vendor details up to date for the event timeline.`}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`form`,{className:`flex flex-col gap-4`,onSubmit:e=>e.preventDefault(),children:[(0,N.jsxs)(w,{controlId:`vendor-name`,children:[(0,N.jsx)(w.Label,{children:`Vendor name`}),(0,N.jsx)(w.Content,{children:(0,N.jsx)(s,{id:`vendor-name`,defaultValue:`Altar Decoration`})})]}),(0,N.jsxs)(w,{controlId:`vendor-contact`,children:[(0,N.jsx)(w.Label,{children:`Contact person`}),(0,N.jsx)(w.Content,{children:(0,N.jsx)(s,{id:`vendor-contact`,placeholder:`Name or phone number`})})]})]})}),(0,N.jsxs)(A.Footer,{children:[(0,N.jsx)(p,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,N.jsx)(p,{children:`Save vendor`})]})]})},z={render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Terms & conditions`,description:`The body scrolls when the content is taller than the viewport.`}),(0,N.jsx)(A.Body,{children:(0,N.jsx)(`div`,{className:`flex flex-col gap-3`,children:F.map(e=>(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Clause `,e.id,`: `,e.text]},e.id))})}),(0,N.jsx)(A.Footer,{children:(0,N.jsx)(p,{children:`Got it`})})]})},B={render:e=>(0,N.jsxs)(A,{...e,showCloseIcon:!1,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Delete draft`,description:`This action cannot be undone.`}),(0,N.jsx)(A.Body,{children:(0,N.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Choose an action below to continue.`})}),(0,N.jsxs)(A.Footer,{children:[(0,N.jsx)(p,{variant:`outline`,color:`neutral`,children:`Keep draft`}),(0,N.jsx)(p,{color:`error`,children:`Delete`})]})]})},V={render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{icon:(0,N.jsx)(a,{}),title:`Adit & Sari wedding`,description:`Saturday, 12 October 2026 · Grand Ballroom`}),(0,N.jsx)(A.Body,{children:(0,N.jsx)(`p`,{className:`text-sm text-tertiary`,children:`The optional icon sits in a round surface before the title — handy for event, vendor, or status dialogs.`})}),(0,N.jsx)(A.Footer,{children:(0,N.jsx)(p,{children:`Open event`})})]})},H={name:`Icon / Vertical`,render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{icon:(0,N.jsx)(a,{}),iconOrientation:`vertical`,title:`Adit & Sari wedding`,description:`Saturday, 12 October 2026 · Grand Ballroom`}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Set `,(0,N.jsx)(`code`,{children:`iconOrientation="vertical"`}),` to stack the icon above the title block.`]})}),(0,N.jsx)(A.Footer,{children:(0,N.jsx)(p,{children:`Open event`})})]})},U={name:`Custom header`,render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{icon:(0,N.jsx)(a,{}),children:(0,N.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-1`,children:[(0,N.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,N.jsx)(`h2`,{className:`font-medium text-base text-primary leading-tight`,children:`Adit & Sari wedding`}),(0,N.jsx)(d,{color:`green`,children:`Confirmed`})]}),(0,N.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Saturday, 12 October 2026 · Grand Ballroom`})]})}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`When `,(0,N.jsx)(`code`,{children:`title`}),` / `,(0,N.jsx)(`code`,{children:`description`}),` props are not enough, pass any content as`,` `,(0,N.jsx)(`code`,{children:`Modal.Header`}),` children to build a custom header.`]})}),(0,N.jsx)(A.Footer,{children:(0,N.jsx)(p,{children:`Open event`})})]})},W={name:`Custom close button`,render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Soft close`,description:`Tweak the auto close button through closeButtonProps.`,closeButtonProps:{variant:`subtle`,color:`neutral`}}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`The close button is a `,(0,N.jsx)(`code`,{children:`Button.Icon`}),` defaulting to `,(0,N.jsx)(`code`,{children:`variant="text"`}),`,`,` `,(0,N.jsx)(`code`,{children:`color="neutral"`}),`, and `,(0,N.jsx)(`code`,{children:`size="sm"`}),`. Override any of them here, or render an explicit`,` `,(0,N.jsx)(`code`,{children:`Modal.Close`}),` anywhere inside for full control.`]})}),(0,N.jsx)(A.Footer,{children:(0,N.jsx)(p,{children:`Got it`})})]})},G={name:`Without separator`,render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Soft edges`,description:`Header and footer separators are optional.`,separator:!1}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Turn both header and footer `,(0,N.jsx)(`code`,{children:`separator`}),` off for a seamless look.`]})}),(0,N.jsxs)(A.Footer,{separator:!1,children:[(0,N.jsx)(p,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,N.jsx)(p,{children:`Continue`})]})]})},K={name:`Header separator only`,render:e=>(0,N.jsxs)(A,{...e,defaultOpen:!0,children:[(0,N.jsx)(A.Header,{title:`Header separator only`,description:`The footer border is turned off.`}),(0,N.jsx)(A.Body,{children:(0,N.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[(0,N.jsx)(`code`,{children:`Modal.Header`}),` and `,(0,N.jsx)(`code`,{children:`Modal.Footer`}),` toggle each border independently through`,` `,(0,N.jsx)(`code`,{children:`separator`}),`.`]})}),(0,N.jsxs)(A.Footer,{separator:!1,children:[(0,N.jsx)(p,{variant:`outline`,color:`neutral`,children:`Cancel`}),(0,N.jsx)(p,{children:`Continue`})]})]})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header title="Edit event" description="Update the details for Adit & Sari's wedding event." />
      <Modal.Body>
        <p className="text-sm text-tertiary">
          This dialog keeps the page behind it in place, traps keyboard focus, restores focus on close, and locks body
          scroll. Use <code>Modal.Header</code>, <code>Modal.Body</code>, and <code>Modal.Footer</code> to lay out forms
          and confirmations.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Save changes</Button>
      </Modal.Footer>
    </Modal>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: "Interactive trigger",
  render: function TriggerModal() {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header title="Publish invitation" description="The guest link goes live immediately after publishing." />
          <Modal.Body>
            <p className="text-sm text-tertiary">You can still edit the content after publishing.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Publish</Button>
          </Modal.Footer>
        </Modal>
      </>;
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <Modal {...args} size="lg" defaultOpen>
      <Modal.Header title="Edit vendor" description="Keep the vendor details up to date for the event timeline." />
      <Modal.Body>
        <form className="flex flex-col gap-4" onSubmit={event => event.preventDefault()}>
          <Field controlId="vendor-name">
            <Field.Label>Vendor name</Field.Label>
            <Field.Content>
              <Input id="vendor-name" defaultValue="Altar Decoration" />
            </Field.Content>
          </Field>
          <Field controlId="vendor-contact">
            <Field.Label>Contact person</Field.Label>
            <Field.Content>
              <Input id="vendor-contact" placeholder="Name or phone number" />
            </Field.Content>
          </Field>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Save vendor</Button>
      </Modal.Footer>
    </Modal>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header title="Terms & conditions" description="The body scrolls when the content is taller than the viewport." />
      <Modal.Body>
        <div className="flex flex-col gap-3">
          {clauses.map(clause => <p key={clause.id} className="text-sm text-tertiary">
              Clause {clause.id}: {clause.text}
            </p>)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Got it</Button>
      </Modal.Footer>
    </Modal>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <Modal {...args} showCloseIcon={false} defaultOpen>
      <Modal.Header title="Delete draft" description="This action cannot be undone." />
      <Modal.Body>
        <p className="text-sm text-tertiary">Choose an action below to continue.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" color="neutral">
          Keep draft
        </Button>
        <Button color="error">Delete</Button>
      </Modal.Footer>
    </Modal>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header icon={<CalendarDays />} title="Adit & Sari wedding" description="Saturday, 12 October 2026 · Grand Ballroom" />
      <Modal.Body>
        <p className="text-sm text-tertiary">
          The optional icon sits in a round surface before the title — handy for event, vendor, or status dialogs.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Open event</Button>
      </Modal.Footer>
    </Modal>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: "Icon / Vertical",
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header icon={<CalendarDays />} iconOrientation="vertical" title="Adit & Sari wedding" description="Saturday, 12 October 2026 · Grand Ballroom" />
      <Modal.Body>
        <p className="text-sm text-tertiary">
          Set <code>iconOrientation="vertical"</code> to stack the icon above the title block.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Open event</Button>
      </Modal.Footer>
    </Modal>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: "Custom header",
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header icon={<CalendarDays />}>
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-base text-primary leading-tight">Adit & Sari wedding</h2>
            <Badge color="green">Confirmed</Badge>
          </div>
          <p className="text-sm text-tertiary">Saturday, 12 October 2026 · Grand Ballroom</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-tertiary">
          When <code>title</code> / <code>description</code> props are not enough, pass any content as{" "}
          <code>Modal.Header</code> children to build a custom header.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Open event</Button>
      </Modal.Footer>
    </Modal>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: "Custom close button",
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header title="Soft close" description="Tweak the auto close button through closeButtonProps." closeButtonProps={{
      variant: "subtle",
      color: "neutral"
    }} />
      <Modal.Body>
        <p className="text-sm text-tertiary">
          The close button is a <code>Button.Icon</code> defaulting to <code>variant="text"</code>,{" "}
          <code>color="neutral"</code>, and <code>size="sm"</code>. Override any of them here, or render an explicit{" "}
          <code>Modal.Close</code> anywhere inside for full control.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Got it</Button>
      </Modal.Footer>
    </Modal>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: "Without separator",
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header title="Soft edges" description="Header and footer separators are optional." separator={false} />
      <Modal.Body>
        <p className="text-sm text-tertiary">
          Turn both header and footer <code>separator</code> off for a seamless look.
        </p>
      </Modal.Body>
      <Modal.Footer separator={false}>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Continue</Button>
      </Modal.Footer>
    </Modal>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "Header separator only",
  render: args => <Modal {...args} defaultOpen>
      <Modal.Header title="Header separator only" description="The footer border is turned off." />
      <Modal.Body>
        <p className="text-sm text-tertiary">
          <code>Modal.Header</code> and <code>Modal.Footer</code> toggle each border independently through{" "}
          <code>separator</code>.
        </p>
      </Modal.Body>
      <Modal.Footer separator={false}>
        <Button variant="outline" color="neutral">
          Cancel
        </Button>
        <Button>Continue</Button>
      </Modal.Footer>
    </Modal>
}`,...K.parameters?.docs?.source}}},q=[`Default`,`Trigger`,`Form`,`LongContent`,`WithoutCloseIcon`,`WithIcon`,`IconVertical`,`CustomHeader`,`CustomCloseButton`,`WithoutSeparator`,`HeaderOnlySeparator`]})))()}J();export{W as CustomCloseButton,U as CustomHeader,I as Default,R as Form,K as HeaderOnlySeparator,H as IconVertical,z as LongContent,L as Trigger,V as WithIcon,B as WithoutCloseIcon,G as WithoutSeparator,q as __namedExportsOrder,P as default};