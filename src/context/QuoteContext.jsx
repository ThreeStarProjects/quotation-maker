import { createContext, useContext, useState, useCallback } from 'react'
import {
  DEFAULT_COMPANY, DEFAULT_CLIENT, DEFAULT_CHARGES,
  DEFAULT_TERMS, DEFAULT_BANK, toB64, calcTotals
} from '../data/defaults'
import { mkItem, dupItem } from '../data/products'

const QuoteContext = createContext(null)
export const useQuote = () => useContext(QuoteContext)

export function QuoteProvider({ children }) {
  const [logo,     setLogoRaw]  = useState(null)
  const [logoSize, setLogoSize] = useState(64)
  const [co,       setCo]       = useState(DEFAULT_COMPANY)
  const [cl,       setCl]       = useState(DEFAULT_CLIENT)
  const [items,    setItems]    = useState([])
  const [charges,  setCharges]  = useState(DEFAULT_CHARGES)
  const [note,     setNote]     = useState("NOTE:- MATHADI CHARGES NOT IN OUR SCOPE")
  const [gst,      setGst]      = useState(true)
  const [gstType,  setGstType]  = useState('intra')   // 'intra' | 'inter'
  const [terms,    setTerms]    = useState(DEFAULT_TERMS)
  const [bank,     setBank]     = useState(DEFAULT_BANK)

  const updCo = useCallback((f, v) => setCo(p => ({ ...p, [f]: v })), [])
  const updCl = useCallback((f, v) => setCl(p => ({ ...p, [f]: v })), [])

  const uploadLogo = useCallback(async (file) => {
    if (!file) return
    const b64 = await toB64(file)
    setLogoRaw(b64)
  }, [])

  const addItem  = useCallback((product) => setItems(p => [...p, mkItem(product)]), [])
  const updItem  = useCallback((id, f, v) => setItems(p => p.map(i => i.id === id ? { ...i, [f]: v } : i)), [])
  const delItem  = useCallback((id) => setItems(p => p.filter(i => i.id !== id)), [])
  const dupRow   = useCallback((id) => {
    setItems(p => {
      const idx  = p.findIndex(i => i.id === id)
      const copy = dupItem(p[idx])
      const next = [...p]
      next.splice(idx + 1, 0, copy)
      return next
    })
  }, [])
  const moveItem = useCallback((fromIdx, toIdx) => {
    setItems(p => {
      const next = [...p]
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      return next
    })
  }, [])

  const addImg = useCallback(async (id, file) => {
    const b64 = await toB64(file)
    setItems(p => p.map(i => i.id === id ? { ...i, images: [...i.images, { src: b64 }] } : i))
  }, [])
  const delImg = useCallback((id, idx) => {
    setItems(p => p.map(i => i.id === id ? { ...i, images: i.images.filter((_, j) => j !== idx) } : i))
  }, [])

  const addCharge = useCallback(() => setCharges(p => [...p, { id: Date.now(), label: "", amount: 0 }]), [])
  const updCharge = useCallback((idx, field, val) => setCharges(p => p.map((c, i) => i === idx ? { ...c, [field]: val } : c)), [])
  const delCharge = useCallback((idx) => setCharges(p => p.filter((_, i) => i !== idx)), [])

  const totals = calcTotals(items, charges, gst, gstType)

  const saveQuote = useCallback(() => {
    const data = { co, cl, items, charges, note, gst, gstType, terms, bank, logo, logoSize }
    const key  = `quote_${cl.quoteNo}_${Date.now()}`
    localStorage.setItem(key, JSON.stringify(data))
    const saved = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    saved.push({ key, quoteNo: cl.quoteNo, client: cl.clientName, date: cl.date })
    localStorage.setItem('savedQuotes', JSON.stringify(saved))
    return key
  }, [co, cl, items, charges, note, gst, gstType, terms, bank, logo, logoSize])

  const loadQuote = useCallback((key) => {
    const raw = localStorage.getItem(key)
    if (!raw) return false
    const d = JSON.parse(raw)
    setCo(d.co);        setCl(d.cl)
    setItems(d.items);  setCharges(d.charges)
    setNote(d.note);    setGst(d.gst)
    setGstType(d.gstType || 'intra')
    setTerms(d.terms);  setBank(d.bank)
    setLogoRaw(d.logo); setLogoSize(d.logoSize)
    return true
  }, [])

  const resetQuote = useCallback(() => {
    setLogoRaw(null);   setLogoSize(64)
    setCo(DEFAULT_COMPANY)
    setCl(DEFAULT_CLIENT())
    setItems([])
    setCharges(DEFAULT_CHARGES())
    setNote("NOTE:- MATHADI CHARGES NOT IN OUR SCOPE")
    setGst(true)
    setGstType('intra')
    setTerms(DEFAULT_TERMS)
    setBank(DEFAULT_BANK)
  }, [])

  return (
    <QuoteContext.Provider value={{
      logo, logoSize, setLogoSize, uploadLogo,
      co, updCo,
      cl, updCl,
      items, addItem, updItem, delItem, dupRow, moveItem,
      addImg, delImg,
      charges, addCharge, updCharge, delCharge,
      note, setNote,
      gst, setGst,
      gstType, setGstType,
      terms, setTerms,
      bank, setBank,
      totals,
      saveQuote, loadQuote, resetQuote,
    }}>
      {children}
    </QuoteContext.Provider>
  )
}
