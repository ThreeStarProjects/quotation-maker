import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Btn, Card } from '../ui'
import { INR } from '../../data/defaults'

export default function ChargesSection() {
  const { charges, addCharge, updCharge, delCharge, totals, gst, setGst, gstType, setGstType, co, cl } = useQuote()
  const { subtotal, taxable, cgst, sgst, igst, grand } = totals

  // Auto-detect intra vs inter based on states
  const sameState = co.state && cl.state
    ? co.state.trim().toLowerCase() === cl.state.trim().toLowerCase()
    : null

  const isIntra = gstType === 'intra'

  return (
    <Card className="mb-3">
      <SectionHdr title="Additional Charges & Totals" color="bg-teal" />
      <div className="p-4">
        {charges.map((c, i) => (
          <div key={c.id} className="flex gap-2 mb-2 items-center">
            <input
              value={c.label} onChange={e => updCharge(i, 'label', e.target.value)}
              placeholder="Label (e.g. Transport)"
              className="flex-[2] px-3 py-2 border border-border rounded text-sm bg-white outline-none focus:border-teal"
            />
            <input
              type="number" min="0" value={c.amount}
              onChange={e => updCharge(i, 'amount', e.target.value)}
              placeholder="₹ 0"
              className="flex-1 px-3 py-2 border border-border rounded text-sm bg-white outline-none focus:border-teal"
            />
            <Btn variant="red" className="px-3 py-2" onClick={() => delCharge(i)}>✕</Btn>
          </div>
        ))}
        <Btn variant="navy" className="text-xs mb-4" onClick={addCharge}>+ Add Charge</Btn>

        {/* GST Controls */}
        <div className="bg-orange/5 border border-orange/30 rounded-lg p-3 mb-4">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">GST Settings</p>

          {/* GST on/off */}
          <label className="flex items-center gap-2 text-sm font-semibold text-navy cursor-pointer mb-3">
            <input
              type="checkbox" checked={gst} onChange={e => setGst(e.target.checked)}
              className="accent-teal w-4 h-4"
            />
            Apply GST @ 18%
          </label>

          {/* Intra / Inter toggle */}
          {gst && (
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">
                Supply Type
                {sameState !== null && (
                  <span className={`ml-2 normal-case font-normal ${sameState ? 'text-teal' : 'text-orange'}`}>
                    (auto-detected: {sameState ? 'same state' : 'different state'})
                  </span>
                )}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setGstType('intra')}
                  className={`flex-1 py-2 rounded-md text-xs font-bold border-2 transition-all cursor-pointer
                    ${isIntra ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'}`}
                >
                  🏠 Intra-State<br />
                  <span className="font-normal">CGST 9% + SGST 9%</span>
                </button>
                <button
                  onClick={() => setGstType('inter')}
                  className={`flex-1 py-2 rounded-md text-xs font-bold border-2 transition-all cursor-pointer
                    ${!isIntra ? 'bg-orange text-white border-orange' : 'bg-white text-muted border-border hover:border-orange'}`}
                >
                  🚚 Inter-State<br />
                  <span className="font-normal">IGST 18%</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Totals table */}
        <div className="border border-border rounded-lg overflow-hidden text-sm">
          <div className="flex justify-between px-4 py-2.5 bg-offwhite border-b border-border">
            <span className="text-muted">Sub Total</span>
            <span className="font-semibold">{INR(subtotal)}</span>
          </div>

          {charges.filter(c => c.label || Number(c.amount) > 0).map((c, i) => (
            <div key={i} className="flex justify-between px-4 py-2.5 bg-white border-b border-border">
              <span className="text-muted">{c.label || "Charge"}</span>
              <span className="font-semibold">{INR(c.amount)}</span>
            </div>
          ))}

          {gst && (
            <div className="flex justify-between px-4 py-2 bg-offwhite border-b border-border">
              <span className="text-muted text-xs italic">Taxable Amount</span>
              <span className="font-semibold text-xs">{INR(taxable)}</span>
            </div>
          )}

          {gst && isIntra && (
            <>
              <div className="flex justify-between px-4 py-2.5 bg-white border-b border-border">
                <span className="text-muted">CGST @ 9%</span>
                <span className="font-semibold">{INR(cgst)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 bg-offwhite border-b border-border">
                <span className="text-muted">SGST @ 9%</span>
                <span className="font-semibold">{INR(sgst)}</span>
              </div>
            </>
          )}

          {gst && !isIntra && (
            <div className="flex justify-between px-4 py-2.5 bg-white border-b border-border">
              <span className="text-muted">IGST @ 18%</span>
              <span className="font-semibold">{INR(igst)}</span>
            </div>
          )}

          <div className="flex justify-between px-4 py-3 bg-navy">
            <span className="text-orange font-extrabold text-base tracking-wide">GRAND TOTAL</span>
            <span className="text-orange font-extrabold text-base">{INR(grand)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
