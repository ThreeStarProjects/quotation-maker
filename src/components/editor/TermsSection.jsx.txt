import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Card } from '../ui'

export default function TermsSection() {
  const { note, setNote, terms, setTerms, bank, setBank } = useQuote()

  return (
    <Card className="mb-3">
      <SectionHdr title="Note · Terms & Conditions · Bank Details" />
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Note</label>
          <textarea
            value={note} onChange={e => setNote(e.target.value)} rows={2}
            className="w-full px-3 py-2 border border-border rounded text-sm bg-white outline-none focus:border-teal resize-y"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Terms & Conditions</label>
          <textarea
            value={terms} onChange={e => setTerms(e.target.value)} rows={11}
            className="w-full px-3 py-2 border border-border rounded text-xs bg-white outline-none focus:border-teal resize-y leading-relaxed"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Bank Details</label>
          <textarea
            value={bank} onChange={e => setBank(e.target.value)} rows={5}
            className="w-full px-3 py-2 border border-border rounded text-xs bg-white outline-none focus:border-teal resize-y leading-relaxed"
          />
        </div>
      </div>
    </Card>
  )
}
