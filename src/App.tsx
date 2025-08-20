import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Search, ExternalLink, Filter, Quote, Sun, Moon, Shuffle, Sparkles } from "lucide-react";

/**
 * ActuallyGoodRegulations.eu
 * Modern, bold, mobile-first single-file site.
 * - Functional minimalism with big typography and generous whitespace
 * - Warm earthy base + punchy neon accent for retro-futurist vibes
 * - Micro-animations, hover effects, animated cursor (reduced motion aware)
 * - Accessible by design (landmarks, labels, proper contrast, skip link)
 *
 * Tech:
 * - Tailwind CSS (assumed available in environment)
 * - Framer Motion for subtle animations
 * - No external images/fonts (sustainable performance)
 */

// ---------------------------
// Data
// ---------------------------

type RegItem = {
  id: string
  title: string
  tagline: string
  explainer: string
  url: string
  category: "Money" | "Travel" | "Digital" | "Safety" | "Food" | "Environment" | "Health" | "Shopping" | "Rights"
}

// Add example descriptions (here only one example shown, but you’d add for each regulation)
const REGULATIONS: RegItem[] = [
  {
    id: "consumer-rights-2011-83",
    title: "Consumer Rights Directive 2011/83/EU",
    tagline: "14 days to change your mind when shopping online. No pre‑ticked extras, clear prices.",
    explainer: "Sets EU‑wide rules for distance and online sales. Traders must present total prices upfront, obtain express consent for extras, and provide a 14‑day right of withdrawal with standard forms and timely refunds.",
    url: "https://eur-lex.europa.eu/eli/dir/2011/83/oj",
    category: "Shopping",
  },
  {
    id: "unfair-practices-2005-29",
    title: "Unfair Commercial Practices Directive 2005/29/EC",
    tagline: "Bans fake ‘only today!’ pressure, hidden traps, and other scammy sales tricks.",
    explainer: "Prohibits misleading and aggressive practices from ads to checkout. Blacklists things like fake limited offers, bait‑and‑switch, and hiding essential information so you can make informed choices.",
    url: "https://eur-lex.europa.eu/eli/dir/2005/29/oj",
    category: "Shopping",
  },
  {
    id: "unfair-terms-93-13",
    title: "Unfair Terms in Consumer Contracts Directive 93/13/EEC",
    tagline: "Stops nasty small print from ripping you off.",
    explainer: "Invalidates one‑sided clauses that create a significant imbalance (like unilateral price hikes or waiver of legal rights). If a term is unfair, it doesn’t bind the consumer.",
    url: "https://eur-lex.europa.eu/eli/dir/1993/13/oj",
    category: "Shopping",
  },
  {
    id: "sale-of-goods-2019-771",
    title: "Sale of Goods Directive (EU) 2019/771",
    tagline: "A strong legal guarantee: repair, replacement or refund when things don’t work as promised.",
    explainer: "Harmonises conformity rules and remedies for defective goods, including second‑hand. You’re entitled to free repair or replacement, then price reduction or termination if the fix fails.",
    url: "https://eur-lex.europa.eu/eli/dir/2019/771/oj",
    category: "Shopping",
  },
  {
    id: "digital-content-2019-770",
    title: "Digital Content & Services Directive (EU) 2019/770",
    tagline: "If your app, game or cloud service is broken, you’re entitled to a fix or a refund.",
    explainer: "Covers digital goods and services (including those paid with data). Providers must deliver updates and security fixes and are liable for non‑conformity with clear consumer remedies.",
    url: "https://eur-lex.europa.eu/eli/dir/2019/770/oj",
    category: "Digital",
  },
  {
    id: "package-travel-2015-2302",
    title: "Package Travel Directive (EU) 2015/2302",
    tagline: "Holiday goes wrong? Clear refunds, assistance, and protection if your tour company collapses.",
    explainer: "Protects you when booking packages and linked travel arrangements. Guarantees refunds/repats if the organiser fails and rights to assistance for disruptions.",
    url: "https://eur-lex.europa.eu/eli/dir/2015/2302/oj",
    category: "Travel",
  },
  {
    id: "geo-blocking-2018-302",
    title: "Geo‑blocking Regulation (EU) 2018/302",
    tagline: "Shop like a local anywhere in the EU. No blocking or unfair rerouting because of where you live.",
    explainer: "Bans discriminating against customers based on nationality, residence or location. You can access the same website, prices and payment conditions as local users in many scenarios.",
    url: "https://eur-lex.europa.eu/eli/reg/2018/302/oj",
    category: "Shopping",
  },
  {
    id: "roaming-2022-612",
    title: "Roam‑Like‑at‑Home Regulation (EU) 2022/612",
    tagline: "Use your phone across the EU without extra roaming fees. Bye‑bye bill shocks.",
    explainer: "Extends the ban on retail roaming surcharges and guarantees home‑like quality of service where feasible, plus free access to emergency services and caller ID transparency across the EU.",
    url: "https://eur-lex.europa.eu/eli/reg/2022/612/oj",
    category: "Travel",
  },
  {
    id: "portability-2017-1128",
    title: "Cross‑border Portability Regulation (EU) 2017/1128",
    tagline: "Take your streaming subscriptions with you: watch and listen anywhere in the EU.",
    explainer: "Lets you use paid online content services while temporarily in another EU country as if you were at home — no catalog swaps or blocks when you travel.",
    url: "https://eur-lex.europa.eu/eli/reg/2017/1128/oj",
    category: "Digital",
  },
  {
    id: "open-internet-2015-2120",
    title: "Open Internet (Net Neutrality) Regulation (EU) 2015/2120",
    tagline: "Your internet provider can’t block or throttle websites. The open web stays open.",
    explainer: "Safeguards equal treatment of traffic and limits paid prioritisation. ISPs must manage networks transparently and can’t arbitrarily slow down your favourite services.",
    url: "https://eur-lex.europa.eu/eli/reg/2015/2120/oj",
    category: "Digital",
  },
  {
    id: "gdpr-2016-679",
    title: "GDPR — General Data Protection Regulation (EU) 2016/679",
    tagline: "Your data. Your rules. Consent, transparency, security — and the right to say ‘delete it’.",
    explainer: "Requires organisations to protect your personal data privacy, use it only with a legal basis, and be clear about how it’s used. You can access your data, port it, object to processing, and demand erasure.",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    category: "Digital",
  },
  {
    id: "cross-border-payments-2019-518",
    title: "Cross‑border Payments Regulation (EU) 2019/518 (amending 924/2009)",
    tagline: "Euro transfers to another EU country cost the same as a local transfer.",
    explainer: "Aligns charges for cross‑border euro payments with domestic fees and improves currency conversion transparency so you’re not stung by hidden FX mark‑ups.",
    url: "https://eur-lex.europa.eu/eli/reg/2019/518/oj",
    category: "Money",
  },
  {
    id: "payment-accounts-2014-92",
    title: "Payment Accounts Directive 2014/92/EU",
    tagline: "Right to a basic bank account and simple, standardised fee info you can actually compare.",
    explainer: "Guarantees access to a basic payment account with essential features. Banks must present fees in a standard statement and enable easy switching between providers.",
    url: "https://eur-lex.europa.eu/eli/dir/2014/92/oj",
    category: "Money",
  },
  {
    id: "psd2-2015-2366",
    title: "Payment Services Directive 2 (EU) 2015/2366",
    tagline: "Bans extra charges for consumer card payments and makes online payments safer (SCA).",
    explainer: "Introduces Strong Customer Authentication for fraud reduction, opens banking via APIs, and prohibits surcharges for most consumer cards in the EU.",
    url: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj",
    category: "Money",
  },
  {
    id: "ifr-2015-751",
    title: "Interchange Fee Regulation (EU) 2015/751",
    tagline: "Caps card fees so shops (and prices) don’t get fleeced by excessive card charges.",
    explainer: "Limits interchange fees on consumer cards and imposes transparency/brand‑choice rules, curbing costs passed on to shoppers and improving competition.",
    url: "https://eur-lex.europa.eu/eli/reg/2015/751/oj",
    category: "Money",
  },
  {
    id: "air-passenger-261-2004",
    title: "Air Passenger Rights Regulation (EC) No 261/2004",
    tagline: "Flight delayed or cancelled? You may get cash compensation, meals, and a hotel — by law.",
    explainer: "Sets standardised care and compensation when flights are cancelled, long‑delayed or overbooked, plus rights to rerouting and assistance at the airport.",
    url: "https://eur-lex.europa.eu/eli/reg/2004/261/oj",
    category: "Travel",
  },
  {
    id: "rail-passenger-2021-782",
    title: "Rail Passenger Rights Regulation (EU) 2021/782",
    tagline: "Help, rerouting and compensation for long delays — plus strong rights for disabled passengers.",
    explainer: "Improves assistance, rerouting and compensation rules for trains, and strengthens accessibility and assistance for persons with disabilities and reduced mobility.",
    url: "https://eur-lex.europa.eu/eli/reg/2021/782/oj",
    category: "Travel",
  },
  {
    id: "bus-passenger-181-2011",
    title: "Bus & Coach Passenger Rights Regulation (EU) No 181/2011",
    tagline: "Assistance, rerouting and refunds on long‑distance coach trips when things go wrong.",
    explainer: "Gives long‑distance bus travellers rights to information, assistance, rerouting/refunds for cancellations or delays, and non‑discrimination for disabled passengers.",
    url: "https://eur-lex.europa.eu/eli/reg/2011/181/oj",
    category: "Travel",
  },
  {
    id: "maritime-passenger-1177-2010",
    title: "Maritime Passenger Rights Regulation (EU) No 1177/2010",
    tagline: "Rights on ferries and cruises: care, rerouting, and compensation for major delays/cancellations.",
    explainer: "Protects ferry and cruise passengers with assistance and compensation for long delays and cancellations, and guarantees accessibility measures on board.",
    url: "https://eur-lex.europa.eu/eli/reg/2010/1177/oj",
    category: "Travel",
  },
  {
    id: "vehicle-safety-2019-2144",
    title: "General Safety of Motor Vehicles Regulation (EU) 2019/2144",
    tagline: "Cars must include modern life‑saving tech like automatic braking and lane‑keeping.",
    explainer: "Mandates advanced safety features in new vehicles (AEB, ISA, lane assist, reversing detection and more) to reduce fatalities and serious injuries on roads.",
    url: "https://eur-lex.europa.eu/eli/reg/2019/2144/oj",
    category: "Safety",
  },
  {
    id: "common-charger-2022-2380",
    title: "Common Charger Directive (EU) 2022/2380 (amending 2014/53/EU)",
    tagline: "USB‑C for your gadgets — fewer chargers, less e‑waste, less drawer chaos.",
    explainer: "Standardises charging ports and fast‑charging communication for many devices, cutting e‑waste and letting you reuse chargers across brands.",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2380/oj",
    category: "Digital",
  },
  {
    id: "single-use-plastics-2019-904",
    title: "Single‑Use Plastics Directive (EU) 2019/904",
    tagline: "Bans the worst beach‑litter plastics (straws, cutlery, sticks) and cuts pollution.",
    explainer: "Targets the most littered plastic items with bans, design and collection rules, and extended producer responsibility to clean up coasts and waterways.",
    url: "https://eur-lex.europa.eu/eli/dir/2019/904/oj",
    category: "Environment",
  },
  {
    id: "energy-labels-2017-1369",
    title: "Energy Labelling Framework Regulation (EU) 2017/1369",
    tagline: "Clear A–G labels push efficient fridges, TVs and washers — saving you money.",
    explainer: "Reintroduces the simple A–G scale and requires accurate testing and databases, making it easier to pick efficient products and cut bills.",
    url: "https://eur-lex.europa.eu/eli/reg/2017/1369/oj",
    category: "Environment",
  },
  {
    id: "ecodesign-2009-125",
    title: "Ecodesign Directive 2009/125/EC",
    tagline: "Products must meet efficiency standards — lower bills, less waste, better design.",
    explainer: "Sets minimum energy/resource efficiency and reparability requirements for many products, driving better design and reducing lifecycle impacts.",
    url: "https://eur-lex.europa.eu/eli/dir/2009/125/oj",
    category: "Environment",
  },
  {
    id: "cosmetics-1223-2009",
    title: "Cosmetics Regulation (EC) No 1223/2009",
    tagline: "Safer ingredients and a ban on animal‑tested cosmetics sold in the EU.",
    explainer: "Requires safety assessments, strict ingredient controls and a ban on marketing cosmetics tested on animals, so products are safer and cruelty‑free.",
    url: "https://eur-lex.europa.eu/eli/reg/2009/1223/oj",
    category: "Health",
  },
  {
    id: "fict-1169-2011",
    title: "Food Information to Consumers Regulation (EU) No 1169/2011",
    tagline: "Clear allergen and nutrition labels you can actually read.",
    explainer: "Standardises food labels, highlights allergens clearly, and improves nutrition and origin info so you can compare products and avoid risks.",
    url: "https://eur-lex.europa.eu/eli/reg/2011/1169/oj",
    category: "Food",
  },
  {
    id: "vet-meds-2019-6",
    title: "Veterinary Medicinal Products Regulation (EU) 2019/6",
    tagline: "Limits routine antibiotic use in farm animals — protecting us all from superbugs.",
    explainer: "Tightens rules on veterinary antibiotics, banning routine prophylaxis in groups and promoting responsible use to combat antimicrobial resistance.",
    url: "https://eur-lex.europa.eu/eli/reg/2019/6/oj",
    category: "Food",
  },
  {
    id: "neonics-2018-783",
    title: "Implementing Regulation (EU) 2018/783 (neonicotinoids)",
    tagline: "Bans outdoor use of bee‑harming pesticides to help save pollinators.",
    explainer: "Implements restrictions that effectively ban outdoor use of certain neonicotinoids, protecting bees and other pollinators vital to food systems.",
    url: "https://eur-lex.europa.eu/eli/reg_impl/2018/783/oj",
    category: "Environment",
  },
  {
    id: "toys-2009-48",
    title: "Toy Safety Directive 2009/48/EC",
    tagline: "Strict safety rules so toys don’t contain hazardous chemicals or dangerous parts.",
    explainer: "Sets chemical, mechanical and labelling standards for toys, with conformity assessments to keep dangerous toys off the market.",
    url: "https://eur-lex.europa.eu/eli/dir/2009/48/oj",
    category: "Safety",
  },
  {
    id: "gpsr-2023-988",
    title: "General Product Safety Regulation (EU) 2023/988",
    tagline: "Unsafe products get pulled fast — and online marketplaces must act.",
    explainer: "Modernises EU product safety for the online era, obliging marketplaces and sellers to trace, notify, and remove unsafe goods quickly across borders.",
    url: "https://eur-lex.europa.eu/eli/reg/2023/988/oj",
    category: "Safety",
  },
  {
    id: "drinking-water-2020-2184",
    title: "Drinking Water Directive (EU) 2020/2184",
    tagline: "Tough tap‑water standards — cleaner, safer drinking water at home and in public.",
    explainer: "Updates quality standards and risk‑based checks from source to tap, improves transparency, and promotes access to free water in public places.",
    url: "https://eur-lex.europa.eu/eli/dir/2020/2184/oj",
    category: "Health",
  },
  {
    id: "bathing-water-2006-7",
    title: "Bathing Water Directive 2006/7/EC",
    tagline: "Beaches and lakes tested and rated — so you can swim with confidence.",
    explainer: "Requires regular monitoring and public reporting of bathing sites with simple ratings, prompting local action when water quality drops.",
    url: "https://eur-lex.europa.eu/eli/dir/2006/7/oj",
    category: "Environment",
  },
  {
    id: "air-quality-2008-50",
    title: "Ambient Air Quality Directive 2008/50/EC",
    tagline: "Limits air pollution and forces action plans — cleaner city air.",
    explainer: "Sets limit values for pollutants like PM and NO2 and obliges cities to adopt air‑quality plans when levels are exceeded to protect public health.",
    url: "https://eur-lex.europa.eu/eli/dir/2008/50/oj",
    category: "Environment",
  },
  {
    id: "ehic-883-2004",
    title: "Social Security Coordination Regulation (EC) No 883/2004",
    tagline: "EHIC: access public healthcare when you travel — same conditions as locals.",
    explainer: "Coordinates social security so short‑term stays abroad are covered through the EHIC, giving you necessary public healthcare like residents.",
    url: "https://eur-lex.europa.eu/eli/reg/2004/883/oj",
    category: "Health",
  },
  {
    id: "eaa-2019-882",
    title: "European Accessibility Act (EU) 2019/882",
    tagline: "Products and services (like phones, e‑books, ticketing) must be usable by everyone.",
    explainer: "Introduces common accessibility requirements for key products and services, improving usability for people with disabilities and everyone else.",
    url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj",
    category: "Rights",
  },
]

const CATEGORIES = [
  "All",
  "Money",
  "Travel",
  "Digital",
  "Shopping",
  "Safety",
  "Food",
  "Environment",
  "Health",
  "Rights",
] as const

// ---------------------------
// Utilities
// ---------------------------

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

// ---------------------------
// Main Component
// ---------------------------

export default function App() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All")
  const [dark, setDark] = useState(true)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return REGULATIONS.filter((r) =>
      (category === "All" || r.category === category) &&
      (q === "" || r.tagline.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.explainer.toLowerCase().includes(q))
    )
  }, [query, category])

  // Animated cursor (reduced-motion aware)
  const reduced = usePrefersReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { damping: 25, stiffness: 200, mass: 0.5 })
  const sy = useSpring(my, { damping: 25, stiffness: 200, mass: 0.5 })
  useEffect(() => {
    if (reduced) return
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener("pointermove", handle)
    return () => window.removeEventListener("pointermove", handle)
  }, [mx, my, reduced])

  // Shuffle for “Surprise me”
  const [seed, setSeed] = useState(0)
  const shuffled = useMemo(() => {
    const arr = [...filtered]
    const rng = mulberry32(seed)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [filtered, seed])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-stone-900 dark:bg-zinc-950 dark:text-zinc-50">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-amber-400 focus:text-stone-900 focus:px-3 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      {/* Animated accent backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30 dark:opacity-20"
             style={{ background: "radial-gradient(closest-side, #f59e0b, transparent 70%)" }} />
        <div className="absolute -bottom-24 -right-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30 dark:opacity-20"
             style={{ background: "radial-gradient(closest-side, #10b981, transparent 70%)" }} />
      </div>

      {/* Cursor */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-50 h-6 w-6 rounded-full mix-blend-difference bg-white opacity-20"
          style={{ translateX: sx, translateY: sy }}
        />
      )}

      <header className="px-4 sm:px-6 lg:px-10 py-6">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9" aria-hidden>
              <img src="/favicon.svg" alt="Actually Good* EU Regulations" className="h-9 w-9" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <span className="mr-1">Actually</span>
              <span className="underline decoration-blue-900 decoration-[6px] underline-offset-4">Good</span>
              <span className="ml-1">Regulations</span>
              <span className="text-stone-500 dark:text-zinc-400 font-semibold text-base ml-2">.eu</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300/60 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur hover:shadow transition dark:border-zinc-700 dark:bg-zinc-900/70"
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}<span className="hidden sm:inline">Theme</span>
            </button>
            <button
              onClick={() => setSeed((s) => (s + 1) >>> 0)}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300/60 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur hover:shadow transition dark:border-zinc-700 dark:bg-zinc-900/70"
              aria-label="Shuffle the list"
            >
              <Shuffle className="h-4 w-4" /><span className="hidden sm:inline">Surprise me</span>
            </button>
          </div>
        </nav>

        <div className="mt-8 sm:mt-12 max-w-4xl">
        <p className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
          Bold, simple facts about EU rules that{" "}
          <span className="text-amber-400 dark:text-yellow-400">protect you</span> every day.
        </p>
        <p className="mt-4 text-lg text-stone-600 dark:text-zinc-400 max-w-3xl">
          You might only hear about the bad ones. But most EU rules make your life safer, fairer, and healthier. 
          Challenge the bad, 
          <span className="font-extrabold text-blue-900 dark:text-yellow-400"> appreciate the good *</span>. Stay involved.
        </p>
        <p className="mt-4 text-lg italic text-stone-500 dark:text-zinc-400 max-w-3xl">
          *that’s why this page exists.
        </p>
      </div>

      </header>

      <main id="content" className="px-4 sm:px-6 lg:px-10 pb-24">
        <section aria-label="Filters and search" className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <label className="relative block max-w-xl w-full">
              <span className="sr-only">Search regulations</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 dark:text-zinc-400"><Search className="h-5 w-5" aria-hidden /></span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by keyword (e.g. ‘refund’, ‘privacy’, ‘bees’)"
                className="w-full rounded-2xl border border-stone-300/70 bg-white/80 px-11 py-3 text-base shadow-sm outline-none ring-0 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:shadow-md dark:border-zinc-700 dark:bg-zinc-900/80 dark:focus:border-amber-400"
                type="search"
                aria-label="Search regulations"
              />
            </label>

            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium border transition",
                    category === c
                      ? "bg-amber-400 text-stone-900 border-amber-400 shadow"
                      : "bg-white/70 text-stone-700 border-stone-300/70 hover:bg-white shadow-sm dark:bg-zinc-900/70 dark:text-zinc-300 dark:border-zinc-700",
                  ].join(" ")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 text-sm text-stone-600 dark:text-zinc-400" aria-live="polite">
            Showing <strong>{shuffled.length}</strong> of {REGULATIONS.length}
          </div>
        </section>

        {/* Quote grid */}
        <section aria-label="Regulation quotes" className="">
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {shuffled.map((item) => (
                <motion.li
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <QuoteCard item={item} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      </main>

      <footer className="px-4 sm:px-6 lg:px-10 py-10 border-t border-stone-200/80 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-stone-600 dark:text-zinc-400">
            Built for clarity and curiosity. Zero trackers. Zero fluff.
          </p>
          <div className="text-sm text-stone-600 dark:text-zinc-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span>
              Want to add more? Open a PR or send ideas.
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function QuoteCard({ item }: { item: RegItem }) {
  return (
    <article className="group relative h-full">
      {/* Glow on hover */}
      <div
        aria-hidden
        className="absolute -inset-0.5 rounded-3xl opacity-0 blur-lg transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.35), rgba(32, 66, 199, 0.35))",
        }}
      />

      {/* Card */}
      <div className="relative h-full rounded-3xl border border-stone-300/70 bg-white/90 p-6 shadow-sm backdrop-blur transition group-hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/80 focus-within:shadow-lg">
        {/* Category pill */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide text-stone-700 border-stone-300/70 bg-white/70 dark:text-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/70">
          <Filter className="h-3.5 w-3.5" aria-hidden />
          {item.category}
        </div>

        {/* Tagline */}
        <blockquote className="text-2xl leading-snug font-extrabold tracking-tight">
          <span className="align-top text-amber-500">“</span>
          {item.tagline}
          <span className="align-top text-amber-500">”</span>
        </blockquote>

        {/* Footer with link */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="text-sm text-stone-600 dark:text-zinc-400">
              Official text on EUR-Lex
            </p>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300/70 bg-white/80 px-3 py-2 text-sm font-medium text-stone-900 shadow-sm transition hover:scale-[1.02] hover:border-amber-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            aria-label={`Open ${item.title} on EUR-Lex in a new tab`}
          >
            <ExternalLink className="h-4 w-4" />
            Open law
          </a>
        </div>

        {/* Explainer bubble (shows on hover/focus) */}
        <div
          role="note"
          className="
            pointer-events-none
            absolute left-6 right-24 -bottom-4 translate-y-full
            max-w-md
            rounded-2xl border border-amber-400/70 bg-white px-5 py-4
            text-sm font-medium leading-snug text-stone-900 shadow-xl
            opacity-0 scale-95 translate-y-2
            transition
            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
            group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0
            dark:border-emerald-400/50 dark:bg-zinc-900 dark:text-zinc-50
          "
        >
          <p>{item.explainer}</p>
        </div>

      </div>
    </article>
  );
}


// Tiny deterministic PRNG for shuffle
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
