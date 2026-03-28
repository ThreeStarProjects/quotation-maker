import { createContext, useContext, useState, useCallback } from 'react'
import {
  DEFAULT_COMPANY, DEFAULT_CLIENT, DEFAULT_CHARGES,
  DEFAULT_TERMS, DEFAULT_BANK, DEFAULT_ANNEX_IMG_SIZE, DEFAULT_ANNEX_IMG_COLS,
  toB64, calcTotals
} from '../data/defaults'
import { mkItem, dupItem } from '../data/products'

const QuoteContext = createContext(null)
export const useQuote = () => useContext(QuoteContext)

export function QuoteProvider({ children }) {
  const [logo,          setLogoRaw]       = useState(null)
  const [logoSize,      setLogoSize]      = useState(64)
  const [co,            setCo]            = useState(DEFAULT_COMPANY)
  const [cl,            setCl]            = useState(() => DEFAULT_CLIENT())
  const [items,         setItems]         = useState([])
  const [charges,       setCharges]       = useState(() => DEFAULT_CHARGES())
  const [note,          setNote]          = useState("NOTE:- MATHADI CHARGES NOT IN OUR SCOPE")
  const [gst,           setGst]           = useState(true)
  const [gstType,       setGstType]       = useState('intra')
  const [terms,         setTerms]         = useState(DEFAULT_TERMS)
  const [bank,          setBank]          = useState(DEFAULT_BANK)
  const [annexImgSize,  setAnnexImgSize]  = useState(DEFAULT_ANNEX_IMG_SIZE)
  const [annexImgCols,  setAnnexImgCols]  = useState(DEFAULT_ANNEX_IMG_COLS)

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

  // Image handlers — each image stored as { src, caption }
  const addImg = useCallback(async (id, file) => {
    const b64 = await toB64(file)
    setItems(p => p.map(i => i.id === id
      ? { ...i, images: [...i.images, { src: b64, caption: '' }] }
      : i
    ))
  }, [])

  const delImg = useCallback((id, idx) => {
    setItems(p => p.map(i => i.id === id
      ? { ...i, images: i.images.filter((_, j) => j !== idx) }
      : i
    ))
  }, [])

  // Update caption for a specific image
  const updImgCaption = useCallback((id, imgIdx, caption) => {
    setItems(p => p.map(i => i.id === id
      ? { ...i, images: i.images.map((img, j) => j === imgIdx ? { ...img, caption } : img) }
      : i
    ))
  }, [])

  // Move image within an item's images array using arrow buttons
  const moveImg = useCallback((id, fromIdx, toIdx) => {
    setItems(p => p.map(i => {
      if (i.id !== id) return i
      const imgs = [...i.images]
      const [moved] = imgs.splice(fromIdx, 1)
      imgs.splice(toIdx, 0, moved)
      return { ...i, images: imgs }
    }))
  }, [])

  const addCharge = useCallback(() => setCharges(p => [...p, { id: Date.now(), label: "", amount: 0 }]), [])
  const updCharge = useCallback((idx, field, val) => setCharges(p => p.map((c, i) => i === idx ? { ...c, [field]: val } : c)), [])
  const delCharge = useCallback((idx) => setCharges(p => p.filter((_, i) => i !== idx)), [])

  const totals = calcTotals(items, charges, gst, gstType)

  const saveQuote = useCallback(() => {
    const data = { co, cl, items, charges, note, gst, gstType, terms, bank, logo, logoSize, annexImgSize, annexImgCols }
    const key  = `quote_${cl.quoteNo}_${Date.now()}`
    localStorage.setItem(key, JSON.stringify(data))
    const saved = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    saved.push({ key, quoteNo: cl.quoteNo, client: cl.clientName, date: cl.date })
    localStorage.setItem('savedQuotes', JSON.stringify(saved))
    return key
  }, [co, cl, items, charges, note, gst, gstType, terms, bank, logo, logoSize, annexImgSize, annexImgCols])

  const loadQuote = useCallback((key) => {
    const raw = localStorage.getItem(key)
    if (!raw) return false
    const d = JSON.parse(raw)
    setCo(d.co);               setCl(d.cl)
    setItems(d.items);         setCharges(d.charges)
    setNote(d.note);           setGst(d.gst)
    setGstType(d.gstType || 'intra')
    setTerms(d.terms);         setBank(d.bank)
    setLogoRaw(d.logo);        setLogoSize(d.logoSize)
    setAnnexImgSize(d.annexImgSize || DEFAULT_ANNEX_IMG_SIZE)
    setAnnexImgCols(d.annexImgCols || DEFAULT_ANNEX_IMG_COLS)
    return true
  }, [])

  const resetQuote = useCallback(() => {
    setLogoRaw(null);          setLogoSize(64)
    setCo(DEFAULT_COMPANY);    setCl(DEFAULT_CLIENT())
    setItems([]);              setCharges(DEFAULT_CHARGES())
    setNote("NOTE:- MATHADI CHARGES NOT IN OUR SCOPE")
    setGst(true);              setGstType('intra')
    setTerms(DEFAULT_TERMS);   setBank(DEFAULT_BANK)
    setAnnexImgSize(DEFAULT_ANNEX_IMG_SIZE)
    setAnnexImgCols(DEFAULT_ANNEX_IMG_COLS)
  }, [])

  return (
    <QuoteContext.Provider value={{
      logo, logoSize, setLogoSize, uploadLogo,
      co, updCo,
      cl, updCl,
      items, addItem, updItem, delItem, dupRow, moveItem,
      addImg, delImg, updImgCaption, moveImg,
      charges, addCharge, updCharge, delCharge,
      note, setNote,
      gst, setGst,
      gstType, setGstType,
      terms, setTerms,
      bank, setBank,
      annexImgSize, setAnnexImgSize,
      annexImgCols, setAnnexImgCols,
      totals,
      saveQuote, loadQuote, resetQuote,
    }}>
      {children}
    </QuoteContext.Provider>
  )
}
