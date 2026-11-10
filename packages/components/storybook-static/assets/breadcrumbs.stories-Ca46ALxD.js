import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./createLucideIcon-b5K2wI9V.js";import{n as i,t as a}from"./building-complex-CBDBmrW-.js";import{n as o,t as s}from"./chevron-right-D_UiwzZY.js";import{n as c,t as l}from"./ellipsis-BnhKvFST.js";import{n as u,t as d}from"./cn-BksUxDMQ.js";import{n as f,t as p}from"./popover-vtaOQbw2.js";var m,h;function g(){return(g=e((()=>{n(),m={name:`house`,size:24,node:[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]],aliases:[`home`]},m.node,h=r(m)})))()}function _(){return(0,y.jsx)(s,{className:`size-3.5 shrink-0 text-tertiary`,"aria-hidden":`true`})}function v({items:e,linkAs:t,linkHrefProp:n=`href`,separator:r,maxItems:i,ellipsisLabel:a=`Show hidden breadcrumbs`,className:o,...s}){let c=t??`a`,u=e=>t?{[n]:e.href}:{href:e.href},f=i!==void 0&&e.length>Math.max(2,i),m=Math.max(1,(i??e.length)-1),h=e[0],g=f&&h!==void 0?[{kind:`item`,item:h},{kind:`ellipsis`,items:e.slice(1,e.length-m)},...e.slice(e.length-m).map(e=>({kind:`item`,item:e}))]:e.map(e=>({kind:`item`,item:e})),v=e=>e.icon?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`span`,{"data-slot":`icon`,"aria-hidden":`true`,className:`flex shrink-0 items-center [&>svg]:size-3.5`,children:e.icon}),(0,y.jsx)(`span`,{className:`truncate`,children:e.label})]}):e.label,b=(e,t)=>d(t,e.icon?`inline-flex min-w-0 items-center gap-1.5`:`truncate`),x=(e,t)=>t?(0,y.jsx)(`span`,{"aria-current":`page`,className:b(e,`font-medium text-brand-primary`),children:v(e)}):e.href?(0,y.jsx)(c,{...u(e),className:b(e,d(`rounded-sm -m-1 p-1 outline-1 -outline-offset-1 outline-transparent focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50`,`text-tertiary transition-colors hover:text-primary`)),children:v(e)}):(0,y.jsx)(`span`,{className:b(e,`text-tertiary`),children:v(e)});return(0,y.jsx)(`nav`,{"aria-label":`Breadcrumb`,className:d(`flex min-w-0 items-center gap-1 text-sm`,o),...s,children:(0,y.jsx)(`ol`,{className:`flex min-w-0 items-center gap-1`,children:g.map((e,t)=>{let n=t===g.length-1;return(0,y.jsxs)(`li`,{className:`flex min-w-0 items-center gap-1`,children:[t>0?(0,y.jsx)(`span`,{className:`flex shrink-0 items-center`,children:r??(0,y.jsx)(_,{})}):null,e.kind===`ellipsis`?(0,y.jsx)(p,{defaultPosition:`bottom-start`,trigger:(0,y.jsx)(`button`,{type:`button`,"aria-label":a,className:`flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-tertiary outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50`,children:(0,y.jsx)(l,{className:`size-3.5`,"aria-hidden":`true`})}),children:(0,y.jsx)(`ul`,{className:`flex min-w-32 flex-col p-1`,children:e.items.map((e,t)=>(0,y.jsx)(`li`,{children:e.href?(0,y.jsx)(c,{...u(e),className:d(`flex rounded-md px-2 py-1.5 text-sm text-tertiary outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50`,e.icon&&`items-center gap-1.5`),children:v(e)}):(0,y.jsx)(`span`,{className:d(`flex rounded-md px-2 py-1.5 text-sm text-tertiary`,e.icon&&`items-center gap-1.5`),children:v(e)})},t))})}):x(e.item,n)]},t)})})})}var y;function b(){return(b=e((()=>{u(),o(),c(),f(),y=t(),v.__docgenInfo={description:``,methods:[],displayName:`Breadcrumbs`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: ReactNode;
  href?: string;
  /**
   * Optional leading icon rendered before the label (e.g. a home icon on the
   * first step). Decorative: the label stays the accessible name. Size it with
   * the \`size-*\` utilities or let the component's \`size-3.5\` default apply.
   */
  icon?: ReactNode;
}`,signature:{properties:[{key:`label`,value:{name:`ReactNode`,required:!0}},{key:`href`,value:{name:`string`,required:!1}},{key:`icon`,value:{name:`ReactNode`,required:!1},description:"Optional leading icon rendered before the label (e.g. a home icon on the\nfirst step). Decorative: the label stays the accessible name. Size it with\nthe `size-*` utilities or let the component's `size-3.5` default apply."}]}}],raw:`BreadcrumbItem[]`},description:``},linkAs:{required:!1,tsType:{name:`ElementType`},description:"Router `Link` component used for `href` items (Next.js, TanStack Router, React Router)."},linkHrefProp:{required:!1,tsType:{name:`string`},description:'Prop name the router link receives `href` under (default `"href"`; use `"to"` for TanStack Router / React Router).',defaultValue:{value:`"href"`,computed:!1}},separator:{required:!1,tsType:{name:`ReactNode`},description:`Custom separator between items (defaults to a chevron).`},maxItems:{required:!1,tsType:{name:`number`},description:"Max items to show before collapsing the middle into an ellipsis (minimum 2).\nWhen `items.length` exceeds this, the first item, an ellipsis, and the last\n`maxItems - 1` items render; the ellipsis opens a popover with the hidden ones."},ellipsisLabel:{required:!1,tsType:{name:`string`},description:`Accessible label for the ellipsis button that reveals hidden items.`,defaultValue:{value:`"Show hidden breadcrumbs"`,computed:!1}}}}})))()}function x({to:e,className:t,children:n,...r}){return(0,S.jsx)(`a`,{"data-router-link":``,href:e,className:t,...r,children:n})}var S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{i(),g(),b(),S=t(),C={title:`Components/Breadcrumbs`,component:v,tags:[`autodocs`],args:{items:[{label:`Dashboard`,href:`#/dashboard`},{label:`Organization`,href:`#/dashboard/organization`},{label:`Profile`}]}},w={},T={args:{items:[{label:`Dashboard`}]}},E={args:{items:[{label:`Dashboard`},{label:`Organization`},{label:`Profile`}]}},D={args:{separator:(0,S.jsx)(`span`,{className:`text-tertiary`,children:`/`})}},O={args:{linkAs:x,linkHrefProp:`to`}},k={args:{items:[{label:`Dashboard`,href:`#/dashboard`},{label:`Organization`,href:`#/dashboard/organization`},{label:`Branches`,href:`#/dashboard/branches`},{label:`Bali`,href:`#/dashboard/branches/bali`},{label:`Settings`}],maxItems:3}},A={args:{items:[{label:`Dashboard`,href:`#/dashboard`,icon:(0,S.jsx)(h,{"aria-hidden":`true`})},{label:`Organization`,href:`#/dashboard/organization`,icon:(0,S.jsx)(a,{"aria-hidden":`true`})},{label:`Profile`}]}},j={args:{items:[{label:`Dashboard`,href:`#/dashboard`,icon:(0,S.jsx)(h,{"aria-hidden":`true`})}]}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Dashboard"
    }]
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Dashboard"
    }, {
      label: "Organization"
    }, {
      label: "Profile"
    }]
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    separator: <span className="text-tertiary">/</span>
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    linkAs: RouterLinkMock,
    linkHrefProp: "to"
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Dashboard",
      href: "#/dashboard"
    }, {
      label: "Organization",
      href: "#/dashboard/organization"
    }, {
      label: "Branches",
      href: "#/dashboard/branches"
    }, {
      label: "Bali",
      href: "#/dashboard/branches/bali"
    }, {
      label: "Settings"
    }],
    maxItems: 3
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Dashboard",
      href: "#/dashboard",
      icon: <House aria-hidden="true" />
    }, {
      label: "Organization",
      href: "#/dashboard/organization",
      icon: <Building2 aria-hidden="true" />
    }, {
      label: "Profile"
    }]
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Dashboard",
      href: "#/dashboard",
      icon: <House aria-hidden="true" />
    }]
  }
}`,...j.parameters?.docs?.source}}},M=[`Default`,`SingleItem`,`NoLinks`,`CustomSeparator`,`RouterLinks`,`Collapsed`,`WithIcon`,`SingleItemWithIcon`]})))()}N();export{k as Collapsed,D as CustomSeparator,w as Default,E as NoLinks,O as RouterLinks,T as SingleItem,j as SingleItemWithIcon,A as WithIcon,M as __namedExportsOrder,C as default};