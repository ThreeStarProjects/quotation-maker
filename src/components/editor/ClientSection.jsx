import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Field, Card } from '../ui'

export default function ClientSection() {
  const { cl, updCl } = useQuote()

  return (
    <Card className="mb-3">
      <SectionHdr title="Client Details" color="bg-teal" />
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client Name"         value={cl.clientName} onChange={e => updCl('clientName', e.target.value)} />
          <Field label="Kind Attn / Contact" value={cl.attn}       onChange={e => updCl('attn',       e.target.value)} />
          <Field label="Mobile No"           value={cl.mobile}     onChange={e => updCl('mobile',     e.target.value)} />
          <Field label="Project Name"        value={cl.project}    onChange={e => updCl('project',    e.target.value)} />
        </div>
        <Field label="Site Name & Location" value={cl.site} onChange={e => updCl('site', e.target.value)} />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Quotation No" value={cl.quoteNo}    onChange={e => updCl('quoteNo',    e.target.value)} />
          <Field label="Date"         value={cl.date}       onChange={e => updCl('date',       e.target.value)} />
          <Field label="Valid Until"  value={cl.validUntil} onChange={e => updCl('validUntil', e.target.value)} />
        </div>
      </div>
    </Card>
  )
}
