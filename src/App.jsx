import { useState, useCallback } from 'react'
import { pdf } from '@react-pdf/renderer'
import { QuoteProvider, useQuote } from './context/QuoteContext'
import CompanySection from './components/editor/CompanySection'
import ClientSection  from './components/editor/ClientSection'
import ItemsSection   from './components/editor/ItemsSection'
import ChargesSection from './components/editor/ChargesSection'
import TermsSection   from './components/editor/TermsSection'
import QuotePreview   from './components/preview/QuotePreview'
import QuotePDF       from './components/pdf/QuotePDF'
import { Btn, Modal } from './components/ui'
import { INR }        from './data/defaults'

// ── Share Modal ───────────────────────────────────────────
function ShareModal({ onClose }) {
  const { co, cl, items, charges, gst, gstType, totals, note } = useQuote()
  const { subtotal, cgst, sgst, igst, grand } = totals
  const [copied, setCopied] = useState(false)
  const isIntra = gstType === 'intra'

  const gstLines = gst
    ? isIntra
      ? `\nCGST @ 9%     : ${INR(cgst)}\nSGST @ 9%     : ${INR(sgst)}`
      : `\nIGST @ 18%    : ${INR(igst)}`
    : ''

  const lines   = items.map((it, i) => `  ${i+1}. ${it.name} — Qty: ${it.qty} x ${INR(it.rate)} = ${INR(it.qty * it.rate)}`).join('\n')
  const xtra    = charges.filter(c => c.label || Number(c.amount) > 0).map(c => `\n${(c.label||'Charge').padEnd(14)}: ${INR(c.amount)}`).join('')
  const body    = `Dear ${cl.attn||cl.clientName||'Sir/Madam'},\n\nPlease find our quotation for your reference.\n\nQuotation No : ${cl.quoteNo}\nDate         : ${cl.date}\nValid Until  : ${cl.validUntil}\nProject      : ${cl.project||'—'}\nSite         : ${cl.site||'—'}\n\n── ITEMS ──────────────────────────\n${lines||'  (No items)'}\n\nSub Total     : ${INR(subtotal)}${xtra}${gstLines}\nGRAND TOTAL   : ${INR(grand)}\n\n${note?`Note: ${note}\n\n`:''}Kindly revert with your confirmation or queries.\n\nWarm regards,\n${co.name}\n${co.phone}\n${co.email}\n${co.website}`
  const subject = `Quotation ${cl.quoteNo} – ${cl.project||co.name}`
  const waMsg   = encodeURIComponent(`Hi ${cl.attn||cl.clientName||''},\n\nQuotation *${cl.quoteNo}* for project *${cl.project||''}*\nGrand Total: *${INR(grand)}*\n\nKindly review and confirm.\n\nRegards,\n${co.name}`)

  const copy = () => {
    navigator.clipboard?.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal onClose={onClose} title="📤 Share Quotation">
      <div className="mb-4">
        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">WhatsApp</p>
        <a href={`https://wa.me/?text=${waMsg}`} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white rounded-lg px-4 py-2.5 font-bold text-sm no-underline mb-2 hover:opacity-90">
          💬 Send via WhatsApp
        </a>
        {cl.mobile && (
          <a href={`https://wa.me/91${cl.mobile.replace(/\D/g,'')}?text=${waMsg}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-[#128C7E] text-white rounded-lg px-4 py-2.5 font-bold text-sm no-underline hover:opacity-90">
            📱 Direct to {cl.mobile}
          </a>
        )}
      </div>
      <div className="mb-4">
        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Email</p>
        <a href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
          className="flex items-center gap-2 bg-teal text-white rounded-lg px-4 py-2.5 font-bold text-sm no-underline hover:opacity-90">
          ✉️ Open in Email Client
        </a>
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Copy Text</p>
        <textarea readOnly value={body} rows={5}
          className="w-full px-3 py-2 border border-border rounded text-xs bg-offwhite resize-none mb-2 font-mono" />
        <Btn variant="navy" className="w-full py-2.5" onClick={copy}>
          {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
        </Btn>
      </div>
    </Modal>
  )
}

// ── Saved Quotes Modal ────────────────────────────────────
function SavedModal({ onClose }) {
  const { loadQuote, resetQuote } = useQuote()
  const saved = JSON.parse(localStorage.getItem('savedQuotes') || '[]').reverse()

  return (
    <Modal onClose={onClose} title="📂 Saved Quotes">
      {saved.length === 0
        ? <p className="text-center text-muted italic py-8">No saved quotes yet</p>
        : saved.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg mb-2 bg-offwhite">
            <div>
              <div className="font-bold text-navy text-sm">{s.quoteNo}</div>
              <div className="text-xs text-muted">{s.client||'No client'} · {s.date}</div>
            </div>
            <Btn variant="teal" className="text-xs px-3 py-1.5" onClick={() => { loadQuote(s.key); onClose() }}>Load</Btn>
          </div>
        ))
      }
      <div className="mt-4 pt-4 border-t border-border">
        <Btn variant="red" className="w-full py-2.5 text-xs" onClick={() => { resetQuote(); onClose() }}>
          🗑 Reset / New Quote
        </Btn>
      </div>
    </Modal>
  )
}

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ src, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/90 z-[400] flex flex-col items-center justify-center cursor-zoom-out p-4">
      <img src={src} className="max-w-[92vw] max-h-[82vh] rounded-xl border-2 border-orange shadow-2xl object-contain" alt="enlarged" />
      <div className="mt-3 flex items-center gap-3">
        <span className="text-white/60 text-xs">Click anywhere to close</span>
        <a
          href={src} download="reference-image.jpg"
          onClick={e => e.stopPropagation()}
          className="bg-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg no-underline hover:opacity-90"
        >
          ⬇ Download
        </a>
      </div>
    </div>
  )
}

// ── Inner App ─────────────────────────────────────────────
function InnerApp() {
  const { co, cl, items, charges, gst, gstType, totals, note, terms, bank, logo, logoSize, saveQuote } = useQuote()
  const [tab,        setTab]        = useState('editor')
  const [modalImg,   setModalImg]   = useState(null)
  const [showShare,  setShowShare]  = useState(false)
  const [showSaved,  setShowSaved]  = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [saveMsg,    setSaveMsg]    = useState('')

  const downloadPDF = useCallback(async () => {
    setPdfLoading(true)
    try {
      const doc  = <QuotePDF co={co} cl={cl} items={items} charges={charges} gst={gst} gstType={gstType} totals={totals} note={note} terms={terms} bank={bank} logo={logo} logoSize={logoSize} />
      const blob = await pdf(doc).toBlob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `Quotation_${cl.quoteNo.replace(/\//g, '-')}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF error:', err)
      alert('PDF generation failed. Please try again.')
    } finally {
      setPdfLoading(false)
    }
  }, [co, cl, items, charges, gst, gstType, totals, note, terms, bank, logo, logoSize])

  const handleSave = () => {
    saveQuote()
    setSaveMsg('✅ Saved!')
    setTimeout(() => setSaveMsg(''), 2000)
  }

  return (
    <div className="min-h-screen bg-offwhite font-sans">

      {/* Top Bar */}
      <div className="bg-navy border-b-2 border-orange px-4 py-2 flex items-center justify-between sticky top-0 z-40 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {logo && <img src={logo} className="h-8 object-contain" alt="logo" />}
          <div>
            <div className="text-white font-bold text-sm">{co.name}</div>
            <div className="text-orange text-[9px] tracking-widest uppercase">Quotation Generator</div>
          </div>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Btn variant={tab === 'preview' ? 'orange' : 'gray'} onClick={() => setTab(t => t === 'editor' ? 'preview' : 'editor')}>
            {tab === 'editor' ? '👁 Preview' : '✏️ Editor'}
          </Btn>
          <Btn variant="white" onClick={handleSave}>{saveMsg || '💾 Save'}</Btn>
          <Btn variant="white" onClick={() => setShowSaved(true)}>📂 Saved</Btn>
          <Btn variant="teal"  onClick={() => setShowShare(true)}>📤 Share</Btn>
          <Btn variant="orange" onClick={downloadPDF} disabled={pdfLoading} className="shadow-lg shadow-orange/30">
            {pdfLoading ? '⏳ Generating…' : '⬇ Download PDF'}
          </Btn>
        </div>
      </div>

      {/* How-to banner */}
      <div className="bg-[#1a3a5c] text-[#aac4e0] px-4 py-2 text-xs flex items-center gap-2 flex-wrap">
        <span className="text-orange font-bold">How to get PDF:</span>
        <span>Fill details → Click <strong className="text-white">⬇ Download PDF</strong> → File downloads instantly ✅</span>
      </div>

      {/* Editor */}
      {tab === 'editor' && (
        <div className="max-w-2xl mx-auto px-3 py-4">
          <CompanySection />
          <ClientSection />
          <ItemsSection onModalImg={setModalImg} />
          <ChargesSection />
          <TermsSection />
          <Btn variant="orange" onClick={downloadPDF} disabled={pdfLoading}
            className="w-full py-4 text-base rounded-xl shadow-xl shadow-orange/30 mt-2">
            {pdfLoading ? '⏳ Generating PDF…' : '⬇ Download PDF'}
          </Btn>
        </div>
      )}

      {/* Preview */}
      {tab === 'preview' && <QuotePreview onModalImg={setModalImg} />}

      {/* Modals */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
      {showSaved && <SavedModal onClose={() => setShowSaved(false)} />}
      {modalImg  && <Lightbox  src={modalImg} onClose={() => setModalImg(null)} />}
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────
export default function App() {
  return (
    <QuoteProvider>
      <InnerApp />
    </QuoteProvider>
  )
}
