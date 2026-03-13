export const todayStr = () =>
  new Date().toLocaleDateString("en-IN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  })

export const validStr = () => {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toLocaleDateString("en-IN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  })
}

export const autoQN = () => {
  const d = new Date()
  return `3SP/${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`
}

export const INR = (n) =>
  "₹" + new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(Number(n) || 0)

export const calcTotals = (items, charges, gst) => {
  const subtotal = items.reduce((a, i) => a + i.qty * i.rate, 0)
  const totChg   = charges.reduce((a, c) => a + Number(c.amount || 0), 0)
  const gstAmt   = gst ? (subtotal + totChg) * 0.18 : 0
  return { subtotal, totChg, gstAmt, grand: subtotal + totChg + gstAmt }
}

export const toB64 = (f) =>
  new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result)
    r.onerror = rej
    r.readAsDataURL(f)
  })

export const DEFAULT_COMPANY = {
  name:    "Three Star Projects Pvt. Ltd.",
  address: "G-15, Eternity Mall & Commercial Premises, Teen Hath Naka, L.B.S Marg, Near Eastern Express Highway, Thane(w) - 400604",
  website: "www.3starprojects.com",
  email:   "gsp@3starprojects.com | info@3starprojects.com",
  phone:   "7303111333 / 7498111222",
}

export const DEFAULT_CLIENT = () => ({
  clientName: "",
  attn:       "",
  mobile:     "",
  project:    "",
  site:       "",
  quoteNo:    autoQN(),
  date:       todayStr(),
  validUntil: validStr(),
})

export const DEFAULT_CHARGES = () => ([
  { id: 1, label: "Transportation & Installation", amount: 0 },
])

export const DEFAULT_TERMS = `1. GST @ 18% will be applicable.
2. Price quoted are subject to the specifications mentioned above.
3. Price may vary subject to change in specifications.
4. All the local taxes, entry tax, handling charges, mathadi charges shall be borne by the client.
5. No returns/claims shall be entertained unless communicated in writing by the client within 2 weeks from the delivery date.
6. The property of goods supplied does not pass to the client unless full value is released from buyer.
7. Tolerance of (+5/6 mm / -5/6mm) in sizes should be accepted by buyer.
8. The product offered as per above specification are on sale basis and no TDS is required to be deducted by buyer.
9. If deliveries are delayed beyond 15 days from PO delivery dates, warehouse charges @ 1% of finished goods value per week shall apply.
10. If place of installation is above 1st floor, customer must provide service lift, otherwise manual lifting charges borne by customer.
11. A notice period of 5 days will be given prior to dispatch for inspecting material at our works. If not done, material is deemed accepted.
12. Once material is unloaded at site, prevention and security is in client scope. Missing/damaged packets are chargeable to customer.
13. Customer should provide contact person details at site for unloading and installation coordination.
14. Opening of any carton/package by any agency other than 3 STAR PROJECTS before payment clearance violates agreed payment terms.
15. It will be illegal to continue using furniture installed at site if any cheque issued for the same is dishonoured.
16. Installation takes place only once site is clear (civil, false ceiling, AC, fire fighting, painting, carpentry etc.).
17. Estimated delivery (4 weeks) after all confirmation of PO, advance and specifications.
18. Payment terms: 60% Advance, 30% before delivery & 10% after installation.
19. Above terms are considered accepted by the client once the Purchase Order is received.`

export const DEFAULT_BANK = `A/c Name: Three Star Projects Private Limited
Bank Name: Kotak Mahindra Bank
A/c Type: Current Account | A/c No.: 1313204352 | IFSC Code: KKBK0000628

A/c Name: Three Star Projects Private Limited
Bank Name: Axis Bank Ltd.
A/c Type: Current Account | A/c No.: 925020019923253 | IFSC Code: UTIB0004852`
