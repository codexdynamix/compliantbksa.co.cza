export const SITE = {
  name: "Compliant Bookkeeping SA",
  shortName: "Compliant",
  tagline: "Keeping your books compliant.",
  phone: "083 411 9467",
  phoneHref: "tel:+27834119467",
  phoneAlt: "074 206 3255",
  phoneAltHref: "tel:+27742063255",
  email: "info@compliantbksa.co.za",
  accountsEmail: "accounting@compliantbksa.co.za",
  whatsappHref:
    "https://wa.me/27834119467?text=Hello%20Compliant%20Bookkeeping%20SA%2C%20I%20would%20like%20to%20talk%20about%20bookkeeping%20support.",
  mapsCapeTown:
    "https://www.google.com/maps/search/?api=1&query=23+Bridge+Street%2C+Rosebank%2C+Cape+Town%2C+7700",
  mapsCeres:
    "https://www.google.com/maps/search/?api=1&query=8+Rietvalley+Street%2C+Ceres%2C+Western+Cape%2C+6835",
  capeTown: "23 Bridge Street, Rosebank, Cape Town, Western Cape, 7700",
  ceres: "8 Rietvalley Street, Ceres, Western Cape, 6835",
} as const;

export const navigation = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Agriculture", to: "/agricultural-accounting" },
  { label: "Outsource", to: "/outsource" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
] as const;

export const services = [
  {
    number: "01",
    title: "Bookkeeping",
    text: "Monthly bookkeeping and reconciliations that turn a pile of transactions into a picture your business can actually use.",
    tag: "Reliable books",
  },
  {
    number: "02",
    title: "Management accounts",
    text: "Meaningful monthly packs, reviewed and interpreted, so decisions are made with visibility rather than guesswork.",
    tag: "Monthly packs",
  },
  {
    number: "03",
    title: "VAT & tax support",
    text: "VAT, PAYE and income tax handled on time, with a calm hand for queries so SARS is never a surprise.",
    tag: "SARS support",
  },
  {
    number: "04",
    title: "Payroll",
    text: "Sage Payroll run properly — payslips, EMP201s and the monthly rhythm taken off your desk.",
    tag: "People paid",
  },
  {
    number: "05",
    title: "Financial statements",
    text: "Annual financial statements prepared with care, ready for review, lenders, or the next conversation that matters.",
    tag: "Year-end",
  },
  {
    number: "06",
    title: "Cash-flow planning",
    text: "Cash-flow forecasts that show what is coming, so you can move with intention rather than react under pressure.",
    tag: "Forecasts",
  },
  {
    number: "07",
    title: "CIPC compliance",
    text: "Annual returns, beneficial ownership and company secretarial housekeeping scheduled and done — off your mental load.",
    tag: "Statutory work",
  },
  {
    number: "08",
    title: "Models & budgets",
    text: "Financial models and budgets built for the actual business — not a template that pretends every client is the same.",
    tag: "Decision support",
  },
  {
    number: "09",
    title: "Loan & funding proposals",
    text: "Clear packs for banks and funders: the numbers, the story, and the supporting schedules they actually ask for.",
    tag: "Finance-ready",
  },
] as const;

export const faqs = [
  {
    question: "Who do you work best with?",
    answer:
      "Founder-led businesses, growing SMEs and established teams that want a finance function they can actually use. We also support professionals with personal and business tax needs.",
  },
  {
    question: "Can you take over from our current accountant?",
    answer:
      "Yes. We make the handover methodical: we review the current state, map open items, agree a clean starting point and give you a practical first-month plan.",
  },
  {
    question: "Do you only work with businesses in South Africa?",
    answer:
      "Our advisory is built around the South African operating context. We work primarily with local businesses and can coordinate with an existing team when an owner operates across borders.",
  },
  {
    question: "What happens in the first consultation?",
    answer:
      "It is a focused 30-minute conversation about where the numbers feel unclear, what is coming up next and what support would make the biggest difference. There is no obligation.",
  },
] as const;

export const agriculturalServices = [
  ["Farm bookkeeping", "Seasonal books that keep pace with harvests, input cycles and livestock movements."],
  ["Management accounts", "Monthly packs that show what the land, the herd and the season actually produced."],
  ["Cash-flow planning", "Forecasts built around planting, payouts and the long wait between them."],
  ["Financial statements", "Year-end statements prepared with farming realities in mind."],
  ["VAT & tax support", "VAT, diesel refunds and farming tax treated as the specialist work they are."],
  ["Payroll", "Seasonal and permanent payroll, UIF and the returns that go with it."],
  ["Loan & funding proposals", "Bank-ready packs for production loans, equipment finance and Land Bank conversations."],
  ["CIPC compliance", "Company, CC and trust housekeeping kept current so funding is not delayed by admin."],
  ["Financial models & budgets", "Crop, herd and input models you can take into a lender meeting."],
  ["Record keeping", "Source documents, asset registers and production records organised for the next audit or grant."],
] as const;

export const outsourceServices = [
  ["Bookkeeping & accounting", "Capture, recs and packs prepared to your review standard."],
  ["Payroll", "Sage Payroll processed so your managers are not spending month-end on EMP201s."],
  ["Taxation", "VAT201s, income tax workings and SARS follow-up, ready for the practitioner’s sign-off."],
  ["Cloud automation", "Sage Accounting and Xero kept clean, with bank feeds and schedules that survive review."],
  ["Company secretarial", "CIPC annual returns and beneficial ownership processed in batches for a firm’s client base."],
  ["Consulting support", "Cash-flow, budgets and funding workings when a client file needs more than the close."],
] as const;

export const priceTiers = [
  {
    size: "Small / micro entity",
    price: "From R1,000 pm",
    detail: "Straightforward books, a modest transaction volume, and the monthly compliance rhythm.",
    featured: false,
  },
  {
    size: "Growing business",
    price: "From R1,500–R2,500 pm",
    detail: "More activity, payroll, VAT and reporting that needs a closer monthly review.",
    featured: true,
  },
  {
    size: "Medium entity",
    price: "From R3,000 pm",
    detail: "Multiple ledgers, staff, VAT and a pack that supports management decisions.",
    featured: false,
  },
  {
    size: "Larger / complex entity",
    price: "Tailored quote",
    detail: "Group structures, higher volume or specialised reporting — scoped around the actual work.",
    featured: false,
    quote: true,
  },
] as const;
