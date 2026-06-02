/* hooks.jsx — motion primitives: count-up, scroll-reveal, in-view, magnetic.
   Production build uses IntersectionObserver + requestAnimationFrame. */
import { useState, useEffect, useRef } from 'react'

export const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---- formatters ---- */
export const fmt = (n) => Math.round(n).toLocaleString('en-US')
export const fmtMoney = (n) => '$' + fmt(n)

export const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

/* ---- useCountUp: animate a number toward `target` with requestAnimationFrame ---- */
export function useCountUp(target, { duration = 1100, start = 0 } = {}) {
  const [val, setVal] = useState(REDUCED ? target : start)
  const fromRef = useRef(REDUCED ? target : start)
  const rafRef = useRef(null)

  useEffect(() => {
    if (REDUCED) {
      setVal(target)
      return
    }
    const from = fromRef.current
    const delta = target - from
    if (delta === 0) return
    const t0 = performance.now()
    cancelAnimationFrame(rafRef.current)
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const cur = from + delta * easeOutExpo(p)
      fromRef.current = cur
      setVal(cur)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        fromRef.current = target
        setVal(target)
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return val
}

/* ---- useInView: has this element scrolled into view yet? (fires once) ---- */
export function useInView(margin = 0.85) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(REDUCED)

  useEffect(() => {
    if (REDUCED || seen) return
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true)
            obs.disconnect()
          }
        })
      },
      { rootMargin: `0px 0px -${Math.round((1 - margin) * 100)}% 0px`, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [seen, margin])

  return [ref, seen]
}

/* count up only once the element scrolls into view */
export function useCountUpOnView(target, opts = {}) {
  const [ref, seen] = useInView(opts.margin ?? 0.9)
  const val = useCountUp(seen ? target : opts.start || 0, opts)
  return [ref, val]
}

/* ---- global reveal: observe every .reveal element and add .in (respecting data-delay) ---- */
export function useGlobalReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (REDUCED || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0
          if (delay) setTimeout(() => el.classList.add('in'), delay)
          else el.classList.add('in')
          obs.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ---- magnetic hover for CTAs ---- */
export function useMagnetic(strength = 0.28) {
  const ref = useRef(null)
  useEffect(() => {
    if (REDUCED) return
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0,0)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}

export function MagneticBtn({ href = '#', className = '', children, strength, ...rest }) {
  const ref = useMagnetic(strength)
  return (
    <a ref={ref} href={href} className={`btn ${className}`} {...rest}>
      {children}
    </a>
  )
}
