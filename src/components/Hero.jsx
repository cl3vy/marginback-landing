/* Hero.jsx — top bar, nav, hero with odometer + live drain/keep ticker */
import { useState, useEffect } from 'react'
import { REDUCED, useCountUp, useInView, MagneticBtn } from '../hooks.jsx'
import { Odometer } from './Odometer.jsx'

export function UtilityBar() {
  return (
    <div className="utility">
      <div className="wrap">
        <span className="cap"><span className="dot"></span>For independent restaurants</span>
        <span className="cap" style={{ color: 'var(--ink-42)' }}>The margin you’re handing away</span>
      </div>
    </div>
  )
}

export function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <div className="brand">
          <span className="brand__mark">Marginback</span>
          <span className="brand__tag">Delivery, un-skimmed</span>
        </div>
        <div className="nav__links">
          <a href="#problem">The problem</a>
          <a href="#math">The math</a>
          <a href="#calc">Calculator</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact</a>
          <MagneticBtn href="#calc" className="btn--sm" strength={0.2}>
            Calculate savings <span className="arrow">→</span>
          </MagneticBtn>
        </div>
      </div>
    </nav>
  )
}

/* live ticker — money drained vs kept, Jan 1 → now, on a $10K/mo store */
export function LiveTicker() {
  const LOST_YR = 30000 // DoorDash commission, $10K/mo @ 25%
  const KEPT_YR = 25800 // net recovered with us
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime()
  const yearMs = 365.25 * 24 * 3600 * 1000

  const calc = () => {
    const frac = (Date.now() - yearStart) / yearMs
    return { lost: LOST_YR * frac, kept: KEPT_YR * frac }
  }
  const [live, setLive] = useState(calc)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (REDUCED) {
      setArmed(true)
      return
    }
    const t = setTimeout(() => setArmed(true), 150)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const id = setInterval(() => setLive(calc()), 200)
    return () => clearInterval(id)
  }, [])

  const lostShown = useCountUp(armed ? live.lost : 0, { duration: 1500 })
  const keptShown = useCountUp(armed ? live.kept : 0, { duration: 1500 })

  const money2 = (n) =>
    '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="ticker reveal" data-delay="200">
      <div className="cap" style={{ marginBottom: 12, display: 'block' }}>
        Live, year-to-date · the average $10K/mo delivery store
      </div>
      <div className="ticker__rows">
        <div className="ticker__cell lose">
          <div className="head"><span className="tinydot red"></span><span className="cap">Drained on DoorDash</span></div>
          <div className="ticker__amt num">{money2(lostShown)}</div>
          <div className="sub">25% commission, skimmed since Jan 1</div>
        </div>
        <div className="ticker__cell keep">
          <div className="head"><span className="tinydot grn"></span><span className="cap cap--green">Kept with Marginback</span></div>
          <div className="ticker__amt num">{money2(keptShown)}</div>
          <div className="sub">Back in your pocket over the same days</div>
        </div>
      </div>
    </div>
  )
}

function HeadWords() {
  const HEAD = [
    { t: 'We' }, { t: 'put' },
    { t: '5%', hl: true }, { t: 'of', hl: true }, { t: 'your', hl: true }, { t: 'revenue', hl: true },
    { t: 'back' }, { t: 'in' }, { t: 'your' }, { t: 'pocket' }, { t: '—' }, { t: 'by' },
    { t: 'killing' }, { t: 'delivery' }, { t: 'commissions.' },
  ]
  return (
    <>
      {HEAD.map((w, i) => (
        <span key={i}>
          <span className={`word ${w.hl ? 'hl' : ''}`} style={{ transitionDelay: i * 42 + 'ms' }}>{w.t}</span>{' '}
        </span>
      ))}
    </>
  )
}

export function Hero({ showTicker = true }) {
  const annual = 25800
  const [headRef, headSeen] = useInView(0.98)

  return (
    <header className="hero wrap">
      <div className="grid12 hero__grid">
        <div className="hero__lead">
          <div className="eyebrow reveal">
            <span className="cap cap--green">We give you your margin back</span>
          </div>
          <h1 className={`hero-h1 ${headSeen ? 'in' : ''}`} ref={headRef}>
            <HeadWords />
          </h1>
          <p className="hero__sub reveal" data-delay="140">
            That 5% isn’t small. With restaurant margins sitting at 5–15%, recovering it can nearly
            double your profit. DoorDash and Uber Eats take <span className="num">15–30%</span> of every
            delivery order — about <span className="num">$2,500</span> a month, <span className="num">$30,000</span> a
            year, on <span className="num">$10K</span> in delivery sales. We give it back.
          </p>
          <div className="hero__cta reveal" data-delay="220">
            <MagneticBtn href="#calc">Calculate my exact savings <span className="arrow">→</span></MagneticBtn>
            <span className="note">If we don’t lower your cost, you don’t pay.</span>
          </div>
        </div>

        <div className="hero__figure">
          <div className="figure-card reveal" data-delay="120">
            <div className="label">
              <span className="cap">Recovered per year</span>
              <span className="cap" style={{ color: 'var(--ink-42)' }}>est. · $10K/mo</span>
            </div>
            <span className="bignum num">
              <span className="cur">$</span><Odometer value={annual} duration={1500} className="odo--tight" /><span className="per"> /yr</span>
            </span>
            <div className="figure-foot">
              <span className="cap">≈ <span className="num" style={{ color: 'var(--green)' }}>$2,150</span>/mo back</span>
              <span className="cap">≈ most of your annual profit</span>
            </div>
          </div>
          {showTicker && <LiveTicker />}
        </div>
      </div>
    </header>
  )
}
