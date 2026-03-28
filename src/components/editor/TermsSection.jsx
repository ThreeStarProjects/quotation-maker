import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Card } from '../ui'

export default function TermsSection() {
  const { note, setNote, terms, setTerms, bank, setBank, annexImgSize, setAnnexImgSize, annexImgCols, setAnnexImgCols } = useQuote()

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

        {/* Annex Image Settings */}
        <div className="bg-teal/5 border border-teal/30 rounded-lg p-3">
          <p className="text-[10px] font-bold text-teal uppercase tracking-widest mb-3">
            📎 Reference Images Annex Settings
          </p>

          {/* Size slider */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">
                Image Size in PDF
              </label>
              <span className="text-xs font-bold text-teal">{annexImgSize}pt</span>
            </div>
            <input
              type="range" min={80} max={200} step={10} value={annexImgSize}
              onChange={e => setAnnexImgSize(Number(e.target.value))}
              className="w-full accent-teal"
            />
            <div className="flex justify-between text-[9px] text-muted mt-0.5">
              <span>Small (80pt)</span>
              <span>Default (150pt)</span>
              <span>Large (200pt)</span>
            </div>
          </div>

          {/* Images per row */}
          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
              Images per Row in PDF
            </label>
            <div className="flex gap-2">
              {[2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setAnnexImgCols(n)}
                  className={`flex-1 py-2 rounded-md text-xs font-bold border-2 transition-all cursor-pointer
                    ${annexImgCols === n
                      ? 'bg-teal text-white border-teal'
                      : 'bg-white text-muted border-border hover:border-teal'
                    }`}
                >
                  {n} per row
                  <div className="font-normal text-[9px] mt-0.5 opacity-70">
                    {n === 2 ? 'larger images' : n === 3 ? 'balanced' : 'compact'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Card>
  )
}
