'use client'

import { useRef } from 'react'
import { EntrySequence }    from '@/components/entry/EntrySequence'
import { IdentitySection }  from '@/components/sections/IdentitySection'
import { EcosystemSection } from '@/components/sections/EcosystemSection'
import { ProjectsSection }  from '@/components/sections/ProjectsSection'
import { MindsetSection }   from '@/components/sections/MindsetSection'
import { MotionLabSection } from '@/components/sections/MotionLabSection'
import { AILabSection }     from '@/components/sections/AILabSection'
import { MobileSection }    from '@/components/sections/MobileSection'
import { TimelineSection }  from '@/components/sections/TimelineSection'
import { PlaygroundSection }from '@/components/sections/PlaygroundSection'
import { ContactSection }   from '@/components/sections/ContactSection'
import { useBootStore }     from '@/store'
import { useLenis }         from '@/hooks/useLenis'
import { useGSAPScrollTrigger } from '@/hooks/useGSAPScrollTrigger'

export default function HomePage() {
  const bootComplete = useBootStore((s) => s.state.complete)

  useLenis()
  useGSAPScrollTrigger()

  return (
    <>
      {/* Boot sequence — full-screen overlay until complete */}
      <EntrySequence />

      {/* Main site — revealed after boot */}
      <div
        id="site-content"
        className="relative"
        style={{ opacity: bootComplete ? 1 : 0, transition: 'opacity 0.8s ease' }}
        aria-hidden={!bootComplete}
      >
        <IdentitySection  />   {/* 01 */}
        <EcosystemSection />   {/* 02 */}
        <ProjectsSection  />   {/* 03 */}
        <MindsetSection   />   {/* 04 */}
        <MotionLabSection />   {/* 05 */}
        <AILabSection     />   {/* 06 */}
        <MobileSection    />   {/* 07 */}
        <TimelineSection  />   {/* 08 */}
        <PlaygroundSection/>   {/* 09 */}
        <ContactSection   />   {/* 10 */}
      </div>
    </>
  )
}
