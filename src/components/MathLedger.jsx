/* MathLedger.jsx — ledger-style comparison table, the centerpiece */
import { useInView } from '../hooks.jsx'
import { Odometer } from './Odometer.jsx'

export function MathLedger() {
  const [ledgerRef, seen] = useInView(0.8)
  const v = (n) => (seen ? n : 0)

  return (
    <section className="band" id="math">
      <div className="wrap">
        <div className="grid12 math__grid">
          <div className="math__head">
            <div className="section-head reveal">
              <span className="section-num">02</span>
              <span className="cap">The math · put your own numbers in</span>
            </div>
            <h2 className="reveal" data-delay="60">Same delivery sales. Two very different take-homes.</h2>
          </div>

          <div className={`ledger reveal ${seen ? 'tallied' : ''}`} data-delay="100" ref={ledgerRef}>
            <table className="num">
              <thead>
                <tr>
                  <th>Per month, on $10K delivery</th>
                  <th className="col-dd">On DoorDash / Uber Eats</th>
                  <th className="col-us">With Marginback</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Delivery sales / month</td>
                  <td>$10,000</td>
                  <td>$10,000</td>
                </tr>
                <tr>
                  <td>Commission (25%)</td>
                  <td className="neg">–$2,500</td>
                  <td className="zero">$0</td>
                </tr>
                <tr>
                  <td>Software fee</td>
                  <td className="zero">$0</td>
                  <td className="neg">–$349</td>
                </tr>
                <tr className="keeprow">
                  <td>You keep</td>
                  <td className="col-dd"><Odometer value={v(7500)} prefix="$" duration={1100} /></td>
                  <td className="col-us"><Odometer value={v(9651)} prefix="$" duration={1300} /><div className="winbar"></div></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="math__win reveal" data-delay="160">
            <div>
              <span className="k">Net win / month</span>
              <span className="v num">+$2,151</span>
            </div>
            <div>
              <span className="k">Net win / year</span>
              <span className="v num">+$25,800</span>
            </div>
            <div>
              <span className="k">As a share of revenue</span>
              <span className="v alt num">~5%</span>
            </div>
            <div style={{ maxWidth: '30ch', alignSelf: 'center' }}>
              <span className="cap" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12.5, color: 'var(--ink-62)' }}>
                ≈ most of your annual profit — recovered.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
