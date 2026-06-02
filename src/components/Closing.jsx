/* Closing.jsx — pricing (ink band), guarantee, social proof, final CTA, contact, footer */
import { useState } from 'react'
import { useInView, MagneticBtn } from '../hooks.jsx'
import { Odometer } from './Odometer.jsx'

const CONTACT_EMAIL = 'michael@trysigil.io'
const CONTACT_PHONE_DISPLAY = '+1 (323) 973-3437'
const CONTACT_PHONE_TEL = '+13239733437'

export function Pricing() {
  const [priceRef, seen] = useInView(0.85)
  return (
    <section className="band band--ink" id="pricing">
      <div className="wrap">
        <div className="grid12 price__grid">
          <div className="price__lead">
            <div className="section-head reveal" style={{ marginBottom: 20 }}>
              <span className="section-num" style={{ color: '#6fd39e' }}>06</span>
              <span className="cap" style={{ color: 'rgba(247,244,238,0.5)' }}>Pricing</span>
            </div>
            <div className="price__amount num reveal" data-delay="60" ref={priceRef}>
              <span className="cur">$</span><Odometer value={seen ? 349 : 0} duration={900} /><span className="per"> /month · flat</span>
            </div>
            <h2 className="reveal" data-delay="120">That’s the entire software fee.</h2>
          </div>
          <div className="price__body reveal" data-delay="160">
            <p>
              You pay your drivers directly — the same delivery cost you cover today — and <span className="num">$349</span> for
              the platform that pools restaurants, answers your phones, and runs every order end to end.
            </p>
            <p>
              Compare that to <span className="num">$2,500</span>/month in DoorDash commissions on $10K in delivery.
              You’re trading a <span className="num">25%</span> cut for a flat <span className="num">$349</span>.
            </p>
          </div>

          <div className="price__compare reveal" data-delay="100">
            <div>
              <span className="cap">On DoorDash</span>
              <div className="line muted">25% of every delivery order, forever.</div>
              <div className="line muted">On $10K/mo → <span className="num">$2,500</span>/mo · <span className="num">$30,000</span>/yr.</div>
            </div>
            <div>
              <span className="cap">With Marginback</span>
              <div className="line">Direct driver cost <span style={{ opacity: 0.5 }}>+</span> <span className="num">$349</span> flat.</div>
              <div className="line">All-in, <span className="hl">lower than the platform</span> — guaranteed, or it’s free.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Guarantee() {
  return (
    <section className="guarantee">
      <div className="wrap">
        <div className="grid12 guarantee__grid">
          <span className="mark reveal">The deal</span>
          <h2 className="reveal" data-delay="60">
            You don’t pay a cent until we’ve <span className="hl">beaten what DoorDash was costing you</span>. That’s the whole deal.
          </h2>
        </div>
      </div>
    </section>
  )
}

export function SocialProof() {
  const cards = [
    { amt: '$2,400/mo', q: <>“<span className="ph">[Restaurant name]</span> cut $2,400/month in delivery costs — that was their whole profit margin.”</> },
    { amt: '—', q: <span className="ph">Space reserved for a second real testimonial once the pilot closes.</span> },
    { amt: '—', q: <span className="ph">And a third. Real names, real numbers — no logo soup, no stock quotes.</span> },
  ]
  return (
    <section className="band">
      <div className="wrap">
        <div className="grid12">
          <div className="social__head">
            <div className="section-head reveal">
              <span className="section-num">08</span>
              <span className="cap">From the owners</span>
            </div>
            <h2 className="reveal" data-delay="60" style={{ fontSize: 'clamp(24px,3vw,40px)', maxWidth: '20ch' }}>
              Proof, in their words and their numbers.
            </h2>
          </div>
          <div className="social__row reveal" data-delay="100">
            {cards.map((c, i) => (
              <div className="tcard" key={i}>
                {c.amt !== '—' ? <div className="amt num">{c.amt}</div> : <div className="amt num" style={{ color: 'var(--ink-22)' }}>$0,000</div>}
                <div className="q">{c.q}</div>
                <div className="who">
                  <div className="ph-av"></div>
                  <div>
                    <div className="cap" style={{ display: 'block', lineHeight: 1.4 }}>{i === 0 ? 'Owner · pilot store' : 'Awaiting testimonial'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  return (
    <section className="band band--alt final" id="final">
      <div className="wrap">
        <div className="grid12 final__grid">
          <div className="final__inner">
            <span className="section-num reveal" style={{ display: 'block', marginBottom: 20 }}>09 — Last figure</span>
            <h2 className="reveal" data-delay="60">
              See exactly how much you’re <span className="hl">handing delivery apps</span>.
            </h2>
            <p className="reveal" data-delay="120">
              Free, takes 2 minutes. Enter your monthly delivery sales, we’ll show you the number.
            </p>
            <div className="final__cta reveal" data-delay="180">
              <MagneticBtn href="#calc">Calculate my savings <span className="arrow">→</span></MagneticBtn>
              <span className="note">No card. No commitment. You only pay if we win.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: '', restaurant: '', email: '', phone: '', sales: '', message: '' })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState({})

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!form.restaurant.trim()) next.restaurant = 'Required'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Enter a valid email'
    setErr(next)
    if (Object.keys(next).length > 0) return

    const subject = `Pilot request — ${form.restaurant.trim()}`
    const body = [
      `Name: ${form.name.trim()}`,
      `Restaurant: ${form.restaurant.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || '—'}`,
      `Monthly delivery sales: ${form.sales.trim() ? '$' + form.sales.trim() + '/mo' : '—'}`,
      '',
      form.message.trim() || '(no additional notes)',
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="band contact" id="contact">
      <div className="wrap">
        <div className="grid12 contact__grid">
          <div className="contact__lead">
            <div className="section-head reveal">
              <span className="section-num">10</span>
              <span className="cap">Talk to us</span>
            </div>
            <h2 className="reveal" data-delay="60">Bring your numbers. We’ll show you the line.</h2>
            <p className="reveal" data-delay="120">
              Tell us a little about your restaurant and we’ll come back within one business day with your exact
              recovered margin — no pitch deck, no pressure.
            </p>

            <div className="contact__direct reveal" data-delay="180">
              <div className="contact__chan">
                <span className="cap">Email</span>
                <a className="ul" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <hr className="rule" />
              <div className="contact__chan">
                <span className="cap">Phone</span>
                <a className="ul" href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
                <span className="contact__note">Mon–Fri, 9–6 ET · a person, not a bot</span>
              </div>
            </div>
          </div>

          <div className="contact__panel reveal" data-delay="100">
            {!sent ? (
              <form className="cform" onSubmit={submit} noValidate>
                <div className="cform__head">
                  <span className="cap">Start your pilot</span>
                  <span className="cap" style={{ color: 'var(--ink-42)' }}>1 / 1</span>
                </div>

                <div className="cform__rows">
                  <div className="cfield">
                    <label className="cap">Your name</label>
                    <input value={form.name} onChange={set('name')} placeholder="Jordan Avery" className={err.name ? 'err' : ''} />
                    {err.name && <span className="cfield__err">{err.name}</span>}
                  </div>
                  <div className="cfield">
                    <label className="cap">Restaurant</label>
                    <input value={form.restaurant} onChange={set('restaurant')} placeholder="Avery’s Kitchen" className={err.restaurant ? 'err' : ''} />
                    {err.restaurant && <span className="cfield__err">{err.restaurant}</span>}
                  </div>
                  <div className="cfield">
                    <label className="cap">Email</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="jordan@averys.com" className={err.email ? 'err' : ''} />
                    {err.email && <span className="cfield__err">{err.email}</span>}
                  </div>
                  <div className="cfield">
                    <label className="cap">Phone <span className="opt">— optional</span></label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 012-3456" />
                  </div>
                  <div className="cfield cfield--full">
                    <label className="cap">Monthly delivery sales <span className="opt">— optional</span></label>
                    <div className="cfield__money">
                      <span className="dol">$</span>
                      <input inputMode="numeric" value={form.sales} onChange={(e) => setForm((f) => ({ ...f, sales: e.target.value.replace(/[^0-9,]/g, '') }))} placeholder="10,000" />
                      <span className="permo">/ mo</span>
                    </div>
                  </div>
                  <div className="cfield cfield--full">
                    <label className="cap">Anything else <span className="opt">— optional</span></label>
                    <textarea rows="3" value={form.message} onChange={set('message')} placeholder="Which platforms you’re on, number of locations, busiest hours…"></textarea>
                  </div>
                </div>

                <div className="cform__foot">
                  <button type="submit" className="btn btn--block">Request my pilot <span className="arrow">→</span></button>
                  <span className="cform__fine">We reply within one business day. You only pay if we lower your cost.</span>
                </div>
              </form>
            ) : (
              <div className="cform cform--done">
                <div className="cform__check" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="22" fill="none" stroke="var(--green)" strokeWidth="1.5" /><path d="M15 24.5l6.5 6.5L33 18" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="square" /></svg>
                </div>
                <h3 className="cform__doneh">Almost there, {form.name.split(' ')[0] || 'thanks'}.</h3>
                <p className="cform__donep">
                  We’ve opened a pre-filled email to our team — just hit send. If nothing opened, reach us directly at{' '}
                  <a className="ul" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Pilot request — ' + (form.restaurant || ''))}`}>{CONTACT_EMAIL}</a>.
                  We reply within one business day with the exact margin we can recover for {form.restaurant || 'your restaurant'}.
                </p>
                <div className="cform__donefoot">
                  <span className="cap">Reference</span>
                  <span className="num">MB-{(Date.now() % 100000).toString().padStart(5, '0')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid12 footer__grid">
          <div className="footer__brand">
            <div className="brand"><span className="brand__mark">Marginback</span></div>
            <p>The shared-network delivery platform that gives independent restaurants their margin back. Flat fee, no commissions.</p>
          </div>
          <div className="footer__cols">
            <div>
              <span className="cap">Product</span>
              <a href="#how">How it works</a>
              <a href="#calc">Savings calculator</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <span className="cap">Company</span>
              <a href="#problem">The problem</a>
              <a href="#math">The math, explained</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <span className="cap">Get started</span>
              <a href="#calc">Run your numbers</a>
              <a href="#final">Book a pilot</a>
            </div>
          </div>
          <div className="footer__legal">
            <span className="cap">© 2026 Marginback, Inc. — Delivery, un-skimmed.</span>
            <span className="cap">Figures illustrative · $10K/mo @ 25% commission</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
