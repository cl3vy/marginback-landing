/* Calculator.jsx — the signature interactive moment */
import { useState } from 'react'
import { fmtMoney, useInView, MagneticBtn } from '../hooks.jsx'
import { Odometer } from './Odometer.jsx'

const SOFTWARE_FEE = 349
const COMMISSION = 0.25
const PRESETS = [5000, 10000, 20000, 40000]

export function Calculator() {
  const [sales, setSales] = useState(10000)
  const [calcRef, seen] = useInView(0.85)

  const lostDD = sales * COMMISSION
  const keepUs = Math.max(0, sales - SOFTWARE_FEE)
  const netWin = sales * COMMISSION - SOFTWARE_FEE
  const annual = netWin * 12
  const profitable = netWin > 0
  const v = (n) => (seen ? n : 0) // hold at 0 until scrolled into view, then roll up

  const onInput = (raw) => {
    const n = parseInt(String(raw).replace(/[^0-9]/g, ''), 10)
    setSales(isNaN(n) ? 0 : Math.min(n, 200000))
  }

  return (
    <section className="band band--alt" id="calc">
      <div className="wrap">
        <div className="grid12 calc__grid">
          <div className="calc__intro">
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <span className="section-num">03</span>
              <span className="cap">The calculator</span>
            </div>
            <h2 className="reveal" data-delay="60">Type your monthly delivery sales. Watch the number.</h2>
            <p className="reveal" data-delay="120">
              This is the figure DoorDash doesn’t want you to do. Drag it, type it, test your real
              volume — the split recomputes live.
            </p>
          </div>

          <div className="calc__panel" ref={calcRef}>
            <div className="calc__input-row reveal" data-delay="80">
              <div className="calc__input-label">
                <span className="cap">Your monthly delivery sales</span>
                <span className="calc__permo">commission assumed 25%</span>
              </div>
              <div className="calc__field">
                <span className="dol">$</span>
                <input
                  type="text" inputMode="numeric" value={sales.toLocaleString('en-US')}
                  onChange={(e) => onInput(e.target.value)}
                  aria-label="Monthly delivery sales"
                />
              </div>
              <input
                className="calc__slider" type="range" min="0" max="50000" step="500"
                value={Math.min(sales, 50000)} onChange={(e) => setSales(parseInt(e.target.value, 10))}
                aria-label="Adjust monthly delivery sales"
              />
              <div className="calc__chips">
                {PRESETS.map((p) => (
                  <button key={p} className={`calc__chip ${sales === p ? 'active' : ''}`} onClick={() => setSales(p)}>
                    ${p.toLocaleString('en-US')}/mo
                  </button>
                ))}
              </div>
            </div>

            <div className="calc__out reveal" data-delay="140">
              <div className="cell lose">
                <div className="lbl"><span className="tinydot red"></span><span className="cap">Lost to DoorDash / mo</span></div>
                <div className="big num"><Odometer value={v(lostDD)} prefix="$" duration={700} /></div>
                <div className="foot">{fmtMoney(lostDD * 12)} drained per year</div>
              </div>
              <div className="cell keep">
                <div className="lbl"><span className="tinydot grn"></span><span className="cap cap--green">You keep with us / mo</span></div>
                <div className="big num"><Odometer value={v(keepUs)} prefix="$" duration={700} /></div>
                <div className="foot">after the flat $349 software fee</div>
              </div>
            </div>

            <div className="calc__verdict reveal" data-delay="180">
              <div>
                <div className="vk">{profitable ? 'Your net win, recovered' : 'Below break-even'}</div>
                <div className="vv num">
                  {profitable ? (
                    <><Odometer value={v(annual)} prefix="+$" duration={750} /><span className="yr"> /yr</span></>
                  ) : (
                    <span style={{ color: 'rgba(247,244,238,0.85)', fontSize: '0.62em' }}>That month is free — guaranteed.</span>
                  )}
                </div>
              </div>
              <MagneticBtn href="#final" strength={0.2}>
                {profitable ? 'Lock in these savings' : 'See the guarantee'} <span className="arrow">→</span>
              </MagneticBtn>
            </div>

            <div className="reveal" data-delay="220" style={{ marginTop: 16 }}>
              <span className="cap" style={{ fontSize: 10.5, color: 'var(--ink-42)' }}>
                Assumes driver cost is roughly equal either way. Pool a network and it usually drops further.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
