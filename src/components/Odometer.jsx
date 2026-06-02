/* Odometer.jsx — mechanical rolling-digit display.
   Each wheel eases to its exact target digit (rests on integers, never
   fractional), with a slight cascade so higher places settle last — like a
   register tallying up. */
import { useRef, useState, useEffect } from 'react'
import { REDUCED, easeOutExpo } from '../hooks.jsx'

function OdoReel({ pos }) {
  const offset = ((pos % 10) + 10) % 10
  return (
    <span className="odo__reel">
      <span className="odo__strip" style={{ transform: `translateY(-${offset}em)` }}>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((d, i) => (
          <span className="odo__d" key={i}>
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

export function Odometer({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  minInt = 1,
  duration = 1000,
  stagger = 80,
  className = '',
}) {
  const abs = Math.abs(Number(value) || 0)
  const intDigits = Math.max(String(Math.floor(abs)).length, minInt)
  const places = []
  for (let i = intDigits - 1; i >= -decimals; i--) places.push(i)
  const targets = {}
  places.forEach((i) => {
    targets[i] = Math.floor(abs / Math.pow(10, i)) % 10
  })

  const posRef = useRef({})
  const rafRef = useRef(null)
  const [, force] = useState(0)

  useEffect(() => {
    if (REDUCED) {
      places.forEach((i) => {
        posRef.current[i] = targets[i]
      })
      force((x) => x + 1)
      return
    }
    const from = {}
    places.forEach((i) => {
      from[i] = posRef.current[i] != null ? posRef.current[i] : 0
    })
    const n = places.length
    const t0 = performance.now()
    cancelAnimationFrame(rafRef.current)
    const tick = (now) => {
      let allDone = true
      places.forEach((i, idx) => {
        const d = duration + (n - 1 - idx) * stagger // higher places (idx 0) settle last
        const p = Math.min((now - t0) / d, 1)
        if (p < 1) allDone = false
        posRef.current[i] = from[i] + (targets[i] - from[i]) * easeOutExpo(p)
      })
      force((x) => x + 1)
      if (allDone) {
        places.forEach((i) => {
          posRef.current[i] = targets[i]
        })
        force((x) => x + 1)
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const out = []
  if (prefix) out.push(<span className="odo__sep odo__prefix" key="pfx">{prefix}</span>)
  if (value < 0) out.push(<span className="odo__sep" key="neg">–</span>)
  places.forEach((i) => {
    if (i >= 0 && (i + 1) % 3 === 0 && i !== intDigits - 1)
      out.push(<span className="odo__sep" key={'c' + i}>,</span>)
    if (i === -1) out.push(<span className="odo__sep odo__dot" key="dot">.</span>)
    const pos = posRef.current[i] != null ? posRef.current[i] : 0
    out.push(<OdoReel pos={pos} key={'r' + i} />)
  })
  if (suffix) out.push(<span className="odo__suffix" key="sfx">{suffix}</span>)
  return <span className={`odo ${className}`}>{out}</span>
}
