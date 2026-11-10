import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./ellipsis-BnhKvFST.js";import{n as i,t as a}from"./badge-De8Hay21.js";import{n as o,t as s}from"./button-BSiNW2bO.js";import{n as c,t as l}from"./table-CL9OfhJw.js";import{n as u,t as d}from"./card-BFV9qVHU.js";var f,p,m,h,g,_;function v(){return(v=e((()=>{n(),i(),o(),c(),u(),f=t(),p={title:`Components/Card`,component:d,tags:[`autodocs`]},m={render:()=>(0,f.jsxs)(d,{className:`w-[420px]`,children:[(0,f.jsxs)(d.Header,{children:[(0,f.jsx)(d.Title,{children:`Wedding plan`}),(0,f.jsx)(d.Description,{children:`Track your event progress and vendors`})]}),(0,f.jsx)(d.Content,{children:(0,f.jsx)(`p`,{className:`text-sm text-tertiary`,children:`Everything for your big day in one workspace — guests, vendors, timelines, and galleries.`})}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(s,{size:`sm`,children:`Open workspace`})})]})},h={name:`With action`,render:()=>(0,f.jsxs)(d,{className:`w-[420px]`,children:[(0,f.jsxs)(d.Header,{children:[(0,f.jsx)(d.Title,{children:`Recent orders`}),(0,f.jsx)(d.Description,{children:`4 orders this week`}),(0,f.jsx)(d.Action,{children:(0,f.jsx)(s.Icon,{size:`sm`,variant:`outline`,"aria-label":`More options`,children:(0,f.jsx)(r,{})})})]}),(0,f.jsx)(d.Content,{children:(0,f.jsxs)(`div`,{className:`flex items-center justify-between rounded-lg bg-secondary px-4 py-3`,children:[(0,f.jsx)(`span`,{className:`text-primary text-sm`,children:`INV-004 · Liam Novak`}),(0,f.jsx)(a,{color:`red`,children:`Overdue`})]})})]})},g={name:`With table`,render:()=>(0,f.jsxs)(d,{className:`w-[640px] overflow-hidden`,children:[(0,f.jsxs)(d.Header,{className:`pb-4`,children:[(0,f.jsx)(d.Title,{children:`Invoices`}),(0,f.jsx)(d.Description,{children:`Manage and track your recent invoices`})]}),(0,f.jsxs)(l,{framed:!1,children:[(0,f.jsx)(l.Header,{children:(0,f.jsxs)(l.Row,{children:[(0,f.jsx)(l.Head,{children:`Invoice`}),(0,f.jsx)(l.Head,{children:`Customer`}),(0,f.jsx)(l.Head,{className:`text-right`,children:`Amount`})]})}),(0,f.jsxs)(l.Body,{children:[(0,f.jsxs)(l.Row,{children:[(0,f.jsx)(l.Cell,{className:`font-medium`,children:`INV-001`}),(0,f.jsx)(l.Cell,{children:`Amelia Hart`}),(0,f.jsx)(l.Cell,{className:`text-right tabular-nums`,children:`$250.00`})]}),(0,f.jsxs)(l.Row,{children:[(0,f.jsx)(l.Cell,{className:`font-medium`,children:`INV-002`}),(0,f.jsx)(l.Cell,{children:`Noah Reyes`}),(0,f.jsx)(l.Cell,{className:`text-right tabular-nums`,children:`$150.00`})]})]})]}),(0,f.jsx)(d.Footer,{className:`justify-end`,children:(0,f.jsx)(s,{size:`sm`,variant:`outline`,children:`View all`})})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[420px]">
      <Card.Header>
        <Card.Title>Wedding plan</Card.Title>
        <Card.Description>Track your event progress and vendors</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-tertiary">
          Everything for your big day in one workspace — guests, vendors, timelines, and galleries.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">Open workspace</Button>
      </Card.Footer>
    </Card>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "With action",
  render: () => <Card className="w-[420px]">
      <Card.Header>
        <Card.Title>Recent orders</Card.Title>
        <Card.Description>4 orders this week</Card.Description>
        <Card.Action>
          <Button.Icon size="sm" variant="outline" aria-label="More options">
            <MoreHorizontal />
          </Button.Icon>
        </Card.Action>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
          <span className="text-primary text-sm">INV-004 · Liam Novak</span>
          <Badge color="red">Overdue</Badge>
        </div>
      </Card.Content>
    </Card>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "With table",
  render: () => <Card className="w-[640px] overflow-hidden">
      <Card.Header className="pb-4">
        <Card.Title>Invoices</Card.Title>
        <Card.Description>Manage and track your recent invoices</Card.Description>
      </Card.Header>
      <Table framed={false}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Customer</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="font-medium">INV-001</Table.Cell>
            <Table.Cell>Amelia Hart</Table.Cell>
            <Table.Cell className="text-right tabular-nums">$250.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-medium">INV-002</Table.Cell>
            <Table.Cell>Noah Reyes</Table.Cell>
            <Table.Cell className="text-right tabular-nums">$150.00</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Card.Footer className="justify-end">
        <Button size="sm" variant="outline">
          View all
        </Button>
      </Card.Footer>
    </Card>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`WithAction`,`WithTable`]})))()}v();export{m as Default,h as WithAction,g as WithTable,_ as __namedExportsOrder,p as default};