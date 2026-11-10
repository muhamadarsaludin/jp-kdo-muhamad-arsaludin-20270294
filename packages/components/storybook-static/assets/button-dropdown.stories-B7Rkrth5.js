import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./createLucideIcon-b5K2wI9V.js";import{n as a,t as o}from"./chevron-down-DMJ7MIjn.js";import{a as s,c,i as l,n as u,o as d,r as f,s as p,t as m}from"./dropdown-BHx0cs8E.js";import{n as h,t as g}from"./download-DmSXzoJo.js";import{n as _,t as v}from"./cn-BksUxDMQ.js";import{n as y,t as b}from"./button-BSiNW2bO.js";var x,S;function C(){return(C=e((()=>{r(),x={name:`archive`,size:24,node:[[`rect`,{width:`20`,height:`5`,x:`2`,y:`3`,rx:`1`,key:`1wp1u1`}],[`path`,{d:`M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8`,key:`1s80jp`}],[`path`,{d:`M10 12h4`,key:`a56b0p`}]]},x.node,S=i(x)})))()}var w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{w=t(),_(),a(),y(),u(),T=n(),E=(0,w.createContext)({size:`md`,variant:`solid`,color:`brand`,shape:`rounded`,disabled:!1}),D=`focus-visible:[clip-path:inset(-8px_0_-8px_-8px)]`,O=`[clip-path:inset(-8px_-8px_-8px_1px)]`,k={brand:`border-brand-primary`,neutral:`border-primary`,inverse:`border-primary-inverse`,error:`border-error-primary`},A=(0,w.forwardRef)(function({size:e=`md`,variant:t=`solid`,color:n=`brand`,shape:r=`rounded`,disabled:i=!1,className:a,children:o,...s},c){return(0,T.jsx)(E.Provider,{value:{size:e,variant:t,color:n,shape:r,disabled:i},children:(0,T.jsx)(`div`,{ref:c,className:v(`inline-flex`,a),...s,children:o})})}),A.displayName=`ButtonDropdown`,j=(0,w.forwardRef)(function({className:e,disabled:t=!1,children:n,startContent:r,endContent:i,...a},o){let s=(0,w.useContext)(E);return(0,T.jsx)(b,{ref:o,size:s.size,variant:s.variant,color:s.color,shape:s.shape,disabled:s.disabled||t,startContent:r,endContent:i,className:v(`rounded-r-none`,D,e),...a,children:n})}),j.displayName=`ButtonDropdown.Action`,M=(0,w.forwardRef)(function({menu:e,defaultPosition:t=`bottom-end`,offset:n,open:r,defaultOpen:i=!1,onOpenChange:a,selectionMode:s,value:c,defaultValue:l,onValueChange:u,selectionIndicator:d,selectionPosition:f,menuClassName:p,disabled:h=!1,className:g,children:_,...y},x){let S=(0,w.useContext)(E),C=S.disabled||h,D=S.variant===`solid`,[A,j]=(0,w.useState)(i),M=r??A,N=e=>{r===void 0&&j(e),a?.(e)},P=_??(0,T.jsx)(o,{"aria-hidden":`true`,className:v(`transition-transform`,M&&`-rotate-180`)}),F=(0,T.jsx)(b.Icon,{ref:x,size:S.size,variant:S.variant,color:S.color,shape:S.shape,"aria-haspopup":e===void 0?void 0:`menu`,"aria-expanded":e===void 0?void 0:M,disabled:C,className:v(`-ml-px rounded-l-none`,O,`border-l-2`,D?`border-current`:k[S.color],g),...y,children:P});return e===void 0?F:(0,T.jsx)(m,{trigger:F,position:t,offset:n,open:r,defaultOpen:i,onOpenChange:N,disabled:C,triggerClassName:`-ml-px`,"aria-label":y[`aria-label`],selectionMode:s,value:c,defaultValue:l,onValueChange:u,selectionIndicator:d,selectionPosition:f,menuClassName:p,children:e})}),M.displayName=`ButtonDropdown.Trigger`,N=Object.assign(A,{Action:j,Trigger:M}),A.__docgenInfo={description:``,methods:[],displayName:`ButtonDropdown`,props:{size:{required:!1,tsType:{name:`union`,raw:`"xs" | "sm" | "md" | "lg" | "xl"`,elements:[{name:`literal`,value:`"xs"`},{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`},{name:`literal`,value:`"xl"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}},variant:{required:!1,tsType:{name:`NonNullable`,elements:[{name:`VariantProps["variant"]`,raw:`VariantProps<typeof buttonVariants>["variant"]`}],raw:`NonNullable<VariantProps<typeof buttonVariants>["variant"]>`},description:``,defaultValue:{value:`"solid"`,computed:!1}},color:{required:!1,tsType:{name:`NonNullable`,elements:[{name:`VariantProps["color"]`,raw:`VariantProps<typeof buttonVariants>["color"]`}],raw:`NonNullable<VariantProps<typeof buttonVariants>["color"]>`},description:``,defaultValue:{value:`"brand"`,computed:!1}},shape:{required:!1,tsType:{name:`union`,raw:`"rounded" | "pill"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"pill"`}]},description:``,defaultValue:{value:`"rounded"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:``}}}})))()}function F(){return(0,L.jsx)(L.Fragment,{children:z.map(e=>(0,L.jsx)(m.Item,{value:e.key,icon:e.startContent,children:e.label},e.key))})}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X;function Z(){return(Z=e((()=>{I=t(),_(),C(),c(),h(),d(),l(),u(),P(),L=n(),R={title:`Components/ButtonDropdown`,component:N,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},variant:{control:`select`,options:[`solid`,`subtle`,`outline`,`text`]},color:{control:`select`,options:[`brand`,`neutral`,`inverse`,`error`]},shape:{control:`select`,options:[`rounded`,`pill`]},disabled:{control:`boolean`}},args:{size:`md`,variant:`solid`,color:`brand`,shape:`rounded`,disabled:!1}},z=[{key:`edit`,label:`Edit`,startContent:(0,L.jsx)(s,{})},{key:`duplicate`,label:`Duplicate`,startContent:(0,L.jsx)(p,{})},{key:`archive`,label:`Archive`,startContent:(0,L.jsx)(S,{})},{key:`delete`,label:`Delete`,startContent:(0,L.jsx)(f,{})}],B={render:e=>(0,L.jsxs)(N,{...e,children:[(0,L.jsx)(N.Action,{children:`Publish`}),(0,L.jsx)(N.Trigger,{"aria-label":`More publish options`,menu:(0,L.jsx)(F,{})})]})},V=[`brand`,`neutral`,`inverse`,`error`],H=[`solid`,`subtle`,`outline`,`text`],U={render:e=>(0,L.jsxs)(`div`,{className:`inline-flex flex-col gap-3`,children:[(0,L.jsxs)(`div`,{className:`grid grid-cols-[4rem_repeat(4,minmax(7rem,auto))] items-center gap-3 px-4`,children:[(0,L.jsx)(`span`,{}),H.map(e=>(0,L.jsx)(`span`,{className:`text-center font-medium text-primary text-sm capitalize`,children:e},e))]}),V.map(t=>(0,L.jsxs)(`div`,{className:v(`grid grid-cols-[4rem_repeat(4,minmax(7rem,auto))] items-center gap-3 rounded-xl p-4`,t===`inverse`&&`bg-primary-inverse`),children:[(0,L.jsx)(`span`,{className:v(`font-medium text-sm capitalize`,t===`inverse`?`text-primary-inverse`:`text-primary`),children:t}),H.map(n=>(0,L.jsx)(`div`,{className:`flex justify-center`,children:(0,L.jsxs)(N,{...e,color:t,variant:n,children:[(0,L.jsx)(N.Action,{children:n}),(0,L.jsx)(N.Trigger,{"aria-label":`More ${n} ${t} options`,menu:(0,L.jsx)(F,{})})]})},n))]},t))]})},W={render:e=>(0,L.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,L.jsxs)(N,{...e,variant:`solid`,children:[(0,L.jsx)(N.Action,{children:`Solid`}),(0,L.jsx)(N.Trigger,{"aria-label":`More solid options`,menu:(0,L.jsx)(F,{})})]}),(0,L.jsxs)(N,{...e,variant:`subtle`,children:[(0,L.jsx)(N.Action,{children:`Subtle`}),(0,L.jsx)(N.Trigger,{"aria-label":`More subtle options`,menu:(0,L.jsx)(F,{})})]}),(0,L.jsxs)(N,{...e,variant:`outline`,children:[(0,L.jsx)(N.Action,{children:`Outline`}),(0,L.jsx)(N.Trigger,{"aria-label":`More outline options`,menu:(0,L.jsx)(F,{})})]}),(0,L.jsxs)(N,{...e,variant:`text`,children:[(0,L.jsx)(N.Action,{children:`Text`}),(0,L.jsx)(N.Trigger,{"aria-label":`More text options`,menu:(0,L.jsx)(F,{})})]})]})},G={render:e=>(0,L.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,L.jsxs)(N,{...e,size:`sm`,children:[(0,L.jsx)(N.Action,{children:`Small`}),(0,L.jsx)(N.Trigger,{"aria-label":`More small options`,menu:(0,L.jsx)(F,{})})]}),(0,L.jsxs)(N,{...e,size:`md`,children:[(0,L.jsx)(N.Action,{children:`Medium`}),(0,L.jsx)(N.Trigger,{"aria-label":`More medium options`,menu:(0,L.jsx)(F,{})})]}),(0,L.jsxs)(N,{...e,size:`lg`,children:[(0,L.jsx)(N.Action,{children:`Large`}),(0,L.jsx)(N.Trigger,{"aria-label":`More large options`,menu:(0,L.jsx)(F,{})})]})]})},K={render:e=>(0,L.jsxs)(N,{...e,shape:`pill`,variant:`outline`,children:[(0,L.jsx)(N.Action,{children:`Share`}),(0,L.jsx)(N.Trigger,{"aria-label":`More pill options`,menu:(0,L.jsx)(F,{})})]})},q={render:e=>(0,L.jsxs)(N,{...e,disabled:!0,children:[(0,L.jsx)(N.Action,{children:`Publish`}),(0,L.jsx)(N.Trigger,{"aria-label":`More publish options`,menu:(0,L.jsx)(F,{})})]})},J={render:function(e){let[t,n]=(0,I.useState)(!1),[r,i]=(0,I.useState)(`edit`);return(0,L.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,L.jsxs)(N,{...e,children:[(0,L.jsxs)(N.Action,{startContent:(0,L.jsx)(g,{}),children:[`Export`,` (${r})`]}),(0,L.jsx)(N.Trigger,{"aria-label":`More export options`,menu:(0,L.jsx)(F,{}),selectionMode:`single`,value:r,onValueChange:i,open:t,onOpenChange:n})]}),(0,L.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Selected: `,r]})]})}},Y={render:e=>(0,L.jsxs)(N,{...e,variant:`outline`,children:[(0,L.jsx)(N.Action,{children:`Save`}),(0,L.jsx)(N.Trigger,{"aria-label":`Save options`})]})},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonDropdown {...args}>
      <ButtonDropdown.Action>Publish</ButtonDropdown.Action>
      <ButtonDropdown.Trigger aria-label="More publish options" menu={<TrayMenu />} />
    </ButtonDropdown>
}`,...B.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => <div className="inline-flex flex-col gap-3">
      <div className="grid grid-cols-[4rem_repeat(4,minmax(7rem,auto))] items-center gap-3 px-4">
        <span />
        {dropdownVariants.map(variant => <span key={variant} className="text-center font-medium text-primary text-sm capitalize">
            {variant}
          </span>)}
      </div>
      {dropdownColors.map(color => <div key={color} className={cn("grid grid-cols-[4rem_repeat(4,minmax(7rem,auto))] items-center gap-3 rounded-xl p-4", color === "inverse" && "bg-primary-inverse")}>
          <span className={cn("font-medium text-sm capitalize", color === "inverse" ? "text-primary-inverse" : "text-primary")}>
            {color}
          </span>
          {dropdownVariants.map(variant => <div key={variant} className="flex justify-center">
              <ButtonDropdown {...args} color={color} variant={variant}>
                <ButtonDropdown.Action>{variant}</ButtonDropdown.Action>
                <ButtonDropdown.Trigger aria-label={\`More \${variant} \${color} options\`} menu={<TrayMenu />} />
              </ButtonDropdown>
            </div>)}
        </div>)}
    </div>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-4">
      <ButtonDropdown {...args} variant="solid">
        <ButtonDropdown.Action>Solid</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More solid options" menu={<TrayMenu />} />
      </ButtonDropdown>
      <ButtonDropdown {...args} variant="subtle">
        <ButtonDropdown.Action>Subtle</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More subtle options" menu={<TrayMenu />} />
      </ButtonDropdown>
      <ButtonDropdown {...args} variant="outline">
        <ButtonDropdown.Action>Outline</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More outline options" menu={<TrayMenu />} />
      </ButtonDropdown>
      <ButtonDropdown {...args} variant="text">
        <ButtonDropdown.Action>Text</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More text options" menu={<TrayMenu />} />
      </ButtonDropdown>
    </div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-4">
      <ButtonDropdown {...args} size="sm">
        <ButtonDropdown.Action>Small</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More small options" menu={<TrayMenu />} />
      </ButtonDropdown>
      <ButtonDropdown {...args} size="md">
        <ButtonDropdown.Action>Medium</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More medium options" menu={<TrayMenu />} />
      </ButtonDropdown>
      <ButtonDropdown {...args} size="lg">
        <ButtonDropdown.Action>Large</ButtonDropdown.Action>
        <ButtonDropdown.Trigger aria-label="More large options" menu={<TrayMenu />} />
      </ButtonDropdown>
    </div>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonDropdown {...args} shape="pill" variant="outline">
      <ButtonDropdown.Action>Share</ButtonDropdown.Action>
      <ButtonDropdown.Trigger aria-label="More pill options" menu={<TrayMenu />} />
    </ButtonDropdown>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonDropdown {...args} disabled>
      <ButtonDropdown.Action>Publish</ButtonDropdown.Action>
      <ButtonDropdown.Trigger aria-label="More publish options" menu={<TrayMenu />} />
    </ButtonDropdown>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: function ControlledSelectionDropdown(args) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("edit");
    return <div className="flex flex-col gap-3">
        <ButtonDropdown {...args}>
          <ButtonDropdown.Action startContent={<Download />}>Export{\` (\${selected})\`}</ButtonDropdown.Action>
          <ButtonDropdown.Trigger aria-label="More export options" menu={<TrayMenu />} selectionMode="single" value={selected} onValueChange={setSelected} open={open} onOpenChange={setOpen} />
        </ButtonDropdown>
        <p className="text-sm text-tertiary">Selected: {selected}</p>
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonDropdown {...args} variant="outline">
      <ButtonDropdown.Action>Save</ButtonDropdown.Action>
      <ButtonDropdown.Trigger aria-label="Save options" />
    </ButtonDropdown>
}`,...Y.parameters?.docs?.source}}},X=[`Default`,`Colors`,`Variants`,`Sizes`,`Pill`,`Disabled`,`ControlledSelection`,`PlainSplit`]})))()}Z();export{U as Colors,J as ControlledSelection,B as Default,q as Disabled,K as Pill,Y as PlainSplit,G as Sizes,W as Variants,X as __namedExportsOrder,R as default};