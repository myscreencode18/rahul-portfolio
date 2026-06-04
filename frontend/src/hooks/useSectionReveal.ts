// 'use client'

// import { useEffect, RefObject } from 'react'
// import { useNavStore } from '@/store'

// export function useSectionReveal(ref: RefObject<HTMLElement>) {
//   const setActiveSection = useNavStore((s) => s.setActiveSection)

//   useEffect(() => {
//     if (!ref.current) return
//     const sectionId = ref.current.getAttribute('data-section') || ''

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setActiveSection(sectionId)
//         }
//       },
//       { threshold: 0.3 }
//     )

//     observer.observe(ref.current)
//     return () => observer.disconnect()
//   }, [ref, setActiveSection])
// }

'use client'

import { useEffect, RefObject } from 'react'
import { useNavStore } from '@/store'

export function useSectionReveal(
  ref: RefObject<HTMLElement | null>
) {
  const setActiveSection = useNavStore((s) => s.setActiveSection)

  useEffect(() => {
    if (!ref.current) return

    const sectionId =
      ref.current.getAttribute('data-section') || ''

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, setActiveSection])
}