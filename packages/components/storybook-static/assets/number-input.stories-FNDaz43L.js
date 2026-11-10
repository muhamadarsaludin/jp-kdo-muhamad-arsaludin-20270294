import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DVRGbldE.js";import{n,t as r}from"./field-DWHIWe24.js";import{n as i,t as a}from"./number-input-C0eyLOFw.js";var o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{n(),i(),o=t(),s={title:`Components/NumberInput`,component:a,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},variant:{control:`select`,options:[`plain`,`outlined`,`filled`]},shape:{control:`select`,options:[`rounded`,`pill`]},status:{control:`select`,options:[`default`,`error`,`warning`,`success`]}},args:{"aria-label":`Quantity`,size:`md`,variant:`plain`,shape:`rounded`,status:`default`}},c={render:e=>(0,o.jsx)(`div`,{className:`max-w-xs`,children:(0,o.jsx)(a,{...e,defaultValue:2})})},l={render:e=>(0,o.jsx)(`div`,{className:`max-w-xs`,children:(0,o.jsx)(a,{...e,variant:`outlined`,defaultValue:2})})},u={name:`Input / Filled`,render:e=>(0,o.jsx)(`div`,{className:`max-w-xs`,children:(0,o.jsx)(a,{...e,variant:`filled`,defaultValue:2})})},d={name:`Min / Max / Step`,render:e=>(0,o.jsx)(`div`,{className:`max-w-xs`,children:(0,o.jsx)(a,{...e,defaultValue:50,min:0,max:100,step:5,"aria-label":`Discount percent`})})},f={name:`Custom buttons`,render:e=>(0,o.jsx)(`div`,{className:`max-w-xs`,children:(0,o.jsx)(a,{...e,defaultValue:2,buttonProps:{variant:`outline`,color:`neutral`},"aria-label":`Quantity outline`})})},p={render:e=>(0,o.jsx)(`div`,{className:`flex max-w-xs flex-col gap-3`,children:[`xs`,`sm`,`md`,`lg`,`xl`].map(t=>(0,o.jsx)(a,{...e,size:t,"aria-label":`Quantity ${t}`,defaultValue:2},t))})},m={name:`With Field`,render:e=>(0,o.jsx)(`div`,{className:`max-w-xs`,children:(0,o.jsxs)(r,{controlId:`qty-field`,children:[(0,o.jsx)(r.Label,{children:`Quantity`}),(0,o.jsx)(r.Content,{children:(0,o.jsx)(a,{...e,id:`qty-field`,defaultValue:2,min:1})}),(0,o.jsx)(r.HelperText,{children:`How many seats should we reserve?`})]})})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="max-w-xs">
      <NumberInput {...args} defaultValue={2} />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="max-w-xs">
      <NumberInput {...args} variant="outlined" defaultValue={2} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Input / Filled",
  render: args => <div className="max-w-xs">
      <NumberInput {...args} variant="filled" defaultValue={2} />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "Min / Max / Step",
  render: args => <div className="max-w-xs">
      <NumberInput {...args} defaultValue={50} min={0} max={100} step={5} aria-label="Discount percent" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "Custom buttons",
  render: args => <div className="max-w-xs">
      <NumberInput {...args} defaultValue={2} buttonProps={{
      variant: "outline",
      color: "neutral"
    }} aria-label="Quantity outline" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex max-w-xs flex-col gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <NumberInput key={size} {...args} size={size} aria-label={\`Quantity \${size}\`} defaultValue={2} />)}
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "With Field",
  render: args => <div className="max-w-xs">
      <Field controlId="qty-field">
        <Field.Label>Quantity</Field.Label>
        <Field.Content>
          <NumberInput {...args} id="qty-field" defaultValue={2} min={1} />
        </Field.Content>
        <Field.HelperText>How many seats should we reserve?</Field.HelperText>
      </Field>
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Input`,`InputFilled`,`MinMaxStep`,`CustomButtons`,`Sizes`,`WithField`]})))()}g();export{f as CustomButtons,c as Default,l as Input,u as InputFilled,d as MinMaxStep,p as Sizes,m as WithField,h as __namedExportsOrder,s as default};