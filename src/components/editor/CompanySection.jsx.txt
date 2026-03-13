import { useRef } from 'react'
import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Field, Card } from '../ui'

export default function CompanySection() {
  const { co, updCo, logo, logoSize, setLogoSize, uploadLogo } = useQuote()
  const logoRef = useRef(null)

  return (
    <Card className="mb-3">
      <SectionHdr title="Company Info" />
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            onClick={() => logoRef.current?.click()}
            className="w-20 h-20 border-2 border-dashed border-teal rounded-lg flex items-center justify-center cursor-pointer overflow-hidden bg-offwhite shrink-0 hover:border-orange transition-colors"
          >
            {logo
              ? <img src={logo} className="w-full h-full object-contain" alt="logo" />
              : <span className="text-[10px] text-muted text-center px-1">Click to upload logo</span>
            }
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
              Logo Height: {logoSize}px
            </label>
            <input
              type="range" min={40} max={120} value={logoSize}
              onChange={e => setLogoSize(+e.target.value)}
              className="w-full accent-teal"
            />
          </div>
        </div>
        <input
          ref={logoRef} type="file" accept="image/*" className="hidden"
          onChange={e => e.target.files[0] && uploadLogo(e.target.files[0])}
        />
        <Field label="Company Name" value={co.name}    onChange={e => updCo('name',    e.target.value)} />
        <Field label="Address"      value={co.address} onChange={e => updCo('address', e.target.value)} rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Website" value={co.website} onChange={e => updCo('website', e.target.value)} />
          <Field label="Email"   value={co.email}   onChange={e => updCo('email',   e.target.value)} />
        </div>
        <Field label="Phone" value={co.phone} onChange={e => updCo('phone', e.target.value)} />
      </div>
    </Card>
  )
}
