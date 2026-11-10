import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./input-CyOsgzUo.js";import{n as i,t as a}from"./info-CNatF7ut.js";import{n as o,t as s}from"./badge-De8Hay21.js";import{n as c,t as l}from"./button-BSiNW2bO.js";import{n as u,t as d}from"./field-DWHIWe24.js";var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{i(),o(),c(),n(),u(),f=t(),p={title:`Components/Field`,component:d,tags:[`autodocs`],argTypes:{controlId:{control:`text`},orientation:{control:`select`,options:[`vertical`,`horizontal`]},alignment:{control:`select`,options:[`start`,`center`,`end`,`stretch`]},status:{control:`select`,options:[`default`,`error`,`warning`,`success`]},color:{control:`select`,options:[`default`,`inverse`]},required:{control:`boolean`},max:{control:`number`},current:{control:`number`},separator:{control:`text`}},args:{orientation:`vertical`,alignment:`stretch`,status:`default`,color:`default`,required:!1}},m={render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Full name`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Enter your full name`,"aria-label":`Full name`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Enter your full name.`}),(0,f.jsx)(d.Counter,{current:3,max:50})]})]})]})})},h={name:`Slots / Full`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsxs)(d.Label,{children:[(0,f.jsx)(d.StartContent,{children:(0,f.jsx)(a,{className:`size-4 text-brand-primary`,"aria-hidden":!0})}),`Workspace name`,(0,f.jsx)(d.EndAddOnContent,{children:(0,f.jsx)(s,{color:`neutral`,variant:`subtle`,shape:`pill`,size:`sm`,children:`Optional`})})]}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Enter workspace name`,"aria-label":`Workspace name`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Shown to your team.`}),(0,f.jsxs)(`div`,{className:`ml-auto flex items-center gap-2`,children:[(0,f.jsx)(d.Counter,{current:8,max:50}),(0,f.jsx)(l,{type:`button`,size:`sm`,variant:`outline`,color:`neutral`,children:`Copy`})]})]})]})]})})},g={name:`Label / End content`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{endContent:(0,f.jsx)(l.Icon,{type:`button`,variant:`text`,color:`neutral`,size:`xs`,"aria-label":`What is a slug?`,children:(0,f.jsx)(a,{"aria-hidden":`true`})}),children:`Slug`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`wedding-decor-jakarta`,"aria-label":`Slug`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Used in your public booking link.`})})]})]})})},_={name:`Slots / Label add-ons`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsxs)(d.Label,{children:[`API key`,(0,f.jsx)(d.EndAddOnContent,{children:(0,f.jsx)(s,{color:`green`,variant:`subtle`,shape:`pill`,size:`sm`,children:`Active`})})]}),(0,f.jsx)(d.Content,{children:(0,f.jsx)(r,{placeholder:`sk_live_...`,"aria-label":`API key`})})]})})},v={name:`Slots / Footer action and counter`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Invite link`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`https://wedo.co.id/invite/...`,"aria-label":`Invite link`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Anyone with this link can join.`}),(0,f.jsxs)(`div`,{className:`ml-auto flex items-center gap-2`,children:[(0,f.jsx)(d.Counter,{current:42,max:50}),(0,f.jsx)(l,{type:`button`,size:`sm`,variant:`outline`,color:`neutral`,children:`Copy`})]})]})]})]})})},y={name:`Counter / Custom separator`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,current:1,max:3,separator:` dari `,children:[(0,f.jsx)(d.Label,{children:`Branches`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Branch count`,"aria-label":`Branch count`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Counter uses a custom separator.`}),(0,f.jsx)(d.Counter,{})]})]})]})})},b={name:`Color / Inverse`,render:e=>(0,f.jsx)(`div`,{className:`w-full rounded-xl bg-primary-inverse p-4`,children:(0,f.jsxs)(d,{...e,color:`inverse`,current:1,max:10,separator:` dari `,children:[(0,f.jsx)(d.Label,{children:`Branches`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsxs)(`div`,{className:`relative h-1.5 w-full overflow-hidden rounded-full bg-white/15`,children:[(0,f.jsx)(`div`,{className:`absolute inset-y-0 left-0 rounded-full bg-brand-primary/20`,style:{width:`30%`}}),(0,f.jsx)(`div`,{className:`absolute inset-y-0 left-0 rounded-full bg-brand-primary`,style:{width:`10%`}}),(0,f.jsx)(`span`,{className:`absolute inset-y-0 w-px bg-white/50`,style:{left:`30%`},"aria-hidden":!0})]}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Bisa ditambah hingga 10 cabang`}),(0,f.jsx)(d.Counter,{})]})]})]})})},x={name:`Orientation / Horizontal`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,orientation:`horizontal`,children:[(0,f.jsx)(d.Label,{className:`min-w-28`,children:`Full name`}),(0,f.jsxs)(d.Content,{className:`flex-1`,children:[(0,f.jsx)(r,{placeholder:`Enter your full name`,"aria-label":`Full name`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Label beside control.`}),(0,f.jsx)(d.Counter,{current:3,max:50})]})]})]})})},S={name:`Orientation / Horizontal alignments`,render:e=>(0,f.jsxs)(`div`,{className:`flex w-full flex-col gap-6`,children:[(0,f.jsxs)(d,{...e,orientation:`horizontal`,alignment:`start`,children:[(0,f.jsx)(d.Label,{className:`min-w-28`,children:`Top`}),(0,f.jsxs)(d.Content,{className:`flex-1`,children:[(0,f.jsx)(r,{placeholder:`Start aligned`,"aria-label":`Start aligned`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Label and content align to the top.`})})]})]}),(0,f.jsxs)(d,{...e,orientation:`horizontal`,alignment:`center`,children:[(0,f.jsx)(d.Label,{className:`min-w-28`,children:`Center`}),(0,f.jsxs)(d.Content,{className:`flex-1`,children:[(0,f.jsx)(r,{placeholder:`Center aligned`,"aria-label":`Center aligned`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Label and content align to the center.`})})]})]}),(0,f.jsxs)(d,{...e,orientation:`horizontal`,alignment:`end`,children:[(0,f.jsx)(d.Label,{className:`min-w-28`,children:`Bottom`}),(0,f.jsxs)(d.Content,{className:`flex-1`,children:[(0,f.jsx)(r,{placeholder:`End aligned`,"aria-label":`End aligned`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Label and content align to the bottom.`})})]})]})]})},C={render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,required:!0,children:[(0,f.jsx)(d.Label,{children:`Email address`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`you@example.com`,"aria-label":`Email address`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`We will never share your email.`})})]})]})})},w={render:e=>(0,f.jsxs)(`div`,{className:`flex w-full flex-col gap-4`,children:[(0,f.jsxs)(d,{...e,status:`default`,children:[(0,f.jsx)(d.Label,{children:`Default`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Default`,"aria-label":`Default`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Everything looks good.`})})]})]}),(0,f.jsxs)(d,{...e,status:`error`,children:[(0,f.jsx)(d.Label,{children:`Error`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Error`,"aria-label":`Error`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`This field has an error.`}),(0,f.jsx)(d.Counter,{current:80,max:50})]})]})]}),(0,f.jsxs)(d,{...e,status:`warning`,children:[(0,f.jsx)(d.Label,{children:`Warning`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Warning`,"aria-label":`Warning`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`This field has a warning.`}),(0,f.jsx)(d.Counter,{current:49,max:50})]})]})]}),(0,f.jsxs)(d,{...e,status:`success`,children:[(0,f.jsx)(d.Label,{children:`Success`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Success`,"aria-label":`Success`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`This field is valid.`}),(0,f.jsx)(d.Counter,{current:10,max:50})]})]})]})]})},T={name:`Footer / Only Helper (left)`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Full name`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Enter your name`,"aria-label":`Full name`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Helper text only — aligned left.`})})]})]})})},E={name:`Footer / Only Counter (right)`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Full name`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Enter your name`,"aria-label":`Full name`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.Counter,{current:3,max:50})})]})]})})},D={name:`Footer / Both (space-between)`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Full name`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Enter your name`,"aria-label":`Full name`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Helper text on the left.`}),(0,f.jsx)(d.Counter,{current:3,max:50})]})]})]})})},O={name:`Footer / Alignment Matrix`,render:e=>(0,f.jsxs)(`div`,{className:`flex w-full flex-col gap-6`,children:[(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Helper only`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Helper only`,"aria-label":`Helper only`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Aligned left`})})]})]}),(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Counter only`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Counter only`,"aria-label":`Counter only`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.Counter,{current:42,max:50})})]})]}),(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Both`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Both`,"aria-label":`Both`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Left`}),(0,f.jsx)(d.Counter,{current:42,max:50})]})]})]})]})},k={name:`Content / Without Input`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(d.Label,{children:`Bio`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(`div`,{className:`flex items-center justify-center rounded-lg border border-primary border-dashed bg-secondary px-3 py-6 text-center text-sm text-tertiary`,children:`Custom dropzone — not an Input`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Content can wrap any control.`}),(0,f.jsx)(d.Counter,{current:42,max:100})]})]})]})})},A={name:`Field / controlId association`,render:e=>(0,f.jsx)(`div`,{className:`w-full`,children:(0,f.jsxs)(d,{...e,controlId:`story-email`,children:[(0,f.jsx)(d.Label,{children:`Email`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`you@example.com`,"aria-label":`Email`}),(0,f.jsx)(d.Footer,{children:(0,f.jsx)(d.HelperText,{children:`Label is associated via htmlFor → controlId.`})})]})]})})},j={name:`Field / max & current via context`,render:e=>(0,f.jsxs)(`div`,{className:`flex w-full flex-col gap-6`,children:[(0,f.jsxs)(d,{...e,max:50,current:12,children:[(0,f.jsx)(d.Label,{children:`Username`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Username`,"aria-label":`Username`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Input maxLength comes from Field max.`}),(0,f.jsx)(d.Counter,{})]})]})]}),(0,f.jsxs)(d,{...e,max:20,current:20,children:[(0,f.jsx)(d.Label,{children:`Bio`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Bio`,"aria-label":`Bio`,defaultValue:`Hello world hello`}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Counter inherits max/current from Field.`}),(0,f.jsx)(d.Counter,{})]})]})]}),(0,f.jsxs)(d,{...e,max:50,current:12,children:[(0,f.jsx)(d.Label,{children:`Override`}),(0,f.jsxs)(d.Content,{children:[(0,f.jsx)(r,{placeholder:`Override`,"aria-label":`Override`,maxLength:10}),(0,f.jsxs)(d.Footer,{children:[(0,f.jsx)(d.HelperText,{children:`Explicit maxLength on Input wins over Field max.`}),(0,f.jsx)(d.Counter,{current:5,max:10})]})]})]})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>Full name</Field.Label>
        <Field.Content>
          <Input placeholder="Enter your full name" aria-label="Full name" />
          <Field.Footer>
            <Field.HelperText>Enter your full name.</Field.HelperText>
            <Field.Counter current={3} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "Slots / Full",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>
          <Field.StartContent>
            <Info className="size-4 text-brand-primary" aria-hidden />
          </Field.StartContent>
          Workspace name
          <Field.EndAddOnContent>
            <Badge color="neutral" variant="subtle" shape="pill" size="sm">
              Optional
            </Badge>
          </Field.EndAddOnContent>
        </Field.Label>
        <Field.Content>
          <Input placeholder="Enter workspace name" aria-label="Workspace name" />
          <Field.Footer>
            <Field.HelperText>Shown to your team.</Field.HelperText>
            <div className="ml-auto flex items-center gap-2">
              <Field.Counter current={8} max={50} />
              <Button type="button" size="sm" variant="outline" color="neutral">
                Copy
              </Button>
            </div>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "Label / End content",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label endContent={<Button.Icon type="button" variant="text" color="neutral" size="xs" aria-label="What is a slug?">
              <Info aria-hidden="true" />
            </Button.Icon>}>
          Slug
        </Field.Label>
        <Field.Content>
          <Input placeholder="wedding-decor-jakarta" aria-label="Slug" />
          <Field.Footer>
            <Field.HelperText>Used in your public booking link.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: "Slots / Label add-ons",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>
          API key
          <Field.EndAddOnContent>
            <Badge color="green" variant="subtle" shape="pill" size="sm">
              Active
            </Badge>
          </Field.EndAddOnContent>
        </Field.Label>
        <Field.Content>
          <Input placeholder="sk_live_..." aria-label="API key" />
        </Field.Content>
      </Field>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: "Slots / Footer action and counter",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>Invite link</Field.Label>
        <Field.Content>
          <Input placeholder="https://wedo.co.id/invite/..." aria-label="Invite link" />
          <Field.Footer>
            <Field.HelperText>Anyone with this link can join.</Field.HelperText>
            <div className="ml-auto flex items-center gap-2">
              <Field.Counter current={42} max={50} />
              <Button type="button" size="sm" variant="outline" color="neutral">
                Copy
              </Button>
            </div>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Counter / Custom separator",
  render: args => <div className="w-full">
      <Field {...args} current={1} max={3} separator=" dari ">
        <Field.Label>Branches</Field.Label>
        <Field.Content>
          <Input placeholder="Branch count" aria-label="Branch count" />
          <Field.Footer>
            <Field.HelperText>Counter uses a custom separator.</Field.HelperText>
            <Field.Counter />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: "Color / Inverse",
  render: args => {
    const included = 3;
    const extra = 7;
    const max = included + extra;
    const used = 1;
    return <div className="w-full rounded-xl bg-primary-inverse p-4">
        <Field {...args} color="inverse" current={used} max={max} separator=" dari ">
          <Field.Label>Branches</Field.Label>
          <Field.Content>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="absolute inset-y-0 left-0 rounded-full bg-brand-primary/20" style={{
              width: \`\${included / max * 100}%\`
            }} />
              <div className="absolute inset-y-0 left-0 rounded-full bg-brand-primary" style={{
              width: \`\${used / max * 100}%\`
            }} />
              <span className="absolute inset-y-0 w-px bg-white/50" style={{
              left: \`\${included / max * 100}%\`
            }} aria-hidden />
            </div>
            <Field.Footer>
              <Field.HelperText>{\`Bisa ditambah hingga \${max} cabang\`}</Field.HelperText>
              <Field.Counter />
            </Field.Footer>
          </Field.Content>
        </Field>
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: "Orientation / Horizontal",
  render: args => <div className="w-full">
      <Field {...args} orientation="horizontal">
        <Field.Label className="min-w-28">Full name</Field.Label>
        <Field.Content className="flex-1">
          <Input placeholder="Enter your full name" aria-label="Full name" />
          <Field.Footer>
            <Field.HelperText>Label beside control.</Field.HelperText>
            <Field.Counter current={3} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "Orientation / Horizontal alignments",
  render: args => <div className="flex w-full flex-col gap-6">
      <Field {...args} orientation="horizontal" alignment="start">
        <Field.Label className="min-w-28">Top</Field.Label>
        <Field.Content className="flex-1">
          <Input placeholder="Start aligned" aria-label="Start aligned" />
          <Field.Footer>
            <Field.HelperText>Label and content align to the top.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} orientation="horizontal" alignment="center">
        <Field.Label className="min-w-28">Center</Field.Label>
        <Field.Content className="flex-1">
          <Input placeholder="Center aligned" aria-label="Center aligned" />
          <Field.Footer>
            <Field.HelperText>Label and content align to the center.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} orientation="horizontal" alignment="end">
        <Field.Label className="min-w-28">Bottom</Field.Label>
        <Field.Content className="flex-1">
          <Input placeholder="End aligned" aria-label="End aligned" />
          <Field.Footer>
            <Field.HelperText>Label and content align to the bottom.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-full">
      <Field {...args} required>
        <Field.Label>Email address</Field.Label>
        <Field.Content>
          <Input placeholder="you@example.com" aria-label="Email address" />
          <Field.Footer>
            <Field.HelperText>We will never share your email.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex w-full flex-col gap-4">
      <Field {...args} status="default">
        <Field.Label>Default</Field.Label>
        <Field.Content>
          <Input placeholder="Default" aria-label="Default" />
          <Field.Footer>
            <Field.HelperText>Everything looks good.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} status="error">
        <Field.Label>Error</Field.Label>
        <Field.Content>
          <Input placeholder="Error" aria-label="Error" />
          <Field.Footer>
            <Field.HelperText>This field has an error.</Field.HelperText>
            <Field.Counter current={80} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} status="warning">
        <Field.Label>Warning</Field.Label>
        <Field.Content>
          <Input placeholder="Warning" aria-label="Warning" />
          <Field.Footer>
            <Field.HelperText>This field has a warning.</Field.HelperText>
            <Field.Counter current={49} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} status="success">
        <Field.Label>Success</Field.Label>
        <Field.Content>
          <Input placeholder="Success" aria-label="Success" />
          <Field.Footer>
            <Field.HelperText>This field is valid.</Field.HelperText>
            <Field.Counter current={10} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: "Footer / Only Helper (left)",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>Full name</Field.Label>
        <Field.Content>
          <Input placeholder="Enter your name" aria-label="Full name" />
          <Field.Footer>
            <Field.HelperText>Helper text only — aligned left.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "Footer / Only Counter (right)",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>Full name</Field.Label>
        <Field.Content>
          <Input placeholder="Enter your name" aria-label="Full name" />
          <Field.Footer>
            <Field.Counter current={3} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "Footer / Both (space-between)",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>Full name</Field.Label>
        <Field.Content>
          <Input placeholder="Enter your name" aria-label="Full name" />
          <Field.Footer>
            <Field.HelperText>Helper text on the left.</Field.HelperText>
            <Field.Counter current={3} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: "Footer / Alignment Matrix",
  render: args => <div className="flex w-full flex-col gap-6">
      <Field {...args}>
        <Field.Label>Helper only</Field.Label>
        <Field.Content>
          <Input placeholder="Helper only" aria-label="Helper only" />
          <Field.Footer>
            <Field.HelperText>Aligned left</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args}>
        <Field.Label>Counter only</Field.Label>
        <Field.Content>
          <Input placeholder="Counter only" aria-label="Counter only" />
          <Field.Footer>
            <Field.Counter current={42} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args}>
        <Field.Label>Both</Field.Label>
        <Field.Content>
          <Input placeholder="Both" aria-label="Both" />
          <Field.Footer>
            <Field.HelperText>Left</Field.HelperText>
            <Field.Counter current={42} max={50} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Content / Without Input",
  render: args => <div className="w-full">
      <Field {...args}>
        <Field.Label>Bio</Field.Label>
        <Field.Content>
          <div className="flex items-center justify-center rounded-lg border border-primary border-dashed bg-secondary px-3 py-6 text-center text-sm text-tertiary">
            Custom dropzone — not an Input
          </div>
          <Field.Footer>
            <Field.HelperText>Content can wrap any control.</Field.HelperText>
            <Field.Counter current={42} max={100} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: "Field / controlId association",
  render: args => <div className="w-full">
      <Field {...args} controlId="story-email">
        <Field.Label>Email</Field.Label>
        <Field.Content>
          <Input placeholder="you@example.com" aria-label="Email" />
          <Field.Footer>
            <Field.HelperText>Label is associated via htmlFor → controlId.</Field.HelperText>
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: "Field / max & current via context",
  render: args => <div className="flex w-full flex-col gap-6">
      <Field {...args} max={50} current={12}>
        <Field.Label>Username</Field.Label>
        <Field.Content>
          <Input placeholder="Username" aria-label="Username" />
          <Field.Footer>
            <Field.HelperText>Input maxLength comes from Field max.</Field.HelperText>
            <Field.Counter />
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} max={20} current={20}>
        <Field.Label>Bio</Field.Label>
        <Field.Content>
          <Input placeholder="Bio" aria-label="Bio" defaultValue="Hello world hello" />
          <Field.Footer>
            <Field.HelperText>Counter inherits max/current from Field.</Field.HelperText>
            <Field.Counter />
          </Field.Footer>
        </Field.Content>
      </Field>
      <Field {...args} max={50} current={12}>
        <Field.Label>Override</Field.Label>
        <Field.Content>
          <Input placeholder="Override" aria-label="Override" maxLength={10} />
          <Field.Footer>
            <Field.HelperText>Explicit maxLength on Input wins over Field max.</Field.HelperText>
            <Field.Counter current={5} max={10} />
          </Field.Footer>
        </Field.Content>
      </Field>
    </div>
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Slots`,`LabelEndContent`,`SlotsEndOnly`,`SlotsBottomOnly`,`CounterSeparator`,`ColorInverse`,`Horizontal`,`HorizontalAlignments`,`Required`,`Statuses`,`FooterOnlyHelper`,`FooterOnlyCounter`,`FooterBoth`,`FooterAlignment`,`WithoutInput`,`ControlIdAssociation`,`WithMax`]})))()}N();export{b as ColorInverse,A as ControlIdAssociation,y as CounterSeparator,m as Default,O as FooterAlignment,D as FooterBoth,E as FooterOnlyCounter,T as FooterOnlyHelper,x as Horizontal,S as HorizontalAlignments,g as LabelEndContent,C as Required,h as Slots,v as SlotsBottomOnly,_ as SlotsEndOnly,w as Statuses,j as WithMax,k as WithoutInput,M as __namedExportsOrder,p as default};