import { PromptingIsAllYouNeed } from "@/components/ui/animated-hero-section";
import TextRoll, { TextRollParagraph } from "@/components/ui/text-roll";


import ChangeArtstyleButton from "@/components/ui/change-artstyle-button";
import ExperienceBoard from "@/components/ui/experience-board";
import ProjectsLake from "@/components/ui/projects-lake";

export default function PixelPage() {
  const sections = [
    { id: 0, bg: "/px1.png" },
    { id: 2, bg: "/px2.png" },
    { id: 3, bg: "/px3.png" },
    { id: 4, bg: "/px4.png" },
    { id: 5, bg: "/px5.png" },
    { id: 6, bg: "/px6.png" },
    { id: 7, bg: "/px7.png" },
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#0f0', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 100 }}>
        <ChangeArtstyleButton />
      </div>

      {sections.map((section) => (
        <section 
          key={section.id}
          style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'visible', 
            zIndex: section.id === 4 ? 6 : section.id,
            // Only apply standard background for sections > 7 (none in this list)
            ...(section.id > 7 ? {
              backgroundImage: `url(${section.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {})
          }}
        >
          {/* Section 0: Hero Pong with Section 1's Background */}
          {section.id === 0 && (
            <>
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />
              <PromptingIsAllYouNeed />
            </>
          )}

          {/* Section 2: Brown Mountain Continued (px1-2) and Green Cliff (px2) */}
          {section.id === 2 && (
            <>
              {/* px1-2: Brown mountain continued at the junction (behind px2) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px1-2.png)',
                backgroundSize: '150%',
                backgroundPosition: 'center 100%',
                zIndex: -2
              }} />
              {/* px2: Green cliff at the bottom, placed over px1-2 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── TEXT CONTENT OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                pointerEvents: 'none',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: 'auto auto',
                  gap: '4rem 3rem',
                  width: '100%',
                  maxWidth: '1100px',
                }}>

                  {/* ── MY JOURNEY (spans both columns) ── */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <TextRoll
                        center
                        style={{
                          fontFamily: 'var(--font-pixelify), monospace',
                          fontSize: 'clamp(2rem, 5vw, 3rem)',
                          fontWeight: 'bold',
                          color: '#00ff41',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          WebkitTextStroke: '2px black',
                          textShadow: '2px 4px 0 #003300',
                        }}
                      >
                        MY JOURNEY
                      </TextRoll>
                    </div>
                    <TextRollParagraph
                      style={{
                        fontFamily: 'var(--font-pixelify), monospace',
                        fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                        fontWeight: 'bold',
                        color: '#e0fff0',
                        lineHeight: '2',
                        WebkitTextStroke: '1px black',
                        textShadow: '2px 2px 0 rgba(0,0,0,1)',
                      }}
                    >
                      My journey began in 4th grade when I discovered HTML & CSS, realizing a blank screen held endless possibilities. By 6th grade, I was solving algorithmic puzzles for fun, which naturally led me to master Java, JavaScript, Python, React, and Express. What started as childhood tinkering has evolved into a relentless drive to build impactful, full-stack products. Today, that same curiosity fuels my active participation in tech clubs, hackathons, and competitive programming, constantly pushing me to build things that matter.
                    </TextRollParagraph>
                  </div>

                </div>
              </div>
            </>
          )}

          {/* Section 3: Transition (px2-3) and New Layer (px3) */}
          {section.id === 3 && (
            <>
              {/* px2-3: Transition from section 2 (behind px3) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px2-3.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                transform: 'scaleX(-1)',
                zIndex: -2
              }} />
              {/* px3: Base layer for section 3 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px3.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── EXPERIENCE BOARD OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'flex-start', // Lift the board up
                justifyContent: 'center',
                // We don't use pointerEvents: 'none' here because the board is interactive
              }}>
                <ExperienceBoard />
              </div>
            </>
          )}

          {/* Section 4: Transition (px3-4) and New Layer (px4) */}
          {section.id === 4 && (
            <>
              {/* px3-4: Transition from section 3 (behind px4) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px3-4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                zIndex: -2
              }} />
              {/* px4: Base layer for section 4 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── PROJECTS LAKE OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ProjectsLake />
              </div>
            </>
          )}

          {/* Section 5: Transition (px4-5) and New Layer (px5) */}
          {section.id === 5 && (
            <>
              {/* px4-5: Transition from section 4 (behind px5) */}
              <div style={{
                position: 'absolute',
                top: '-41vh',
                bottom: 0,
                left: '-4vw',
                right: 0,
                backgroundImage: 'url(/px4-5.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                filter: 'brightness(1.8)',
                zIndex: -2
              }} />
              {/* px5: Base layer for section 5 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px5.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />
            </>
          )}

          {/* Section 6: Base Layer for Section 6 */}
          {section.id === 6 && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/px6.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              zIndex: -1
            }} />
          )}

          {/* Section 7: Transition (px6-7) and New Layer (px7) */}
          {section.id === 7 && (
            <>
              {/* px6-7: Transition from section 6 (behind px7) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px6-7.png)',
                backgroundSize: '108%',
                backgroundPosition: 'center 360%',
                zIndex: -2
              }} />
              {/* px7: Base layer for section 7 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px7.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />
            </>
          )}
          {/* Dull Overlay Layer over all images in the section */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dull layer
            zIndex: 5,
            pointerEvents: 'none'
          }} />
        </section>
      ))}
    </div>
  );
}
