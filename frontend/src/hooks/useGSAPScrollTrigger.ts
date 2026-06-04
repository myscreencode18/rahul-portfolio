'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export function useGSAPScrollTrigger() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const ctx = gsap.context(() => {
      // ── Cinematic headline reveals ──────────────────────────────────────────
      document.querySelectorAll('.text-display, .text-cinematic, .text-hero').forEach((el) => {
        const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' })
        const parent = split.lines[0]?.parentElement
        if (parent) {
          parent.style.overflow = 'hidden'
        }

        gsap.from(split.lines, {
          y: '110%',
          skewY: 6,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Section fade-up ──────────────────────────────────────────────────────
      document.querySelectorAll('[data-section]').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Horizontal signal lines ───────────────────────────────────────────
      document.querySelectorAll('.clip-reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => el.classList.add('visible'),
        })
      })

      // ── Panel stagger reveals ────────────────────────────────────────────
      document.querySelectorAll('.panel-stagger').forEach((container) => {
        const panels = container.querySelectorAll('.panel')
        gsap.from(panels, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}
