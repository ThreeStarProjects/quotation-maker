import { useState, useRef, memo } from 'react'
import { useQuote } from '../../context/QuoteContext'
import { SectionHdr, Btn, Modal, Card } from '../ui'
import { PRODUCTS } from '../../data/products'
import { INR } from '../../data/defaults'

const ItemRow = memo(({ item, idx, onUpd, onDel, onDup, onImg, onDelImg, onModal, onUpdCaption, onMoveImg }) => {
  const fileRef = useRef(null)

  return (
    <div className="border border-border border-l-4 border-l-teal rounded-lg p-3 mb-3 bg-offwhite">
      <div className="flex gap-2 mb-2 items-center">
        <span className="bg-navy text-orange rounded px-2 py-1 text-xs font-bold shrink-0">#{idx + 1}</span>
        <input
          value={item.name} onChange={e => onUpd(item.id, 'name', e.target.value)}
          placeholder="Product Name"
          className="flex-1 px-2 py-1.5 border border-border rounded text-sm bg-white outline-none focus:border-teal"
        />
        <input
          value={item.unit} onChange={e => onUpd(item.id, 'unit', e.target.value)}
          title="Unit"
          className="w-16 px-2 py-1.5 border border-border rounded text-sm bg-white outline-none focus:border-teal text-center"
        />
        <input
          type="number" min="1" value={item.qty}
          onChange={e => onUpd(item.id, 'qty', Math.max(1, Number(e.target.value) || 1))}
          title="Qty"
          className="w-14 px-2 py-1.5 border border-border rounded text-sm bg-white outline-none focus:border-teal text-center"
        />
      </div>
      <textarea
        value={item.desc} onChange={e => onUpd(item.id, 'desc', e.target.value)}
        rows={3} placeholder="Description / Specs"
        className="w-full px-2 py-1.5 border border-border rounded text-sm bg-white outline-none focus:border-teal resize-y mb-2"
      />
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Unit Rate (₹)</label>
          <input
            type="number" min="0" value={item.rate}
            onChange={e => onUpd(item.id, 'rate', Math.max(0, Number(e.target.value) || 0))}
            className="w-full px-2 py-1.5 border border-border rounded text-sm bg-white outline-none focus:border-teal"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Total</label>
          <div className="px-2 py-1.5 border border-orange rounded text-sm bg-orange/5 text-orange font-bold">
            {INR(item.qty * item.rate)}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Btn variant="teal" className="px-3 py-1.5 text-xs" onClick={() => fileRef.current?.click()}>📎</Btn>
          <Btn variant="navy" className="px-3 py-1.5 text-xs" onClick={() => onDup(item.id)}>⧉</Btn>
          <Btn variant="red"  className="px-3 py-1.5 text-xs" onClick={() => onDel(item.id)}>🗑</Btn>
        </div>
      </div>
      <input
        ref={fileRef} type="file" accept="image/*" multiple className="hidden"
        onChange={async e => {
          for (const f of Array.from(e.target.files)) await onImg(item.id, f)
          e.target.value = ""
        }}
      />

      {/* Image grid */}
      {item.images.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
            Reference Images <span className="normal-case font-normal text-teal">(click to enlarge)</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {item.images.map((img, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                {/* Image + hover overlay */}
                <div className="relative group">
                  <img
                    src={img.src} alt={`ref ${i + 1}`} onClick={() => onModal(img.src)}
                    className="w-28 h-28 object-cover rounded-lg border-2 border-teal cursor-zoom-in shadow-md hover:border-orange hover:scale-105 transition-all duration-150"
                  />
                  <div
                    onClick={() => onModal(img.src)}
                    className="absolute inset-0 bg-navy/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-zoom-in"
                  >
                    <span className="text-white text-xl">🔍</span>
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => onDelImg(item.id, i)}
                    className="absolute -top-2 -right-2 bg-red text-white rounded-full w-5 h-5 text-[10px] font-bold cursor-pointer border-2 border-white flex items-center justify-center shadow-md z-10"
                  >✕</button>
                  {/* Image number badge */}
                  <div className="absolute bottom-1 left-1 bg-navy/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {i + 1}
                  </div>
                </div>

                {/* Reorder arrows */}
                <div className="flex gap-1">
                  <button
                    disabled={i === 0}
                    onClick={() => onMoveImg(item.id, i, i - 1)}
                    className="w-6 h-6 rounded bg-navy/10 text-navy text-xs font-bold border border-border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-navy hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    title="Move left"
                  >◀</button>
                  <button
                    disabled={i === item.images.length - 1}
                    onClick={() => onMoveImg(item.id, i, i + 1)}
                    className="w-6 h-6 rounded bg-navy/10 text-navy text-xs font-bold border border-border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-navy hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    title="Move right"
                  >▶</button>
                </div>

                {/* Caption input */}
                <input
                  value={img.caption || ''}
                  onChange={e => onUpdCaption(item.id, i, e.target.value)}
                  placeholder={`Caption ${i + 1}`}
                  className="w-28 px-2 py-1 border border-border rounded text-[10px] bg-white outline-none focus:border-teal text-center"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

function ProductPicker({ onClose, onAdd }) {
  const [q, setQ] = useState("")
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.desc.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <Modal onClose={onClose} title="Product Picker">
      <input
        value={q} onChange={e => setQ(e.target.value)}
        placeholder="🔍 Search products…" autoFocus
        className="w-full px-3 py-2 border border-border rounded-md text-sm outline-none focus:border-teal mb-3"
      />
      <div className="space-y-2 mb-3">
        {filtered.length === 0
          ? <p className="text-center text-muted italic py-6">No products found</p>
          : filtered.map((p, i) => (
            <div
              key={i} onClick={() => { onAdd(p); onClose() }}
              className="px-3 py-2 rounded-lg border border-border border-l-4 border-l-teal bg-offwhite cursor-pointer hover:bg-teal/10 hover:border-l-orange transition-all"
            >
              <div className="font-bold text-[13px] text-navy">{p.name}</div>
              <div className="text-[11px] text-muted mt-0.5">
                {p.unit} · <span className="text-orange font-semibold">{INR(p.rate)}</span>
              </div>
            </div>
          ))
        }
      </div>
      <Btn variant="orange" className="w-full py-2.5" onClick={() => { onAdd(null); onClose() }}>
        + Add Custom Item
      </Btn>
    </Modal>
  )
}

export default function ItemsSection({ onModalImg }) {
  const { items, addItem, updItem, delItem, dupRow, addImg, delImg, updImgCaption, moveImg } = useQuote()
  const [showPicker, setShowPicker] = useState(false)

  return (
    <Card className="mb-3">
      <SectionHdr title="Product / Item Details" />
      <div className="p-4">
        {items.map((item, idx) => (
          <ItemRow
            key={item.id} item={item} idx={idx}
            onUpd={updItem}       onDel={delItem}       onDup={dupRow}
            onImg={addImg}        onDelImg={delImg}      onModal={onModalImg}
            onUpdCaption={updImgCaption}                 onMoveImg={moveImg}
          />
        ))}
        <Btn variant="orange" className="w-full py-2.5 text-sm" onClick={() => setShowPicker(true)}>
          + Add Item
        </Btn>
      </div>
      {showPicker && <ProductPicker onClose={() => setShowPicker(false)} onAdd={addItem} />}
    </Card>
  )
}
