import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { INR } from '../../data/defaults'

const S = StyleSheet.create({
  page:      { fontFamily:'Helvetica', fontSize:9, padding:'14mm 13mm', backgroundColor:'#fff', color:'#1a1a2e' },
  header:    { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'3pt solid #1F4E79', paddingBottom:8, marginBottom:8 },
  logoBox:   { width:70, height:40, backgroundColor:'#E6E6E6', alignItems:'center', justifyContent:'center', borderRadius:4 },
  logoImg:   { maxWidth:70, maxHeight:50, objectFit:'contain' },
  coRight:   { flex:1, alignItems:'flex-end', paddingLeft:10 },
  coName:    { fontSize:13, fontFamily:'Helvetica-Bold', color:'#1F4E79', letterSpacing:0.8, marginBottom:2 },
  coSub:     { fontSize:7, color:'#6B7A8D', lineHeight:1.6 },
  titleBar:  { flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#1F4E79', borderRadius:4, padding:'6pt 10pt', marginBottom:7 },
  titleText: { fontSize:16, fontFamily:'Helvetica-Bold', color:'#F47C2C', letterSpacing:3 },
  titleMeta: { alignItems:'flex-end' },
  metaRow:   { flexDirection:'row', gap:4 },
  metaLbl:   { fontSize:7.5, color:'#aac4e0' },
  metaVal:   { fontSize:7.5, fontFamily:'Helvetica-Bold', color:'#fff' },
  metaValOr: { fontSize:7.5, fontFamily:'Helvetica-Bold', color:'#F47C2C' },
  banner:    { backgroundColor:'#2C7DA0', padding:'4pt 8pt', marginBottom:7, borderRadius:3, borderLeft:'3pt solid #F47C2C' },
  bannerTxt: { fontSize:7, fontFamily:'Helvetica-Bold', color:'#fff', letterSpacing:1.2, textAlign:'center' },
  clientRow: { flexDirection:'row' },
  clientCell:{ flex:1, border:'0.5pt solid #D0D8E4', padding:'5pt 7pt' },
  clientLbl: { fontSize:6.5, fontFamily:'Helvetica-Bold', color:'#2C7DA0', textTransform:'uppercase', letterSpacing:0.8, marginBottom:2 },
  clientVal: { fontSize:8.5, fontFamily:'Helvetica-Bold', color:'#1F4E79' },
  tHead:     { flexDirection:'row', backgroundColor:'#1F4E79', borderBottom:'2pt solid #F47C2C' },
  tHCell:    { padding:'5pt 4pt', fontFamily:'Helvetica-Bold', fontSize:7.5, color:'#fff' },
  tRow:      { flexDirection:'row', borderBottom:'0.5pt solid #ddd' },
  tCell:     { padding:'4pt 4pt', fontSize:8, color:'#1a1a2e' },
  totalsWrap:{ alignItems:'flex-end', marginBottom:10 },
  totalsBox: { width:200, border:'0.5pt solid #D0D8E4', borderRadius:4, overflow:'hidden' },
  totRow:    { flexDirection:'row', justifyContent:'space-between', padding:'4pt 8pt', borderBottom:'0.5pt solid #D0D8E4', backgroundColor:'#f5f8fc' },
  totRowW:   { flexDirection:'row', justifyContent:'space-between', padding:'4pt 8pt', borderBottom:'0.5pt solid #D0D8E4', backgroundColor:'#fff' },
  totLbl:    { fontSize:8.5, color:'#6B7A8D' },
  totVal:    { fontSize:8.5, fontFamily:'Helvetica-Bold' },
  grandRow:  { flexDirection:'row', justifyContent:'space-between', padding:'6pt 8pt', backgroundColor:'#1F4E79' },
  grandTxt:  { fontSize:10, fontFamily:'Helvetica-Bold', color:'#F47C2C', letterSpacing:0.8 },
  note:      { backgroundColor:'#FFFBEB', border:'0.5pt solid #F6D860', borderLeft:'3pt solid #F47C2C', borderRadius:3, padding:'5pt 8pt', marginBottom:8, fontSize:8, color:'#7B4F00', fontFamily:'Helvetica-Bold' },
  sectionBox:{ border:'0.5pt solid #D0D8E4', borderRadius:3, overflow:'hidden', marginBottom:8 },
  sectionHdr:{ padding:'4pt 8pt', fontFamily:'Helvetica-Bold', fontSize:7.5, color:'#fff', letterSpacing:1.2, textTransform:'uppercase' },
  sectionBdy:{ padding:'6pt 8pt', fontSize:7, color:'#444', lineHeight:1.8, backgroundColor:'#fafbfc' },
  bankBdy:   { padding:'6pt 8pt', fontSize:8, color:'#1a3a5c', lineHeight:1.9, backgroundColor:'#EBF5FB' },
  footer:    { flexDirection:'row', justifyContent:'space-between', borderTop:'0.5pt solid #D0D8E4', paddingTop:5, marginTop:4 },
  footTxt:   { fontSize:7.5, color:'#6B7A8D' },
})

const COLS = [
  { key:'sr',    label:'SR',          w:'5%',  align:'center' },
  { key:'name',  label:'PRODUCT',     w:'20%', align:'left'   },
  { key:'desc',  label:'DESCRIPTION', w:'38%', align:'left'   },
  { key:'unit',  label:'UNIT',        w:'7%',  align:'center' },
  { key:'qty',   label:'QTY',         w:'5%',  align:'center' },
  { key:'rate',  label:'UNIT RATE',   w:'12%', align:'right'  },
  { key:'total', label:'TOTAL',       w:'13%', align:'right'  },
]

export default function QuotePDF({ co, cl, items, charges, gst, totals, note, terms, bank, logo }) {
  const { subtotal, gstAmt, grand } = totals
  const extraCharges = charges.filter(c => c.label || Number(c.amount) > 0)

  return (
    <Document>
      <Page size="A4" style={S.page}>

        {/* Letterhead */}
        <View style={S.header}>
          {logo
            ? <Image src={logo} style={S.logoImg} />
            : <View style={S.logoBox}><Text style={{ fontSize:8, color:'#6B7A8D' }}>LOGO</Text></View>
          }
          <View style={S.coRight}>
            <Text style={S.coName}>{co.name.toUpperCase()}</Text>
            <Text style={S.coSub}>{co.address}</Text>
            <Text style={S.coSub}>{co.website}  ·  {co.email}</Text>
            <Text style={S.coSub}>Ph: {co.phone}</Text>
          </View>
        </View>

        {/* Title bar */}
        <View style={S.titleBar}>
          <Text style={S.titleText}>QUOTATION</Text>
          <View style={S.titleMeta}>
            <View style={S.metaRow}><Text style={S.metaLbl}>Quote No:  </Text><Text style={S.metaVal}>{cl.quoteNo}</Text></View>
            <View style={S.metaRow}><Text style={S.metaLbl}>Date:  </Text><Text style={S.metaVal}>{cl.date}</Text></View>
            <View style={S.metaRow}><Text style={S.metaLbl}>Valid Until:  </Text><Text style={S.metaValOr}>{cl.validUntil}</Text></View>
          </View>
        </View>

        {/* Banner */}
        <View style={S.banner}>
          <Text style={S.bannerTxt}>THANK YOU FOR CONSIDERING US TO QUOTE FOR YOUR VALUABLE PROJECT</Text>
        </View>

        {/* Client info */}
        <View style={{ marginBottom:8 }}>
          <View style={S.clientRow}>
            <View style={[S.clientCell, { backgroundColor:'#f0f5fb' }]}>
              <Text style={S.clientLbl}>CLIENT NAME</Text>
              <Text style={S.clientVal}>{cl.clientName || '—'}</Text>
            </View>
            <View style={[S.clientCell, { backgroundColor:'#fff' }]}>
              <Text style={S.clientLbl}>KIND ATTN</Text>
              <Text style={S.clientVal}>{cl.attn || '—'}</Text>
            </View>
          </View>
          <View style={S.clientRow}>
            <View style={[S.clientCell, { backgroundColor:'#fff' }]}>
              <Text style={S.clientLbl}>MOBILE NO</Text>
              <Text style={S.clientVal}>{cl.mobile || '—'}</Text>
            </View>
            <View style={[S.clientCell, { backgroundColor:'#f0f5fb' }]}>
              <Text style={S.clientLbl}>PROJECT NAME</Text>
              <Text style={S.clientVal}>{cl.project || '—'}</Text>
            </View>
          </View>
          <View style={S.clientRow}>
            <View style={[S.clientCell, { flex:2, backgroundColor:'#f0f5fb' }]}>
              <Text style={S.clientLbl}>SITE NAME & LOCATION</Text>
              <Text style={S.clientVal}>{cl.site || '—'}</Text>
            </View>
          </View>
        </View>

        {/* Items table */}
        <View style={{ marginBottom:10 }}>
          <View style={S.tHead}>
            {COLS.map(c => (
              <Text key={c.key} style={[S.tHCell, { width:c.w, textAlign:c.align }]}>{c.label}</Text>
            ))}
          </View>
          {items.length === 0
            ? <View style={[S.tRow, { justifyContent:'center', padding:12 }]}>
                <Text style={{ fontSize:8, color:'#bbb' }}>No items added</Text>
              </View>
            : items.map((it, idx) => (
              <View key={it.id} style={[S.tRow, { backgroundColor:idx%2===0?'#fff':'#f5f8fc' }]}>
                <Text style={[S.tCell, { width:'5%',  textAlign:'center', fontFamily:'Helvetica-Bold', color:'#1F4E79' }]}>{idx+1}</Text>
                <Text style={[S.tCell, { width:'20%', fontFamily:'Helvetica-Bold', color:'#1F4E79' }]}>{it.name}</Text>
                <Text style={[S.tCell, { width:'38%', fontSize:7.5, color:'#444', lineHeight:1.5 }]}>{it.desc}</Text>
                <Text style={[S.tCell, { width:'7%',  textAlign:'center', color:'#6B7A8D' }]}>{it.unit}</Text>
                <Text style={[S.tCell, { width:'5%',  textAlign:'center', fontFamily:'Helvetica-Bold' }]}>{it.qty}</Text>
                <Text style={[S.tCell, { width:'12%', textAlign:'right' }]}>{INR(it.rate)}</Text>
                <Text style={[S.tCell, { width:'13%', textAlign:'right', fontFamily:'Helvetica-Bold', color:'#F47C2C' }]}>{INR(it.qty * it.rate)}</Text>
              </View>
            ))
          }
        </View>

        {/* Totals */}
        <View style={S.totalsWrap}>
          <View style={S.totalsBox}>
            <View style={S.totRow}>
              <Text style={S.totLbl}>Sub Total</Text>
              <Text style={S.totVal}>{INR(subtotal)}</Text>
            </View>
            {extraCharges.map((c, i) => (
              <View key={i} style={S.totRowW}>
                <Text style={S.totLbl}>{c.label || 'Charge'}</Text>
                <Text style={S.totVal}>{INR(c.amount)}</Text>
              </View>
            ))}
            {gst && (
              <View style={S.totRow}>
                <Text style={S.totLbl}>GST @ 18%</Text>
                <Text style={S.totVal}>{INR(gstAmt)}</Text>
              </View>
            )}
            <View style={S.grandRow}>
              <Text style={S.grandTxt}>GRAND TOTAL</Text>
              <Text style={S.grandTxt}>{INR(grand)}</Text>
            </View>
          </View>
        </View>

        {/* Note */}
        {note ? <View style={S.note}><Text>{note}</Text></View> : null}

        {/* Terms */}
        <View style={S.sectionBox}>
          <View style={[S.sectionHdr, { backgroundColor:'#1F4E79' }]}><Text>Terms & Conditions</Text></View>
          <View style={S.sectionBdy}><Text>{terms}</Text></View>
        </View>

        {/* Bank */}
        <View style={S.sectionBox}>
          <View style={[S.sectionHdr, { backgroundColor:'#2C7DA0' }]}><Text>Bank Details</Text></View>
          <View style={S.bankBdy}><Text>{bank}</Text></View>
        </View>

        {/* Footer */}
        <View style={S.footer}>
          <Text style={[S.footTxt, { color:'#1F4E79', fontFamily:'Helvetica-Bold' }]}>{co.name}</Text>
          <Text style={[S.footTxt, { color:'#F47C2C' }]}>● {co.website}</Text>
          <Text style={S.footTxt}>Quote: {cl.quoteNo} | {cl.date}</Text>
        </View>

      </Page>
    </Document>
  )
}
