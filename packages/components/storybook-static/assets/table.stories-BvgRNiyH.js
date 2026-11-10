import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./download-DmSXzoJo.js";import{n as a,t as o}from"./plus-BO1dkSUk.js";import{n as s,t as c}from"./badge-De8Hay21.js";import{n as l,t as u}from"./button-BSiNW2bO.js";import{n as d,t as f}from"./table-CL9OfhJw.js";import{n as p,t as m}from"./checkbox-BAzPkJ33.js";import{n as h,t as g}from"./pagination-BrZjn_K4.js";function _(e){return e===`Paid`?`green`:e===`Overdue`?`red`:`yellow`}function v(){let[e,t]=(0,b.useState)([]),n=e.length===C.length,r=e.length>0&&!n,i=e=>t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return(0,x.jsx)(`div`,{className:`w-[640px]`,children:(0,x.jsxs)(f,{children:[(0,x.jsx)(f.Header,{children:(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Head,{className:`w-10`,children:(0,x.jsx)(m,{"aria-label":`Select all`,checked:n,indeterminate:r,onCheckedChange:e=>t(e?C.map(e=>e.id):[])})}),(0,x.jsx)(f.Head,{children:`Invoice`}),(0,x.jsx)(f.Head,{children:`Customer`}),(0,x.jsx)(f.Head,{className:`text-right`,children:`Amount`})]})}),(0,x.jsx)(f.Body,{children:C.map(t=>{let n=e.includes(t.id);return(0,x.jsxs)(f.Row,{"data-state":n?`selected`:void 0,children:[(0,x.jsx)(f.Cell,{children:(0,x.jsx)(m,{"aria-label":`Select ${t.id}`,checked:n,onCheckedChange:()=>i(t.id)})}),(0,x.jsx)(f.Cell,{className:`font-medium`,children:t.id}),(0,x.jsx)(f.Cell,{children:t.customer}),(0,x.jsx)(f.Cell,{className:`text-right tabular-nums`,children:t.amount})]},t.id)})})]})})}function y(){let[e,t]=(0,b.useState)(1);return(0,x.jsxs)(`div`,{className:`w-[720px] overflow-hidden rounded-xl border border-secondary`,children:[(0,x.jsxs)(`div`,{className:`flex items-center justify-between gap-3 border-secondary border-b px-4 py-3`,children:[(0,x.jsxs)(`div`,{className:`min-w-0`,children:[(0,x.jsx)(`p`,{className:`font-medium text-primary`,children:`Invoices`}),(0,x.jsx)(`p`,{className:`truncate text-sm text-tertiary`,children:`Manage and track your recent invoices`})]}),(0,x.jsxs)(`div`,{className:`flex shrink-0 items-center gap-2`,children:[(0,x.jsx)(u,{size:`sm`,variant:`outline`,startContent:(0,x.jsx)(i,{}),children:`Export`}),(0,x.jsx)(u,{size:`sm`,startContent:(0,x.jsx)(o,{}),children:`New`})]})]}),(0,x.jsxs)(f,{framed:!1,children:[(0,x.jsx)(f.Header,{children:(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Head,{children:`Invoice`}),(0,x.jsx)(f.Head,{children:`Customer`}),(0,x.jsx)(f.Head,{children:`Status`}),(0,x.jsx)(f.Head,{className:`text-right`,children:`Amount`})]})}),(0,x.jsx)(f.Body,{children:C.map(e=>(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Cell,{className:`font-medium`,children:e.id}),(0,x.jsx)(f.Cell,{children:e.customer}),(0,x.jsx)(f.Cell,{children:(0,x.jsx)(c,{color:_(e.status),children:e.status})}),(0,x.jsx)(f.Cell,{className:`text-right tabular-nums`,children:e.amount})]},e.id))})]}),(0,x.jsxs)(`div`,{className:`flex items-center justify-between gap-4 border-secondary border-t px-4 py-3`,children:[(0,x.jsxs)(`p`,{className:`text-sm text-tertiary`,children:[`Viewing `,C.length,` of 42 invoices`]}),(0,x.jsx)(g,{total:5,page:e,onPageChange:t})]})]})}var b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{b=t(),r(),a(),s(),l(),p(),h(),d(),x=n(),S={title:`Components/Table`,component:f,tags:[`autodocs`],argTypes:{framed:{control:`boolean`}},args:{framed:!0}},C=[{id:`INV-001`,customer:`Amelia Hart`,status:`Paid`,amount:`$250.00`},{id:`INV-002`,customer:`Noah Reyes`,status:`Pending`,amount:`$150.00`},{id:`INV-003`,customer:`Sofia Lim`,status:`Paid`,amount:`$350.00`},{id:`INV-004`,customer:`Liam Novak`,status:`Overdue`,amount:`$450.00`}],w={render:e=>(0,x.jsx)(`div`,{className:`w-[640px]`,children:(0,x.jsxs)(f,{...e,children:[(0,x.jsx)(f.Header,{children:(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Head,{children:`Invoice`}),(0,x.jsx)(f.Head,{children:`Customer`}),(0,x.jsx)(f.Head,{children:`Status`}),(0,x.jsx)(f.Head,{className:`text-right`,children:`Amount`})]})}),(0,x.jsx)(f.Body,{children:C.map(e=>(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Cell,{className:`font-medium`,children:e.id}),(0,x.jsx)(f.Cell,{children:e.customer}),(0,x.jsx)(f.Cell,{children:(0,x.jsx)(c,{color:_(e.status),children:e.status})}),(0,x.jsx)(f.Cell,{className:`text-right tabular-nums`,children:e.amount})]},e.id))})]})})},T={name:`With footer`,render:e=>(0,x.jsx)(`div`,{className:`w-[640px]`,children:(0,x.jsxs)(f,{...e,children:[(0,x.jsx)(f.Header,{children:(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Head,{children:`Invoice`}),(0,x.jsx)(f.Head,{children:`Customer`}),(0,x.jsx)(f.Head,{className:`text-right`,children:`Amount`})]})}),(0,x.jsx)(f.Body,{children:C.map(e=>(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Cell,{className:`font-medium`,children:e.id}),(0,x.jsx)(f.Cell,{children:e.customer}),(0,x.jsx)(f.Cell,{className:`text-right tabular-nums`,children:e.amount})]},e.id))}),(0,x.jsx)(f.Footer,{children:(0,x.jsxs)(f.Row,{children:[(0,x.jsx)(f.Cell,{colSpan:2,children:`Total`}),(0,x.jsx)(f.Cell,{className:`text-right tabular-nums`,children:`$1,200.00`})]})})]})})},E={name:`With selection`,render:()=>(0,x.jsx)(v,{})},D={render:()=>(0,x.jsx)(y,{})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[640px]">
      <Table {...args}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Customer</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map(invoice => <Table.Row key={invoice.id}>
              <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
              <Table.Cell>{invoice.customer}</Table.Cell>
              <Table.Cell>
                <Badge color={statusColor(invoice.status)}>{invoice.status}</Badge>
              </Table.Cell>
              <Table.Cell className="text-right tabular-nums">{invoice.amount}</Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: "With footer",
  render: args => <div className="w-[640px]">
      <Table {...args}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Customer</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map(invoice => <Table.Row key={invoice.id}>
              <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
              <Table.Cell>{invoice.customer}</Table.Cell>
              <Table.Cell className="text-right tabular-nums">{invoice.amount}</Table.Cell>
            </Table.Row>)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={2}>Total</Table.Cell>
            <Table.Cell className="text-right tabular-nums">$1,200.00</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "With selection",
  render: () => <SelectableTable />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <FullTable />
}`,...D.parameters?.docs?.source}}},O=[`Default`,`WithFooter`,`WithSelection`,`Full`]})))()}k();export{w as Default,D as Full,T as WithFooter,E as WithSelection,O as __namedExportsOrder,S as default};