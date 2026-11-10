import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{O as t,n}from"./iframe-DVRGbldE.js";import{n as r,t as i}from"./field-DWHIWe24.js";import{n as a,t as o}from"./checkbox-BAzPkJ33.js";var s,c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{s=t(),r(),a(),c=n(),l={title:`Components/Checkbox`,component:o,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},status:{control:`select`,options:[`default`,`warning`,`error`,`success`]},checked:{control:`boolean`},indeterminate:{control:`boolean`},disabled:{control:`boolean`}},args:{size:`sm`,disabled:!1,indeterminate:!1}},u={render:e=>(0,c.jsx)(o,{...e,"aria-label":`Accept terms`})},d={render:()=>(0,c.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,c.jsx)(o,{size:`sm`,defaultChecked:!0,"aria-label":`Small`}),(0,c.jsx)(o,{size:`md`,defaultChecked:!0,"aria-label":`Medium`}),(0,c.jsx)(o,{size:`lg`,defaultChecked:!0,"aria-label":`Large`})]})},f={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,c.jsx)(o,{label:`Email notifications`,defaultChecked:!0}),(0,c.jsx)(o,{label:`Push notifications`})]})},p={render:()=>(0,c.jsxs)(`div`,{className:`flex max-w-sm flex-col gap-4`,children:[(0,c.jsx)(o,{label:`Invite guests`,description:`Guests can view the gallery but cannot edit the event.`,defaultChecked:!0}),(0,c.jsx)(o,{label:`Allow plus-ones`,description:`Each guest may bring one companion.`})]})},m={render:function(){let[e,t]=(0,s.useState)([`seating`]),n=[{value:`seating`,label:`Seating chart`},{value:`catering`,label:`Catering`},{value:`music`,label:`Music`}],r=e.length===n.length,i=e.length>0&&!r;return(0,c.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,c.jsx)(o,{label:`Event checklist`,checked:r,indeterminate:i,onCheckedChange:e=>t(e?n.map(e=>e.value):[])}),(0,c.jsx)(`div`,{className:`flex flex-col gap-3 pl-6`,children:n.map(n=>(0,c.jsx)(o,{label:n.label,name:`checklist`,value:n.value,checked:e.includes(n.value),onCheckedChange:e=>t(t=>e?[...t,n.value]:t.filter(e=>e!==n.value))},n.value))})]})}},h={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,c.jsx)(o,{label:`Unavailable option`,description:`Disabled with a description.`,disabled:!0}),(0,c.jsx)(o,{label:`Locked choice`,defaultChecked:!0,disabled:!0})]})},g={render:function(){let[e,t]=(0,s.useState)(!1);return(0,c.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,c.jsx)(o,{label:`Subscribe to updates`,checked:e,onCheckedChange:t}),(0,c.jsx)(`p`,{className:`text-sm text-tertiary`,children:e?`On`:`Off`})]})}},_={render:()=>(0,c.jsxs)(i,{status:`error`,children:[(0,c.jsx)(i.Label,{children:`Preferences`}),(0,c.jsx)(i.Content,{children:(0,c.jsx)(o,{label:`Share guest list with vendors`})}),(0,c.jsx)(i.Footer,{children:(0,c.jsx)(i.HelperText,{children:`You must accept this to continue.`})})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <Checkbox {...args} aria-label="Accept terms" />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <Checkbox size="sm" defaultChecked aria-label="Small" />
      <Checkbox size="md" defaultChecked aria-label="Medium" />
      <Checkbox size="lg" defaultChecked aria-label="Large" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-sm flex-col gap-4">
      <Checkbox label="Invite guests" description="Guests can view the gallery but cannot edit the event." defaultChecked />
      <Checkbox label="Allow plus-ones" description="Each guest may bring one companion." />
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function IndeterminateGroup() {
    const [selected, setSelected] = useState<string[]>(["seating"]);
    const options = [{
      value: "seating",
      label: "Seating chart"
    }, {
      value: "catering",
      label: "Catering"
    }, {
      value: "music",
      label: "Music"
    }];
    const allSelected = selected.length === options.length;
    const someSelected = selected.length > 0 && !allSelected;
    return <div className="flex flex-col gap-3">
        <Checkbox label="Event checklist" checked={allSelected} indeterminate={someSelected} onCheckedChange={next => setSelected(next ? options.map(option => option.value) : [])} />
        <div className="flex flex-col gap-3 pl-6">
          {options.map(option => <Checkbox key={option.value} label={option.label} name="checklist" value={option.value} checked={selected.includes(option.value)} onCheckedChange={next => setSelected(current => next ? [...current, option.value] : current.filter(value => value !== option.value))} />)}
        </div>
      </div>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Unavailable option" description="Disabled with a description." disabled />
      <Checkbox label="Locked choice" defaultChecked disabled />
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);
    return <div className="flex items-center gap-4">
        <Checkbox label="Subscribe to updates" checked={checked} onCheckedChange={setChecked} />
        <p className="text-sm text-tertiary">{checked ? "On" : "Off"}</p>
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Field status="error">
      <Field.Label>Preferences</Field.Label>
      <Field.Content>
        <Checkbox label="Share guest list with vendors" />
      </Field.Content>
      <Field.Footer>
        <Field.HelperText>You must accept this to continue.</Field.HelperText>
      </Field.Footer>
    </Field>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Sizes`,`WithLabel`,`WithDescription`,`Indeterminate`,`Disabled`,`Controlled`,`InField`]})))()}y();export{g as Controlled,u as Default,h as Disabled,_ as InField,m as Indeterminate,d as Sizes,p as WithDescription,f as WithLabel,v as __namedExportsOrder,l as default};