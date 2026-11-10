import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./lock-pCX8JBs_.js";import{n as a,t as ee}from"./x-Th8ClwsL.js";import{n as o,t as s}from"./cn-BksUxDMQ.js";import{n as c,t as l}from"./badge-De8Hay21.js";import{n as u,t as d}from"./button-BSiNW2bO.js";import{n as f,t as te}from"./field-context-C6liZpf3.js";import{c as ne,f as re,h as ie,i as ae,l as oe,m as se,o as ce,s as le,t as p,y as ue}from"./input-variants-BLR_PGDJ.js";import{n as m,t as de}from"./input-base-ihl3dn1V.js";import{n as h,t as g}from"./field-DWHIWe24.js";import{n as fe,t as _}from"./use-file-select-ChqGbfVC.js";import{n as v,t as pe}from"./tooltip-DbXyqJcl.js";var y,b,x,S,C,w;function T(){return(T=e((()=>{y=t(),o(),a(),c(),u(),f(),m(),p(),_(),v(),b=n(),x={xs:`xs`,sm:`xs`,md:`sm`,lg:`sm`,xl:`md`},S={xs:`sm`,sm:`sm`,md:`sm`,lg:`md`,xl:`lg`},C=s(`flex shrink-0 items-stretch bg-quaternary font-medium`,`[&>button]:h-auto [&>button]:shrink-0 [&>button]:self-stretch [&>button]:rounded-none`,`[&>button]:motion-safe:active:scale-100! [&>button]:focus-visible:outline-none! [&>button]:focus-visible:ring-0!`,`[&>*+*]:border-l [&>*+*]:border-primary`),w=(0,y.forwardRef)(function({accept:e,maxBytes:t,maxFiles:n,maxTotalBytes:r,multiple:i,disabled:a=!1,status:o,size:c=`md`,startContent:u,endContent:f,startAddOnContent:p,endAddOnContent:m,showButton:h=!0,buttonLabel:g=`Browse`,buttonProps:_,buttonPosition:v=`end`,removable:w=!0,removeLabel:T=`Remove file`,onRemove:E,showCountBadge:D=!0,countBadgeProps:O,showCountBadgeTooltip:k=!0,countBadgeTooltipLimit:A=5,placeholder:j=`No file selected`,value:M,onFiles:N,onError:P,"aria-label":F,className:I,...L},R){let z=(0,y.useContext)(te),B=o??z?.status??`default`,V=(0,y.useId)(),H=z?.controlId??V,[U,W]=(0,y.useState)([]),{getInputProps:G,open:K}=fe({accept:e,maxBytes:t,maxFiles:n,maxTotalBytes:r,multiple:i,disabled:a,onFiles:e=>{W(e),N?.(e)},onError:P}),q=M;if(q===void 0){let[e]=U;q=e?.name??``}let J=M===void 0?Math.max(0,U.length-1):0,me=D&&J>0,Y=J>0?U.slice(1):[],X=Y.slice(0,A),Z=Y.length-X.length,he=q.length>0,ge=w&&he&&!a,_e=e=>{e.preventDefault(),W([]),E?.()},ve=e=>{a||(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),K())},Q=s(ae,ue[c],ce[c]),$=e=>{let t=e===`start`?p:m,n=[];h&&v===e&&n.push((0,b.jsx)(d,{..._,"data-slot":`file-input-browse`,type:`button`,size:_?.size??x[c],variant:_?.variant??`solid`,color:_?.color??`brand`,disabled:a,onClick:K,className:_?.className,children:_?.children??g},`browse`));let r=t?(0,b.jsx)(y.Fragment,{children:t},`custom`):null,i=(e===`start`?[r,...n]:[...n,r]).filter(Boolean);return i.length===0?null:(0,b.jsx)(`div`,{"data-slot":`file-input-${e}`,className:s(C,e===`start`?`border-primary border-r`:`border-primary border-l`),children:i})};return(0,b.jsxs)(`div`,{...L,ref:R,"data-slot":`file-input`,"data-status":B,className:s(`flex w-full min-w-0 items-stretch overflow-hidden rounded-lg bg-primary`,le,ie[B],se[B],ne[c],a&&`cursor-not-allowed opacity-50`,I),children:[(0,b.jsx)(`input`,{...G()}),$(`start`),(0,b.jsxs)(`div`,{className:re,children:[u&&(0,b.jsx)(`div`,{className:Q,children:u}),(0,b.jsx)(de,{id:H,"aria-label":F,"aria-describedby":z?.descriptionPresent?z.descriptionId:void 0,"data-slot":`file-input-value`,className:s(`flex-1 truncate text-sm`,a?`cursor-not-allowed!`:`cursor-pointer!`),size:c,type:`text`,value:q,placeholder:j,readOnly:!0,disabled:a,onClick:K,onKeyDown:ve}),me&&(0,b.jsx)(pe,{disabled:!k,contentClassName:`max-w-64 text-left`,trigger:(0,b.jsx)(l,{...O,"data-slot":`file-input-count`,tabIndex:0,size:O?.size??S[c],variant:O?.variant??`subtle`,color:O?.color??`neutral`,className:s(`shrink-0 focus-visible:outline-2 focus-visible:outline-brand-primary/50`,O?.className),children:`+${J}`}),children:(0,b.jsxs)(`span`,{className:`flex flex-col gap-0.5`,children:[X.map(e=>(0,b.jsx)(`span`,{className:`block max-w-60 truncate`,children:e.name},`${e.name}-${e.size}-${e.lastModified}`)),Z>0&&(0,b.jsx)(`span`,{className:`opacity-70`,children:`+${Z} more`})]})}),ge&&(0,b.jsx)(`button`,{type:`button`,"data-slot":`file-input-remove`,"aria-label":T,onMouseDown:e=>e.preventDefault(),onClick:_e,className:s(`flex shrink-0 cursor-pointer items-center justify-center rounded-md -m-1 p-1 text-tertiary outline-1 -outline-offset-1 outline-transparent transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50 disabled:cursor-not-allowed disabled:text-quaternary disabled:hover:bg-transparent`),children:(0,b.jsx)(ee,{className:oe[c]})}),f&&(0,b.jsx)(`div`,{className:Q,children:f})]}),$(`end`)]})}),w.__docgenInfo={description:``,methods:[],displayName:`FileInput`,props:{accept:{required:!1,tsType:{name:`string`},description:``},maxBytes:{required:!1,tsType:{name:`number`},description:``},maxFiles:{required:!1,tsType:{name:`number`},description:``},maxTotalBytes:{required:!1,tsType:{name:`number`},description:``},multiple:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},status:{required:!1,tsType:{name:`union`,raw:`"default" | "warning" | "error" | "success"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"warning"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"success"`}]},description:``},size:{required:!1,tsType:{name:`union`,raw:`"xs" | "sm" | "md" | "lg" | "xl"`,elements:[{name:`literal`,value:`"xs"`},{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`},{name:`literal`,value:`"xl"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}},startContent:{required:!1,tsType:{name:`ReactNode`},description:``},endContent:{required:!1,tsType:{name:`ReactNode`},description:``},startAddOnContent:{required:!1,tsType:{name:`ReactNode`},description:``},endAddOnContent:{required:!1,tsType:{name:`ReactNode`},description:``},showButton:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},buttonLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Browse"`,computed:!1}},buttonProps:{required:!1,tsType:{name:`Omit`,elements:[{name:`intersection`,raw:`ButtonOwnProps &
Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | "color" | "size"> & {
  as?: C;
  ref?: ComponentPropsWithRef<C>["ref"];
}`,elements:[{name:`signature`,type:`object`,raw:`{
  href?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  /**
   * Quiet label at rest (\`text-tertiary\`) that firms up to \`text-primary\` on
   * hover — for tertiary chrome such as rail or toolbar actions. Ignored on
   * \`variant="solid"\` and on the \`brand\`/\`error\` colors, which carry their own
   * emphasis.
   */
  muted?: boolean;
  size?: ButtonSize;
  shape?: Shape;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  className?: string;
}`,signature:{properties:[{key:`href`,value:{name:`string`,required:!1}},{key:`variant`,value:{name:`NonNullable`,elements:[{name:`VariantProps["variant"]`,raw:`VariantProps<typeof buttonVariants>["variant"]`}],raw:`NonNullable<VariantProps<typeof buttonVariants>["variant"]>`,required:!1}},{key:`color`,value:{name:`NonNullable`,elements:[{name:`VariantProps["color"]`,raw:`VariantProps<typeof buttonVariants>["color"]`}],raw:`NonNullable<VariantProps<typeof buttonVariants>["color"]>`,required:!1}},{key:`muted`,value:{name:`boolean`,required:!1},description:'Quiet label at rest (`text-tertiary`) that firms up to `text-primary` on\nhover — for tertiary chrome such as rail or toolbar actions. Ignored on\n`variant="solid"` and on the `brand`/`error` colors, which carry their own\nemphasis.'},{key:`size`,value:{name:`union`,raw:`"xs" | "sm" | "md" | "lg" | "xl"`,elements:[{name:`literal`,value:`"xs"`},{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`},{name:`literal`,value:`"xl"`}],required:!1}},{key:`shape`,value:{name:`union`,raw:`"rounded" | "pill"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"pill"`}],required:!1}},{key:`loading`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`fullWidth`,value:{name:`boolean`,required:!1}},{key:`startContent`,value:{name:`ReactNode`,required:!1}},{key:`endContent`,value:{name:`ReactNode`,required:!1}},{key:`children`,value:{name:`ReactNode`,required:!1}},{key:`type`,value:{name:`union`,raw:`"button" | "submit" | "reset"`,elements:[{name:`literal`,value:`"button"`},{name:`literal`,value:`"submit"`},{name:`literal`,value:`"reset"`}],required:!1}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`(event: ReactMouseEvent<HTMLButtonElement>) => void`,signature:{arguments:[{type:{name:`ReactMouseEvent`,elements:[{name:`HTMLButtonElement`}],raw:`ReactMouseEvent<HTMLButtonElement>`},name:`event`}],return:{name:`void`}},required:!1}},{key:`className`,value:{name:`string`,required:!1}}]}},{name:`Omit`,elements:[{name:`ComponentPropsWithoutRef`,elements:[{name:`C`}],raw:`ComponentPropsWithoutRef<C>`},{name:`union`,raw:`keyof ButtonOwnProps | "color" | "size"`,elements:[{name:`signature`,type:`object`,raw:`{
  href?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  /**
   * Quiet label at rest (\`text-tertiary\`) that firms up to \`text-primary\` on
   * hover — for tertiary chrome such as rail or toolbar actions. Ignored on
   * \`variant="solid"\` and on the \`brand\`/\`error\` colors, which carry their own
   * emphasis.
   */
  muted?: boolean;
  size?: ButtonSize;
  shape?: Shape;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  className?: string;
}`,signature:{properties:[{key:`href`,value:{name:`string`,required:!1}},{key:`variant`,value:{name:`NonNullable`,elements:[{name:`VariantProps["variant"]`,raw:`VariantProps<typeof buttonVariants>["variant"]`}],raw:`NonNullable<VariantProps<typeof buttonVariants>["variant"]>`,required:!1}},{key:`color`,value:{name:`NonNullable`,elements:[{name:`VariantProps["color"]`,raw:`VariantProps<typeof buttonVariants>["color"]`}],raw:`NonNullable<VariantProps<typeof buttonVariants>["color"]>`,required:!1}},{key:`muted`,value:{name:`boolean`,required:!1},description:'Quiet label at rest (`text-tertiary`) that firms up to `text-primary` on\nhover — for tertiary chrome such as rail or toolbar actions. Ignored on\n`variant="solid"` and on the `brand`/`error` colors, which carry their own\nemphasis.'},{key:`size`,value:{name:`union`,raw:`"xs" | "sm" | "md" | "lg" | "xl"`,elements:[{name:`literal`,value:`"xs"`},{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`},{name:`literal`,value:`"xl"`}],required:!1}},{key:`shape`,value:{name:`union`,raw:`"rounded" | "pill"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"pill"`}],required:!1}},{key:`loading`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`fullWidth`,value:{name:`boolean`,required:!1}},{key:`startContent`,value:{name:`ReactNode`,required:!1}},{key:`endContent`,value:{name:`ReactNode`,required:!1}},{key:`children`,value:{name:`ReactNode`,required:!1}},{key:`type`,value:{name:`union`,raw:`"button" | "submit" | "reset"`,elements:[{name:`literal`,value:`"button"`},{name:`literal`,value:`"submit"`},{name:`literal`,value:`"reset"`}],required:!1}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`(event: ReactMouseEvent<HTMLButtonElement>) => void`,signature:{arguments:[{type:{name:`ReactMouseEvent`,elements:[{name:`HTMLButtonElement`}],raw:`ReactMouseEvent<HTMLButtonElement>`},name:`event`}],return:{name:`void`}},required:!1}},{key:`className`,value:{name:`string`,required:!1}}]}},{name:`literal`,value:`"color"`},{name:`literal`,value:`"size"`}]}],raw:`Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | "color" | "size">`},{name:`signature`,type:`object`,raw:`{
  as?: C;
  ref?: ComponentPropsWithRef<C>["ref"];
}`,signature:{properties:[{key:`as`,value:{name:`C`,required:!1}},{key:`ref`,value:{name:`ComponentPropsWithRef["ref"]`,raw:`ComponentPropsWithRef<C>["ref"]`,required:!1}}]}}]},{name:`union`,raw:`"as" | "ref" | "type" | "disabled" | "loading" | "fullWidth" | "shape" | "onClick"`,elements:[{name:`literal`,value:`"as"`},{name:`literal`,value:`"ref"`},{name:`literal`,value:`"type"`},{name:`literal`,value:`"disabled"`},{name:`literal`,value:`"loading"`},{name:`literal`,value:`"fullWidth"`},{name:`literal`,value:`"shape"`},{name:`literal`,value:`"onClick"`}]}],raw:`Omit<
  ButtonProps,
  "as" | "ref" | "type" | "disabled" | "loading" | "fullWidth" | "shape" | "onClick"
>`},description:``},buttonPosition:{required:!1,tsType:{name:`union`,raw:`"start" | "end"`,elements:[{name:`literal`,value:`"start"`},{name:`literal`,value:`"end"`}]},description:``,defaultValue:{value:`"end"`,computed:!1}},removable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},removeLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Remove file"`,computed:!1}},onRemove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},showCountBadge:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},countBadgeProps:{required:!1,tsType:{name:`Omit`,elements:[{name:`intersection`,raw:`ComponentPropsWithoutRef<"span"> & {
  shape?: Shape;
  size?: Size;
  variant?: BadgeVariant;
  color?: BadgeColor;
  borderless?: boolean;
  transparent?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
}`,elements:[{name:`ComponentPropsWithoutRef`,elements:[{name:`literal`,value:`"span"`}],raw:`ComponentPropsWithoutRef<"span">`},{name:`signature`,type:`object`,raw:`{
  shape?: Shape;
  size?: Size;
  variant?: BadgeVariant;
  color?: BadgeColor;
  borderless?: boolean;
  transparent?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
}`,signature:{properties:[{key:`shape`,value:{name:`union`,raw:`"rounded" | "pill"`,elements:[{name:`literal`,value:`"rounded"`},{name:`literal`,value:`"pill"`}],required:!1}},{key:`size`,value:{name:`union`,raw:`"sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}],required:!1}},{key:`variant`,value:{name:`NonNullable`,elements:[{name:`VariantProps["variant"]`,raw:`VariantProps<typeof badgeVariants>["variant"]`}],raw:`NonNullable<VariantProps<typeof badgeVariants>["variant"]>`,required:!1}},{key:`color`,value:{name:`unknown[number]`,raw:`(typeof badgeColors)[number]`,required:!1}},{key:`borderless`,value:{name:`boolean`,required:!1}},{key:`transparent`,value:{name:`boolean`,required:!1}},{key:`startContent`,value:{name:`ReactNode`,required:!1}},{key:`endContent`,value:{name:`ReactNode`,required:!1}},{key:`children`,value:{name:`ReactNode`,required:!1}}]}}]},{name:`literal`,value:`"children"`}],raw:`Omit<BadgeProps, "children">`},description:``},showCountBadgeTooltip:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},countBadgeTooltipLimit:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`5`,computed:!1}},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"No file selected"`,computed:!1}},value:{required:!1,tsType:{name:`string`},description:``},onFiles:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(files: File[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`File`}],raw:`File[]`},name:`files`}],return:{name:`void`}}},description:``},onError:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(error: FileSelectError) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  code: FileSelectErrorCode;
  file: File;
  message: string;
}`,signature:{properties:[{key:`code`,value:{name:`union`,raw:`"type" | "size" | "count" | "totalSize"`,elements:[{name:`literal`,value:`"type"`},{name:`literal`,value:`"size"`},{name:`literal`,value:`"count"`},{name:`literal`,value:`"totalSize"`}],required:!0}},{key:`file`,value:{name:`File`,required:!0}},{key:`message`,value:{name:`string`,required:!0}}]}},name:`error`}],return:{name:`void`}}},description:``}}}})))()}var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{r(),c(),u(),h(),T(),E=n(),D={title:`Components/FileInput`,component:w,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},status:{control:`select`,options:[`default`,`warning`,`error`,`success`]},buttonPosition:{control:`select`,options:[`start`,`end`]},disabled:{control:`boolean`},multiple:{control:`boolean`},showButton:{control:`boolean`},removable:{control:`boolean`},showCountBadge:{control:`boolean`},showCountBadgeTooltip:{control:`boolean`},countBadgeTooltipLimit:{control:{type:`number`,min:1,step:1}},maxFiles:{control:{type:`number`,min:1,step:1}},maxTotalBytes:{control:{type:`number`,min:0,step:1024}},buttonLabel:{control:`text`},removeLabel:{control:`text`},placeholder:{control:`text`},value:{control:`text`}},args:{size:`md`,buttonLabel:`Browse`,placeholder:`No file selected`},decorators:[e=>(0,E.jsx)(`div`,{className:`w-96`,children:(0,E.jsx)(e,{})})]},O={},k={args:{value:`wedding-contract.pdf`}},A={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(w,{...e,size:`xs`,value:`wedding-contract.pdf`}),(0,E.jsx)(w,{...e,size:`sm`,value:`wedding-contract.pdf`}),(0,E.jsx)(w,{...e,size:`md`,value:`wedding-contract.pdf`}),(0,E.jsx)(w,{...e,size:`lg`,value:`wedding-contract.pdf`}),(0,E.jsx)(w,{...e,size:`xl`,value:`wedding-contract.pdf`})]})},j={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(w,{...e,status:`default`,value:`wedding-contract.pdf`}),(0,E.jsx)(w,{...e,status:`warning`,value:`wedding-contract.pdf`}),(0,E.jsx)(w,{...e,status:`error`,value:`too-large.pdf`}),(0,E.jsx)(w,{...e,status:`success`,value:`wedding-contract.pdf`})]})},M={args:{disabled:!0,value:`wedding-contract.pdf`}},N={args:{multiple:!0}},P={args:{multiple:!0,accept:`image/*`,maxFiles:10,maxTotalBytes:20971520}},F={render:e=>(0,E.jsx)(w,{...e,value:`photo-1.png`,endContent:(0,E.jsx)(l,{size:`sm`,variant:`subtle`,color:`neutral`,children:`+2`})})},I={args:{showButton:!1,value:`wedding-contract.pdf`}},L={args:{value:`wedding-contract.pdf`,removable:!1}},R={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(w,{...e,buttonLabel:`Upload`,buttonProps:{color:`error`,variant:`subtle`}}),(0,E.jsx)(w,{...e,buttonProps:{color:`neutral`,variant:`solid`,children:`Choose file`}}),(0,E.jsx)(w,{...e,buttonProps:{color:`brand`,variant:`outline`}})]})},z={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(w,{...e,buttonPosition:`start`}),(0,E.jsx)(w,{...e,value:`wedding-contract.pdf`,buttonPosition:`start`,endAddOnContent:(0,E.jsx)(d,{type:`button`,variant:`subtle`,color:`error`,children:`Remove`})})]})},B={render:e=>(0,E.jsx)(w,{...e,value:`wedding-contract.pdf`,endContent:(0,E.jsx)(d,{type:`submit`,size:`xs`,variant:`subtle`,color:`brand`,children:`Publish`})})},V={render:e=>(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,E.jsx)(w,{...e,value:`wedding-contract.pdf`,endAddOnContent:(0,E.jsx)(d,{type:`button`,variant:`subtle`,color:`error`,children:`Remove`})}),(0,E.jsx)(w,{...e,value:`wedding-contract.pdf`,startAddOnContent:(0,E.jsx)(d,{type:`button`,variant:`subtle`,color:`neutral`,"aria-label":`Preview`,children:(0,E.jsx)(i,{})})})]})},H={render:e=>(0,E.jsx)(w,{...e,value:`wedding-contract.pdf`,startContent:(0,E.jsx)(i,{}),endContent:`PDF`})},U={render:e=>(0,E.jsx)(w,{...e,value:`wedding-contract.pdf`,startContent:(0,E.jsx)(i,{}),endContent:`PDF`,endAddOnContent:(0,E.jsx)(d,{type:`button`,variant:`subtle`,color:`error`,children:`Remove`})})},W={render:()=>(0,E.jsxs)(g,{children:[(0,E.jsx)(g.Label,{children:`Attachment`}),(0,E.jsx)(g.Content,{children:(0,E.jsx)(w,{onFiles:()=>void 0})}),(0,E.jsx)(g.Footer,{children:(0,E.jsx)(g.HelperText,{children:`PDF up to 10 MB.`})})]})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    value: "wedding-contract.pdf"
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      <FileInput {...args} size="xs" value="wedding-contract.pdf" />
      <FileInput {...args} size="sm" value="wedding-contract.pdf" />
      <FileInput {...args} size="md" value="wedding-contract.pdf" />
      <FileInput {...args} size="lg" value="wedding-contract.pdf" />
      <FileInput {...args} size="xl" value="wedding-contract.pdf" />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      <FileInput {...args} status="default" value="wedding-contract.pdf" />
      <FileInput {...args} status="warning" value="wedding-contract.pdf" />
      <FileInput {...args} status="error" value="too-large.pdf" />
      <FileInput {...args} status="success" value="wedding-contract.pdf" />
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: "wedding-contract.pdf"
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    multiple: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    multiple: true,
    accept: "image/*",
    maxFiles: 10,
    maxTotalBytes: 20 * 1024 * 1024
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <FileInput {...args} value="photo-1.png" endContent={<Badge size="sm" variant="subtle" color="neutral">
          +2
        </Badge>} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    showButton: false,
    value: "wedding-contract.pdf"
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    value: "wedding-contract.pdf",
    removable: false
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      <FileInput {...args} buttonLabel="Upload" buttonProps={{
      color: "error",
      variant: "subtle"
    }} />
      <FileInput {...args} buttonProps={{
      color: "neutral",
      variant: "solid",
      children: "Choose file"
    }} />
      <FileInput {...args} buttonProps={{
      color: "brand",
      variant: "outline"
    }} />
    </div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      <FileInput {...args} buttonPosition="start" />
      <FileInput {...args} value="wedding-contract.pdf" buttonPosition="start" endAddOnContent={<Button type="button" variant="subtle" color="error">
            Remove
          </Button>} />
    </div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <FileInput {...args} value="wedding-contract.pdf" endContent={<Button type="submit" size="xs" variant="subtle" color="brand">
          Publish
        </Button>} />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      <FileInput {...args} value="wedding-contract.pdf" endAddOnContent={<Button type="button" variant="subtle" color="error">
            Remove
          </Button>} />
      <FileInput {...args} value="wedding-contract.pdf" startAddOnContent={<Button type="button" variant="subtle" color="neutral" aria-label="Preview">
            <Lock />
          </Button>} />
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <FileInput {...args} value="wedding-contract.pdf" startContent={<Lock />} endContent="PDF" />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => <FileInput {...args} value="wedding-contract.pdf" startContent={<Lock />} endContent="PDF" endAddOnContent={<Button type="button" variant="subtle" color="error">
          Remove
        </Button>} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <Field>
      <Field.Label>Attachment</Field.Label>
      <Field.Content>
        <FileInput onFiles={() => undefined} />
      </Field.Content>
      <Field.Footer>
        <Field.HelperText>PDF up to 10 MB.</Field.HelperText>
      </Field.Footer>
    </Field>
}`,...W.parameters?.docs?.source}}},G=[`Default`,`WithValue`,`Sizes`,`Statuses`,`Disabled`,`Multiple`,`MultipleWithLimits`,`WithCountBadge`,`WithoutButton`,`NonRemovable`,`CustomButton`,`StartButton`,`WithAction`,`WithAddOns`,`WithContent`,`FullStructure`,`InField`]})))()}K();export{R as CustomButton,O as Default,M as Disabled,U as FullStructure,W as InField,N as Multiple,P as MultipleWithLimits,L as NonRemovable,A as Sizes,z as StartButton,j as Statuses,B as WithAction,V as WithAddOns,H as WithContent,F as WithCountBadge,k as WithValue,I as WithoutButton,G as __namedExportsOrder,D as default};