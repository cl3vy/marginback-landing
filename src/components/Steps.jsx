/* Steps.jsx — How It Works numbered rhythm + Features editorial list */

const STEPS = [
  { t: 'We pool, you save.', b: <>We connect local restaurants in your area into one shared driver network. Instead of paying a platform’s <strong>25% cut</strong> on every order, you coordinate drivers directly through our software and split logistics across the pool.</> },
  { t: 'AI answers the phone.', b: <>Our AI picks up <strong>every call</strong>, talks to your customers naturally, takes the order, and handles the back-and-forth. No missed orders, no hold music, no extra front-of-house staff.</> },
  { t: 'Orders manage themselves.', b: <>The moment an order comes in, our system routes it, assigns the nearest pooled driver, and tracks it to the door — <strong>fully automated</strong>. You just make the food.</> },
  { t: 'You keep the margin.', b: <>No 15–30% commission skimmed off every order. You pay drivers directly — the cost you’d cover anyway — and a flat <strong>$349/month</strong> for the software. That’s it.</> },
]

const FEATURES = [
  { t: 'Shared Driver Network', b: 'Stop paying platform prices for delivery. Pooling drivers across nearby restaurants gets you reliable delivery at a shared cost — without owning a fleet or handing over 25% of every order.' },
  { t: 'AI Phone & Customer Agent', b: 'An AI that answers every call, understands your customers, and takes orders accurately, 24/7. It frees your staff and captures revenue you’d otherwise lose to a busy line.' },
  { t: 'End-to-End Order Automation', b: 'From intake to driver dispatch to delivery, the whole flow runs itself. One dashboard, zero manual juggling.' },
  { t: 'Flat $349, Performance-Backed', b: 'One price. No commissions, no percentage cuts, no hidden fees. And you only pay if we’ve actually lowered your total delivery cost.' },
]

export function HowItWorks() {
  return (
    <section className="band" id="how">
      <div className="wrap">
        <div className="grid12 steps">
          <div className="steps__head">
            <div className="section-head reveal">
              <span className="section-num">04</span>
              <span className="cap">How it works</span>
            </div>
            <h2 className="reveal" data-delay="60" style={{ fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.0, maxWidth: '18ch' }}>
              Four moves. The middleman’s cut disappears.
            </h2>
          </div>
          {STEPS.map((s, i) => (
            <div className="step reveal" data-delay={i * 60} key={i}>
              <div className="step__no">
                <span className="big">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="step__title">{s.t}</div>
              <div className="step__body">{s.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Features() {
  return (
    <section className="band band--alt">
      <div className="wrap">
        <div className="grid12">
          <div className="feat__head">
            <div className="section-head reveal">
              <span className="section-num">05</span>
              <span className="cap">What you get</span>
            </div>
          </div>
          <div className="feat">
            {FEATURES.map((f, i) => (
              <div className="feat__row reveal" data-delay={i * 50} key={i}>
                <div className="fno num">F.{String(i + 1).padStart(2, '0')}</div>
                <div className="fttl">{f.t}</div>
                <div className="fbody">{f.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
