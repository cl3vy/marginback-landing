/* Problem.jsx — editorial problem statement + animated 25¢ slice metaphor */
import { useInView } from '../hooks.jsx'

function SliceBar() {
  const [ref, sliced] = useInView(0.7)

  const keepW = sliced ? '75%' : '100%'
  const skimW = sliced ? '25%' : '0%'

  return (
    <div className="slice" ref={ref}>
      <div className="slice__head">
        <span className="cap">Where one delivery dollar goes</span>
        <span className="cap" style={{ color: 'var(--ink-42)' }}>scroll-revealed</span>
      </div>
      <div className="slice__cols">
        <div className="slice__col platform">
          <span className="cap">On DoorDash / Uber Eats</span>
          <div className="dollarbar">
            <div className="seg seg-keep" style={{ width: keepW }}>
              <span className="amt">$0.75</span>
            </div>
            <div className="seg seg-skim" style={{ width: skimW }}>
              <span className="amt" style={{ opacity: sliced ? 1 : 0, transition: 'opacity .5s .5s' }}>–$0.25</span>
            </div>
          </div>
          <div className="slice__note">Of every dollar, <b>25¢ is skimmed</b> by the middleman before it reaches you.</div>
        </div>
        <div className="slice__col ours">
          <span className="cap cap--green">With Marginback</span>
          <div className="dollarbar">
            <div className="seg seg-whole"><span className="amt">$1.00</span></div>
          </div>
          <div className="slice__note">The dollar stays <b>whole</b>. You pay drivers directly — the cost you’d cover anyway.</div>
        </div>
      </div>
    </div>
  )
}

export function Problem() {
  return (
    <section className="band band--alt" id="problem">
      <div className="wrap">
        <div className="grid12 problem__grid">
          <div className="problem__intro">
            <div className="section-head reveal">
              <span className="section-num">01</span>
              <span className="cap">The problem</span>
            </div>
            <h2 className="reveal" data-delay="60">
              Delivery is now ~15% of your sales — and the most expensive 15% you sell.
            </h2>
          </div>
          <div className="problem__body reveal" data-delay="120">
            <p>
              Platforms charge independent restaurants <strong>15% to 30%</strong> commission, but the true
              effective rate is often <strong>35% to 45%</strong> once you add packaging, processing fees,
              promotions, and refunds.
            </p>
            <p>
              On a restaurant doing <strong>$10K/month</strong> in delivery, that’s <strong>$2,500 gone every
              month</strong>. Over a year — in an industry where profit margins are only 5% to 15% — this annual
              bleed represents your entire potential take-home profit.
            </p>
          </div>

          <blockquote className="pullquote reveal" data-delay="80">
            You’re not paying for delivery. You’re paying a middleman <span className="hl">25 cents on every
            dollar</span> — and it’s eating the profit you’d otherwise keep.
          </blockquote>

          <SliceBar />
        </div>
      </div>
    </section>
  )
}
