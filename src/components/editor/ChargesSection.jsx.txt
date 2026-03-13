import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Btn, Card } from '../ui'
import { INR } from '../../data/defaults'

export default function ChargesSection() {
  const { charges, addCharge, updCharge, delCharge, totals, gst, setGst } = useQuote()
  const { subtotal, totChg, gstAmt, grand } = totals

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
          <div className="flex justify-between items-center px-4 py-2.5 bg-offwhite border-b border-border">
            <label className="flex items-center gap-2 text-muted cursor-pointer select-none">
              <input
                type="checkbox" checked={gst} onChange={e => setGst(e.target.checked)}
                className="accent-teal w-4 h-4"
              />
              GST @ 18%
            </label>
            <span className="font-semibold">{INR(gstAmt)}</span>
          </div>
          <div className="flex justify-between px-4 py-3 bg-navy">
            <span className="text-orange font-extrabold text-base tracking-wide">GRAND TOTAL</span>
            <span className="text-orange font-extrabold text-base">{INR(grand)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
