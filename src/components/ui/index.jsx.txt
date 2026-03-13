export const SectionHdr = ({ title, color = "bg-navy" }) => (
  <div className={`${color} text-white text-xs font-bold tracking-widest uppercase px-4 py-2 flex items-center gap-2`}>
    <span className="w-2 h-2 rounded-full bg-orange inline-block" />
    {title}
  </div>
)

export const Field = ({ label, value, onChange, rows, placeholder = "" }) => (
  <div className="mb-3">
    <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
      {label}
    </label>
    {rows
      ? <textarea
          value={value} onChange={onChange} rows={rows} placeholder={placeholder}
          className="w-full px-3 py-2 border border-border rounded-md text-sm bg-white outline-none focus:border-teal resize-y font-sans"
        />
      : <input
          value={value} onChange={onChange} placeholder={placeholder}
          className="w-full px-3 py-2 border border-border rounded-md text-sm bg-white outline-none focus:border-teal font-sans"
        />
    }
  </div>
)

const VARIANTS = {
  orange: "bg-orange    text-white hover:bg-orange/90",
  navy:   "bg-navy      text-white hover:bg-navy/90",
  teal:   "bg-teal      text-white hover:bg-teal/90",
  red:    "bg-red       text-white hover:bg-red/90",
  green:  "bg-green-600 text-white hover:bg-green-700",
  gray:   "bg-gray-200  text-gray-700 hover:bg-gray-300",
  white:  "bg-white     text-navy border border-border hover:bg-offwhite",
}

export const Btn = ({ variant = "navy", children, onClick, className = "", type = "button", disabled = false }) => (
  <button
    type={type} onClick={onClick} disabled={disabled}
    className={`cursor-pointer px-4 py-2 rounded-md font-bold text-xs border-none font-sans transition-all
      ${VARIANTS[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
  >
    {children}
  </button>
)

export const Modal = ({ onClose, title, children, maxW = "max-w-lg" }) => (
  <div className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className={`bg-white rounded-xl w-full ${maxW} max-h-[88vh] flex flex-col shadow-2xl`} onClick={e => e.stopPropagation()}>
      <div className="bg-navy text-white px-5 py-3 rounded-t-xl flex justify-between items-center border-b-2 border-orange">
        <span className="font-bold tracking-widest text-sm uppercase">{title}</span>
        <button onClick={onClose} className="text-orange text-xl font-bold bg-transparent border-none cursor-pointer leading-none">✕</button>
      </div>
      <div className="overflow-y-auto flex-1 p-5">{children}</div>
    </div>
  </div>
)

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-border overflow-hidden ${className}`}>
    {children}
  </div>
)
