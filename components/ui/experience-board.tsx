"use client";

import { useState } from 'react';

const jobs = [
  {
    id: '01',
    title: 'FULLSTACK AI DEV',
    date: "DEC '25 - JAN '26",
    company: 'SOFIAPULSE, MONTREAL',
    bullets: [
      'Developed a full-stack AI-powered interactive editor enabling users to generate and integrate GenAI images directly into custom ad templates.',
      'Implemented frameworks for rendering responsive frontend ad templates, prioritizing advertiser UI/UX design.'
    ]
  },
  {
    id: '02',
    title: 'SOFTWARE INTERN',
    date: "MAY '26 - AUG '26",
    company: 'IMMENSE STAR SOLUTIONS',
    bullets: [
      'Contributed to developing and maintaining web APIs using Django and Django REST Framework, supporting seamless communication between backend and frontend teams.',
      'Collaborated with the engineering team to manage databases, write reliable test cases, and follow version control best practices using Git in a remote work environment.'
    ]
  }
];

export default function ExperienceBoard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'var(--font-pixelify), monospace',
      // Corrected 3D perspective: positive rotateY brings the left side closer, slightly reduced size
      transform: 'perspective(1400px) rotateY(15deg) rotateX(2deg) rotateZ(-1deg) scale(0.55)',
      transformStyle: 'preserve-3d',
      width: '100%',
      maxWidth: '1200px', // Increased from 1000px to allow a wider board
      userSelect: 'none',
      marginTop: '-15vh', // Aggressively lift the board up towards the top
      // Softer, greenish drop shadow to blend with the atmospheric background
      filter: 'drop-shadow(20px 30px 20px rgba(15, 25, 10, 0.7))',
      color: '#f6d379',
    }}>
      
      {/* ── 3 WOODEN STANDS (POSTS) BEHIND EVERYTHING ── */}
      {/* Solid posts without transparency */}
      <div style={{
        position: 'absolute',
        top: '20%',
        bottom: '-250px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 10%',
        zIndex: -5,
      }}>
        {/* Posts use a muted, dark ambient brown */}
        <div style={{ width: '28px', backgroundColor: '#362b20', borderLeft: '5px solid #17120c', borderRight: '5px solid #17120c' }} />
        <div style={{ width: '28px', backgroundColor: '#362b20', borderLeft: '5px solid #17120c', borderRight: '5px solid #17120c' }} />
        <div style={{ width: '28px', backgroundColor: '#362b20', borderLeft: '5px solid #17120c', borderRight: '5px solid #17120c' }} />
      </div>

      {/* ── MAIN BOARD ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginBottom: '20px',
      }}>
        {/* Top Decorative Crest */}
        <div style={{
          position: 'absolute',
          top: '-45px',
          width: '300px',
          height: '60px',
          backgroundColor: '#524330', // Muted dusty wood
          borderTopLeftRadius: '25px',
          borderTopRightRadius: '25px',
          boxShadow: 'inset 6px 6px 0 #6e5c46, inset -6px 0 0 #2e2215, 0 0 0 6px #1a1610',
          zIndex: -1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Detailed Crest Engravings */}
          <div style={{ width: 16, height: 16, backgroundColor: '#8a7455', borderRadius: '50%', boxShadow: '0 0 0 4px #1a1610', position: 'relative', top: '-5px' }} />
          <div style={{ position: 'absolute', left: 45, width: 10, height: 10, backgroundColor: '#8a7455', borderRadius: '50%', boxShadow: '0 0 0 3px #1a1610' }} />
          <div style={{ position: 'absolute', right: 45, width: 10, height: 10, backgroundColor: '#8a7455', borderRadius: '50%', boxShadow: '0 0 0 3px #1a1610' }} />
          <div style={{ position: 'absolute', bottom: -5, width: 120, height: 8, backgroundColor: '#1a1610', borderRadius: '4px' }} />
        </div>

        {/* Main Board Frame & Background */}
        <div style={{
          backgroundColor: '#272b1e', // Dusty olive green background
          border: '20px solid #524330', // Muted wood frame
          borderRadius: '6px',
          // Softer, more atmospheric shadows
          boxShadow: `
            inset 8px 8px 0px 0px #6e5c46, 
            inset -8px -8px 0px 0px #2e2215,
            inset 14px 14px 0px 0px #1a1610,
            inset -14px -14px 0px 0px #1a1610,
            inset 0 0 0 16px #3b3522,
            0 0 0 8px #1a1610
          `,
          padding: '7rem 7rem', // Increased horizontal padding from 3rem to 7rem to widen the board
          textAlign: 'center',
          width: '100%',
          position: 'relative',
        }}>
          {/* Inner decorative frame line in the green area */}
          <div style={{
            position: 'absolute',
            top: '30px', left: '30px', right: '30px', bottom: '30px',
            border: '2px solid #3c422c',
            pointerEvents: 'none',
          }} />
          
          <h2 style={{
            fontSize: '5rem',
            margin: '0 0 0.5rem 0',
            letterSpacing: '0.08em',
            fontWeight: 'normal',
            lineHeight: '1.2',
            position: 'relative',
            zIndex: 2,
            // Less harsh black stroke, no glow
            textShadow: `
              3px 3px 0 #1c140a, -3px -3px 0 #1c140a, 3px -3px 0 #1c140a, -3px 3px 0 #1c140a,
              0 6px 0 #1c140a
            `,
            color: '#e6b964', // Slightly more muted gold
          }}>
            JOB ASSIGNMENTS<br/>
            <span style={{ fontSize: '3rem', display: 'inline-block', margin: '0.5rem 0' }}>~ &amp; ~</span><br/>
            DEPARTURES
          </h2>
        </div>
      </div>

      {/* ── PLANKS CONTAINER ── */}
      <div style={{
        position: 'relative',
        width: '92%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {jobs.map((job) => {
          const isExpanded = expandedId === job.id;
          return (
            <div key={job.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 5, marginBottom: '20px' }}>
              
              {/* The Plank itself */}
              <button 
                onClick={() => toggleExpand(job.id)}
                style={{
                  width: '100%',
                  backgroundColor: '#303424', // Dusty olive, lighter than the main board
                  border: '8px solid #524330', // Muted wood
                  borderRadius: '4px',
                  boxShadow: `
                    inset 4px 4px 0px 0px #6e5c46, 
                    inset -4px -4px 0px 0px #2e2215,
                    inset 8px 8px 0px 0px #1a1610,
                    inset -8px -8px 0px 0px #1a1610,
                    0 6px 0 6px #1a1610,
                    0 15px 20px rgba(15, 25, 10, 0.4)
                  `,
                  padding: '1.2rem 2.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'none',
                  outline: 'none',
                  color: '#e6b964',
                  fontFamily: 'inherit',
                  textShadow: `
                    2px 2px 0 #1c140a, -2px -2px 0 #1c140a, 2px -2px 0 #1c140a, -2px 2px 0 #1c140a,
                    0 3px 0 #1c140a
                  `,
                  transition: 'all 0.2s ease',
                  transform: isExpanded ? 'translateZ(20px) scale(1.02)' : 'translateZ(0)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#383e29'; // Slightly lighter on hover
                  e.currentTarget.style.textShadow = `
                    2px 2px 0 #1c140a, -2px -2px 0 #1c140a, 2px -2px 0 #1c140a, -2px 2px 0 #1c140a,
                    0 3px 0 #1c140a
                  `;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#303424';
                  e.currentTarget.style.textShadow = `
                    2px 2px 0 #1c140a, -2px -2px 0 #1c140a, 2px -2px 0 #1c140a, -2px 2px 0 #1c140a,
                    0 3px 0 #1c140a
                  `;
                }}
              >
                <div style={{ fontSize: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{job.id}.</span>
                  <span>{job.title}</span>
                </div>
                <div style={{ fontSize: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ opacity: 0.7 }}>|</span>
                  <span>{job.date}</span>
                </div>
              </button>

              {/* Accordion Content Container */}
              <div style={{
                width: '96%',
                backgroundColor: 'rgba(23, 26, 17, 0.95)', // Muted dark olive interior
                borderLeft: '6px solid #1a1610',
                borderRight: '6px solid #1a1610',
                borderBottom: isExpanded ? '6px solid #1a1610' : 'none',
                maxHeight: isExpanded ? '600px' : '0',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isExpanded ? 1 : 0,
                color: '#d4e0c8', // Muted pale olive text
                textShadow: 'none',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                lineHeight: '1.6',
                transform: 'translateZ(-10px)',
              }}>
                <div style={{ padding: '2rem 2.5rem' }}>
                  <h4 style={{ color: '#e6b964', marginBottom: '1rem', marginTop: 0, fontSize: '1.5rem', letterSpacing: '0.05em', fontFamily: 'var(--font-pixelify)', textShadow: '2px 2px 0 #1c140a' }}>
                    {job.company}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ opacity: 0.9 }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
