/* App.jsx — compose the page */
import { useRef, useEffect } from 'react'
import { useGlobalReveal } from './hooks.jsx'
import { UtilityBar, Nav, Hero } from './components/Hero.jsx'
import { Problem } from './components/Problem.jsx'
import { MathLedger } from './components/MathLedger.jsx'
import { Calculator } from './components/Calculator.jsx'
import { HowItWorks, Features } from './components/Steps.jsx'
import { Pricing, Guarantee, SocialProof, FinalCTA, Contact, Footer } from './components/Closing.jsx'

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = null
    const upd = () => {
      raf = null
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const y = window.scrollY || h.scrollTop || 0
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(upd)
    }
    upd()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="scrollprog"><div className="scrollprog__fill" ref={ref}></div></div>
  )
}

export default function App() {
  useGlobalReveal()

  return (
    <>
      <ScrollProgress />
      <UtilityBar />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <MathLedger />
        <Calculator />
        <HowItWorks />
        <Features />
        <Pricing />
        <Guarantee />
        <SocialProof />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
