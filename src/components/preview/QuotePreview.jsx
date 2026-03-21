import { useQuote } from '../../context/QuoteContext'
import { INR } from '../../data/defaults'

export default function QuotePreview({ onModalImg }) {
  const { co, cl, items, charges, gst, gstType, totals, note, terms, bank, logo, logoSize } = useQuote()
  const { subtotal, taxable, cgst, sgst, igst, grand } = totals
  const hasImgs  = items.some(i => i.images.length > 0)
  const isIntra  = gstType === 'intra'

  return (
    <div className="bg-slate-300 py-6 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl" style={{ fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:11, color:'#1a1a2e', padding:'28px 32px' }}>

        {/* Letterhead */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'4px solid #1F4E79', paddingBottom:12, marginBottom:10 }}>
          {logo
            ? <img src={logo} style={{ height:logoSize, maxWidth:150, objectFit:'contain' }} alt="logo" />
            : <div style={{ width:logoSize*1.8, height:logoSize, background:'#E6E6E6', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color:'#6B7A8D', fontSize:10, border:'2px dashed #2C7DA0' }}>LOGO</div>
          }
          <div style={{ flex:1, textAlign:'right', paddingLeft:12 }}>
            <div style={{ fontSize:16, fontWeight:800, color:'#1F4E79', letterSpacing:1 }}>{co.name.toUpperCase()}</div>
            <div style={{ fontSize:9, color:'#6B7A8D', marginTop:3, lineHeight:1.8 }}>{co.address}</div>
            <div style={{ fontSize:9, color:'#6B7A8D' }}>{co.website} · {co.email}</div>
            <div style={{ fontSize:9, color:'#6B7A8D' }}>📞 {co.phone}</div>
            {co.gstin && (
              <div style={{ fontSize:9, color:'#1F4E79', fontWeight:700, marginTop:2 }}>
                GSTIN: <span style={{ letterSpacing:1 }}>{co.gstin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#1F4E79', color:'#fff', borderRadius:6, padding:'10px 14px', marginBottom:10 }}>
          <div style={{ fontSize:20, fontWeight:800, letterSpacing:4, color:'#F47C2C' }}>QUOTATION</div>
          <div style={{ textAlign:'right', fontSize:10, lineHeight:2.1 }}>
            <div><span style={{ color:'#aac4e0' }}>Quote No: </span><strong>{cl.quoteNo}</strong></div>
            <div><span style={{ color:'#aac4e0' }}>Date: </span><strong>{cl.date}</strong></div>
            <div><span style={{ color:'#aac4e0' }}>Valid Until: </span><strong style={{ color:'#F47C2C' }}>{cl.validUntil}</strong></div>
          </div>
        </div>

        {/* Banner */}
        <div style={{ background:'linear-gradient(90deg,#2C7DA0,#3a9fd4)', color:'#fff', fontWeight:700, fontSize:9, textAlign:'center', padding:6, letterSpacing:1.5, marginBottom:10, borderRadius:4, borderLeft:'4px solid #F47C2C' }}>
          THANK YOU FOR CONSIDERING US TO QUOTE FOR YOUR VALUABLE PROJECT
        </div>

        {/* Client table */}
        <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:12, fontSize:10 }}>
          <tbody>
            <tr>
              <td style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#f0f5fb', width:'50%' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>CLIENT NAME</div>
                <div style={{ color:'#1F4E79', fontWeight:700, marginTop:2 }}>{cl.clientName || '—'}</div>
              </td>
              <td style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#fff' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>KIND ATTN</div>
                <div style={{ color:'#1F4E79', fontWeight:700, marginTop:2 }}>{cl.attn || '—'}</div>
              </td>
            </tr>
            <tr>
              <td style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#fff' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>MOBILE NO</div>
                <div style={{ color:'#1F4E79', fontWeight:700, marginTop:2 }}>{cl.mobile || '—'}</div>
              </td>
              <td style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#f0f5fb' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>PROJECT NAME</div>
                <div style={{ color:'#1F4E79', fontWeight:700, marginTop:2 }}>{cl.project || '—'}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#f0f5fb' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>SITE NAME & LOCATION</div>
                <div style={{ color:'#1F4E79', fontWeight:700, marginTop:2 }}>{cl.site || '—'}</div>
              </td>
            </tr>
            {/* GSTIN row */}
            <tr>
              <td style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#fff' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>CLIENT GSTIN</div>
                <div style={{ color:'#1F4E79', fontWeight:700, marginTop:2, fontFamily:'monospace', letterSpacing:1 }}>{cl.gstin || '—'}</div>
              </td>
              <td style={{ border:'1px solid #D0D8E4', padding:'6px 10px', background:'#f0f5fb' }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:'#2C7DA0', textTransform:'uppercase', letterSpacing:1 }}>
                  SUPPLY TYPE
                </div>
                <div style={{ marginTop:2 }}>
                  <span style={{
                    background: isIntra ? '#1F4E79' : '#F47C2C',
                    color:'#fff', fontSize:8, fontWeight:700, padding:'1px 7px', borderRadius:10, letterSpacing:0.8
                  }}>
                    {isIntra ? '🏠 INTRA-STATE (CGST + SGST)' : '🚚 INTER-STATE (IGST)'}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Items table */}
        <div style={{ overflowX:'auto', marginBottom:12 }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10 }}>
            <thead>
              <tr style={{ background:'#1F4E79', color:'#fff' }}>
                {['SR','PRODUCT NAME','DESCRIPTION','UNIT','QTY','UNIT RATE','TOTAL',...(hasImgs?['IMAGES']:[])].map((h,i) => (
                  <th key={h} style={{ padding:'7px 5px', fontWeight:700, textAlign:i===0||i===3||i===4?'center':'left', fontSize:8.5, borderBottom:'3px solid #F47C2C', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0
                ? <tr><td colSpan={hasImgs?8:7} style={{ padding:20, textAlign:'center', color:'#bbb', fontStyle:'italic' }}>No items yet — go to Editor and add items</td></tr>
                : items.map((it, idx) => (
                  <tr key={it.id} style={{ background:idx%2===0?'#fff':'#f5f8fc', verticalAlign:'top' }}>
                    <td style={{ border:'1px solid #ddd', padding:'5px', textAlign:'center', fontWeight:700, color:'#1F4E79', width:28 }}>{idx+1}</td>
                    <td style={{ border:'1px solid #ddd', padding:'5px 7px', fontWeight:700, color:'#1F4E79' }}>{it.name}</td>
                    <td style={{ border:'1px solid #ddd', padding:'5px 7px', fontSize:8.5, color:'#444', whiteSpace:'pre-wrap', lineHeight:1.6 }}>{it.desc}</td>
                    <td style={{ border:'1px solid #ddd', padding:'5px', textAlign:'center', color:'#6B7A8D' }}>{it.unit}</td>
                    <td style={{ border:'1px solid #ddd', padding:'5px', textAlign:'center', fontWeight:600 }}>{it.qty}</td>
                    <td style={{ border:'1px solid #ddd', padding:'5px 7px', textAlign:'right', whiteSpace:'nowrap' }}>{INR(it.rate)}</td>
                    <td style={{ border:'1px solid #ddd', padding:'5px 7px', textAlign:'right', fontWeight:700, color:'#F47C2C', whiteSpace:'nowrap' }}>{INR(it.qty*it.rate)}</td>
                    {hasImgs && (
                      <td style={{ border:'1px solid #ddd', padding:3, width:54 }}>
                        {it.images.map((img,i) => (
                          <img key={i} src={img.src} onClick={() => onModalImg(img.src)}
                            style={{ width:22, height:22, objectFit:'cover', borderRadius:2, cursor:'zoom-in', margin:1 }} alt="" />
                        ))}
                      </td>
                    )}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:12 }}>
          <div style={{ width:300, border:'1px solid #D0D8E4', borderRadius:6, overflow:'hidden', fontSize:11 }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 12px', background:'#f5f8fc', borderBottom:'1px solid #D0D8E4' }}>
              <span style={{ color:'#6B7A8D' }}>Sub Total</span><span style={{ fontWeight:600 }}>{INR(subtotal)}</span>
            </div>
            {charges.filter(c => c.label || Number(c.amount) > 0).map((c,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 12px', background:'#fff', borderBottom:'1px solid #D0D8E4' }}>
                <span style={{ color:'#6B7A8D' }}>{c.label||'Charge'}</span><span style={{ fontWeight:600 }}>{INR(c.amount)}</span>
              </div>
            ))}
            {gst && (
              <div style={{ display:'flex', justifyContent:'space-between', padding:'5px 12px', background:'#f0f5fb', borderBottom:'1px solid #D0D8E4' }}>
                <span style={{ color:'#6B7A8D', fontStyle:'italic', fontSize:10 }}>Taxable Amount</span>
                <span style={{ fontWeight:600, fontSize:10 }}>{INR(taxable)}</span>
              </div>
            )}
            {gst && isIntra && (
              <>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 12px', background:'#fff', borderBottom:'1px solid #D0D8E4' }}>
                  <span style={{ color:'#6B7A8D' }}>CGST @ 9%</span><span style={{ fontWeight:600 }}>{INR(cgst)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 12px', background:'#f5f8fc', borderBottom:'1px solid #D0D8E4' }}>
                  <span style={{ color:'#6B7A8D' }}>SGST @ 9%</span><span style={{ fontWeight:600 }}>{INR(sgst)}</span>
                </div>
              </>
            )}
            {gst && !isIntra && (
              <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 12px', background:'#fff', borderBottom:'1px solid #D0D8E4' }}>
                <span style={{ color:'#6B7A8D' }}>IGST @ 18%</span><span style={{ fontWeight:600 }}>{INR(igst)}</span>
              </div>
            )}
            <div style={{ display:'flex', justifyContent:'space-between', padding:'9px 12px', background:'#1F4E79' }}>
              <span style={{ color:'#F47C2C', fontWeight:800, fontSize:12, letterSpacing:1 }}>GRAND TOTAL</span>
              <span style={{ color:'#F47C2C', fontWeight:800, fontSize:12 }}>{INR(grand)}</span>
            </div>
          </div>
        </div>

        {/* Note */}
        {note && (
          <div style={{ background:'#FFFBEB', borderLeft:'4px solid #F47C2C', border:'1px solid #F6D860', borderRadius:5, padding:'8px 12px', marginBottom:12, fontSize:10, color:'#7B4F00', fontWeight:600 }}>
            {note}
          </div>
        )}

        {/* Terms */}
        <div style={{ marginBottom:12, border:'1px solid #D0D8E4', borderRadius:4, overflow:'hidden' }}>
          <div style={{ background:'#1F4E79', color:'#fff', padding:'6px 12px', fontSize:8.5, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase' }}>Terms & Conditions</div>
          <div style={{ padding:'9px 12px', fontSize:8, color:'#444', whiteSpace:'pre-wrap', lineHeight:1.9, background:'#fafbfc' }}>{terms}</div>
        </div>

        {/* Bank */}
        <div style={{ marginBottom:12, border:'1px solid #b8d0e8', borderRadius:4, overflow:'hidden' }}>
          <div style={{ background:'#2C7DA0', color:'#fff', padding:'6px 12px', fontSize:8.5, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase' }}>Bank Details</div>
          <div style={{ padding:'9px 12px', fontSize:9.5, color:'#1a3a5c', whiteSpace:'pre-wrap', lineHeight:2, background:'#EBF5FB' }}>{bank}</div>
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1px solid #D0D8E4', paddingTop:7, display:'flex', justifyContent:'space-between', fontSize:8.5, color:'#6B7A8D' }}>
          <span style={{ color:'#1F4E79', fontWeight:700 }}>{co.name}</span>
          <span style={{ color:'#F47C2C' }}>● {co.website}</span>
          <span>Quote: {cl.quoteNo} | {cl.date}</span>
        </div>

      </div>
    </div>
  )
}
