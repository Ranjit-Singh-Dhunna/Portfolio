"use client";

import React, { useState } from 'react';

// Hand-drawn pixel-art SVG wood textures (tiles, corners, pillars, and planks)
const topBeamBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='48' viewBox='0 0 48 12' shape-rendering='crispEdges'%3E%3Crect width='48' height='12' fill='%23503629'/%3E%3Crect width='48' height='1' fill='%231c120e'/%3E%3Crect y='11' width='48' height='1' fill='%231c120e'/%3E%3Crect y='1' width='48' height='1' fill='%2375503e'/%3E%3Crect y='10' width='48' height='1' fill='%232d1e17'/%3E%3Cpath d='M0,4 h8 v1 h10 v-1 h7 v-1 h7 v1 h16' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M2,3 h5 M10,4 h6 M28,2 h4 M35,3 h10' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M0,8 h12 v1 h10 v-1 h8 v-1 h10 v-1 h8' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M4,7 h6 M14,8 h6 M32,6 h6 M42,7 h5' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Crect x='23' y='6' width='3' height='1' fill='%232d1e17'/%3E%3Crect x='24' y='5' width='1' height='3' fill='%232d1e17'/%3E%3Crect x='24' y='6' width='1' height='1' fill='%231c120e'/%3E%3Cpath d='M22,5 h1 M25,5 h1 M22,7 h1 M25,7 h1' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3C/svg%3E`;

const bottomBeamBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='48' viewBox='0 0 48 12' shape-rendering='crispEdges'%3E%3Crect width='48' height='12' fill='%232d1e17'/%3E%3Crect width='48' height='1' fill='%231c120e'/%3E%3Crect y='11' width='48' height='1' fill='%231c120e'/%3E%3Crect y='1' width='48' height='1' fill='%231c120e'/%3E%3Cpath d='M0,4 h8 v1 h10 v-1 h7 v-1 h7 v1 h16' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M2,3 h5 M10,4 h6 M28,2 h4 M35,3 h10' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M0,8 h12 v1 h10 v-1 h8 v-1 h10 v-1 h8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M4,7 h6 M14,8 h6 M32,6 h6 M42,7 h5' stroke='%23503629' stroke-width='1' fill='none'/%3E%3C/svg%3E`;

const leftBeamBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='192' viewBox='0 0 12 48' shape-rendering='crispEdges'%3E%3Crect width='12' height='48' fill='%23503629'/%3E%3Crect width='1' height='48' fill='%231c120e'/%3E%3Crect x='11' width='1' height='48' fill='%231c120e'/%3E%3Crect x='1' width='1' height='48' fill='%2375503e'/%3E%3Crect x='10' width='1' height='48' fill='%232d1e17'/%3E%3Cpath d='M4,0 v8 h1 v10 h-1 v7 h-1 v7 h1 v16' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M3,2 v5 M4,10 v6 M2,28 v3 M3,35 v10' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M8,0 v12 h1 v10 h-1 v8 h-1 v10 h1 v8' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M7,4 v6 M8,14 v6 M6,32 v6 M7,42 v5' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3C/svg%3E`;

const rightBeamBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='192' viewBox='0 0 12 48' shape-rendering='crispEdges'%3E%3Crect width='12' height='48' fill='%232d1e17'/%3E%3Crect width='1' height='48' fill='%231c120e'/%3E%3Crect x='11' width='1' height='48' fill='%231c120e'/%3E%3Crect x='1' width='1' height='48' fill='%231c120e'/%3E%3Cpath d='M4,0 v8 h1 v10 h-1 v7 h-1 v7 h1 v16' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M3,2 v5 M4,10 v6 M2,28 v3 M3,35 v10' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M8,0 v12 h1 v10 h-1 v8 h-1 v10 h1 v8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M7,4 v6 M8,14 v6 M6,32 v6 M7,42 v5' stroke='%23503629' stroke-width='1' fill='none'/%3E%3C/svg%3E`;

const topLeftCornerBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 12 12' shape-rendering='crispEdges'%3E%3Cpath d='M12,0 H7 V1 H5 V0 H3 V1 H2 V2 H1 V3 H0 V5 H1 V6 H0 V12 H12 Z' fill='%23503629'/%3E%3Cpath d='M4,4 h8 M8,8 h4' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M5,3 h7 M9,7 h3' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M4,4 v8 M8,8 v8' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M3,5 v7 M7,9 v3' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M12,1 H8 V2 H6 V1 H4 V2 H3 V3 H2 V4 H1 V6 H2 V7 H1 V12' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M12,0 H7 V1 H5 V0 H3 V1 H2 V2 H1 V3 H0 V5 H1 V6 H0 V12' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%232d1e17'/%3E%3Crect x='10' y='11' width='2' height='1' fill='%231c120e'/%3E%3Crect x='11' y='10' width='1' height='2' fill='%231c120e'/%3E%3Cpath d='M3,3 L12,12' stroke='%231c120e' stroke-width='1'/%3E%3C/svg%3E`;

const topRightCornerBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 12 12' shape-rendering='crispEdges'%3E%3Cpath d='M0,0 H5 V1 H7 V0 H9 V1 H10 V2 H11 V3 H12 V5 H11 V6 H12 V12 H0 Z' fill='%23503629'/%3E%3Cpath d='M12,12 L0,12 L12,0 Z' fill='%232d1e17'/%3E%3Cpath d='M0,4 h8 M0,8 h4' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M0,3 h7 M0,7 h3' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M8,4 v8 M4,8 v8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M7,5 v7 M3,9 v3' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M0,1 H4 V2 H6 V1 H8 V2 H9 V3 H10 V4 H11 V6 H10 V7 H11 V12' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M0,0 H5 V1 H7 V0 H9 V1 H10 V2 H11 V3 H12 V5 H11 V6 H12 V12' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Crect x='0' y='10' width='2' height='2' fill='%232d1e17'/%3E%3Crect x='0' y='11' width='2' height='1' fill='%231c120e'/%3E%3Crect x='0' y='10' width='1' height='2' fill='%231c120e'/%3E%3Cpath d='M9,3 L0,12' stroke='%231c120e' stroke-width='1'/%3E%3C/svg%3E`;

const bottomLeftCornerBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 12 12' shape-rendering='crispEdges'%3E%3Cpath d='M0,0 H12 V12 H7 V11 H5 V12 H3 V11 H2 V10 H1 V9 H0 V7 H1 V6 H0 Z' fill='%23503629'/%3E%3Cpath d='M0,12 L12,0 V12 Z' fill='%232d1e17'/%3E%3Cpath d='M4,0 v4 M8,0 v8' stroke='%232d1e17' stroke-width='1' fill='none'/%3E%3Cpath d='M3,0 v3 M7,0 v7' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M0,4 h4 M0,8 h8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M0,3 h3 M0,7 h7' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M1,0 V5 H2 V6 H1 V8 H2 V9 H3 V10 H4 V11 H8 V10 H6 V11 H12' stroke='%2375503e' stroke-width='1' fill='none'/%3E%3Cpath d='M0,0 V6 H1 V7 H0 V9 H1 V10 H2 V11 H3 V12 H5 V11 H7 V12 H12' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Crect x='10' y='0' width='2' height='2' fill='%232d1e17'/%3E%3Crect x='10' y='0' width='2' height='1' fill='%231c120e'/%3E%3Crect x='11' y='0' width='1' height='2' fill='%231c120e'/%3E%3Cpath d='M0,12 L9,3' stroke='%231c120e' stroke-width='1'/%3E%3C/svg%3E`;

const bottomRightCornerBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 12 12' shape-rendering='crispEdges'%3E%3Cpath d='M0,0 H12 V6 H11 V7 H12 V9 H11 V10 H10 V11 H9 V12 H7 V11 H5 V12 H0 Z' fill='%232d1e17'/%3E%3Cpath d='M8,0 v8 M4,0 v4' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M7,0 v7 M3,0 v3' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M8,8 h4 M4,4 h8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M7,7 h5 M3,4 h5' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M11,0 V5 H10 V6 H11 V8 H10 V9 H9 V10 H8 V11 H7 V10 H5 V11 H0' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M12,0 V6 H11 V7 H12 V9 H11 V10 H10 V11 H9 V12 H7 V11 H5 V12 H0' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Crect x='0' y='0' width='2' height='2' fill='%232d1e17'/%3E%3Crect x='0' y='0' width='2' height='1' fill='%231c120e'/%3E%3Crect x='0' y='0' width='1' height='2' fill='%231c120e'/%3E%3Cpath d='M3,3 L12,12' stroke='%231c120e' stroke-width='1'/%3E%3C/svg%3E`;

const pillarWoodBg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='192' viewBox='0 0 14 48' shape-rendering='crispEdges'%3E%3Crect width='14' height='48' fill='%232d1e17'/%3E%3Crect width='1' height='48' fill='%231c120e'/%3E%3Crect x='13' width='1' height='48' fill='%231c120e'/%3E%3Crect x='1' width='1' height='48' fill='%23503629'/%3E%3Crect x='12' width='1' height='48' fill='%231c120e'/%3E%3Cpath d='M5,0 v16 h1 v10 h-1 v7 h-1 v7 h1 v8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M4,2 v12 M5,18 v6 M3,30 v6 M4,38 v8' stroke='%23503629' stroke-width='1' fill='none'/%3E%3Cpath d='M9,0 v8 h-1 v14 h1 v8 h1 v10 h-1 v8' stroke='%231c120e' stroke-width='1' fill='none'/%3E%3Cpath d='M8,4 v3 M7,12 v8 M9,24 v4 M10,32 v6 M8,42 v5' stroke='%23503629' stroke-width='1' fill='none'/%3E%3C/svg%3E`;



export default function ExperienceBoard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const jobs = [
    {
      id: '1',
      company: 'Immense Star Solutions',
      title: 'Software Intern',
      date: 'May 2026 – Aug 2026',
      bullets: [
        'Contributed to developing and maintaining web APIs using Django and Django REST Framework, supporting seamless communication between backend and frontend teams.',
        'Collaborated with senior developers to troubleshoot bugs and write unit tests, improving codebase stability and reducing production errors.',
        'Gained hands-on experience in version control with Git and participated in agile ceremonies, ensuring efficient task tracking and timely delivery of features.'
      ]
    },
    {
      id: '2',
      company: 'SofiaPulse (Montreal, QC)',
      title: 'Fullstack & Applied AI Developer',
      date: 'Dec 2025 – Jan 2026',
      bullets: [
        'Developed a full-stack AI-powered interactive editor enabling users to generate and integrate GenAI images directly into custom ad templates.',
        'Implemented frameworks for rendering responsive frontend ad templates, prioritizing advertiser UI/UX design.'
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'var(--font-pixelify), monospace',
      transform: 'perspective(1400px) rotateY(28deg) scale(0.60)',
      transformStyle: 'preserve-3d',
      width: '100%',
      maxWidth: '1380px',
      userSelect: 'none',
      marginTop: '-5vh',
      filter: 'saturate(0.75)',
      color: '#d4a659',
    }}>
      
      {/* ── 3 WOODEN STANDS (POSTS) BEHIND EVERYTHING ── */}
      {/* Left Pillar (Unchanged, matches 98% height of the former -90px container) */}
      <div style={{ 
        position: 'absolute',
        top: '20%',
        bottom: '-78px', 
        left: '12%',
        width: '56px', 
        backgroundImage: `url("${pillarWoodBg}")`, 
        backgroundSize: '100% 192px', 
        imageRendering: 'pixelated', 
        zIndex: -5,
      }} />
      {/* Middle Pillar (Increased height) */}
      <div style={{ 
        position: 'absolute',
        top: '20%',
        bottom: '-145px', 
        left: '50%',
        transform: 'translateX(-50%)',
        width: '56px', 
        backgroundImage: `url("${pillarWoodBg}")`, 
        backgroundSize: '100% 192px', 
        imageRendering: 'pixelated', 
        zIndex: -5,
      }} />
      {/* Right Pillar (Increased height) */}
      <div style={{ 
        position: 'absolute',
        top: '20%',
        bottom: '-120px', 
        right: '12%',
        width: '56px', 
        backgroundImage: `url("${pillarWoodBg}")`, 
        backgroundSize: '100% 192px', 
        imageRendering: 'pixelated', 
        zIndex: -5,
      }} />

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
        {/* 9-Slice Wood Frame (Drawn Wood Texture & Corner Miters) */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '48px 1fr 48px',
          gridTemplateRows: '48px 1fr 48px',
          position: 'relative',
        }}>
          {/* Top-Left Corner */}
          <div style={{ 
            gridArea: '1 / 1', 
            backgroundImage: `url("${topLeftCornerBg}")`, 
            backgroundSize: '100% 100%', 
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Top Edge */}
          <div style={{ 
            gridArea: '1 / 2', 
            backgroundImage: `url("${topBeamBg}")`, 
            backgroundSize: '192px 100%',
            backgroundRepeat: 'repeat-x',
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Top-Right Corner */}
          <div style={{ 
            gridArea: '1 / 3', 
            backgroundImage: `url("${topRightCornerBg}")`, 
            backgroundSize: '100% 100%', 
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Left Edge */}
          <div style={{ 
            gridArea: '2 / 1', 
            backgroundImage: `url("${leftBeamBg}")`, 
            backgroundSize: '100% 192px',
            backgroundRepeat: 'repeat-y',
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Inner Green Board (Chalkboard) */}
          <div style={{
            gridArea: '2 / 2',
            backgroundColor: '#2b2e21',
            boxShadow: `
              inset 0px 0px 0px 8px #1c120e
            `,
            padding: '4rem 6rem',
            textAlign: 'center',
            width: '100%',
            height: '450px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Fancy Ornate Inner Chalkboard Border */}
            <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', pointerEvents: 'none' }}>
              {/* Straight border lines */}
              <div style={{ position: 'absolute', top: '10px', left: '40px', right: '40px', height: '2px', backgroundColor: '#dfb65d', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: '10px', left: '40px', right: '40px', height: '2px', backgroundColor: '#dfb65d', opacity: 0.5 }} />
              <div style={{ position: 'absolute', left: '10px', top: '40px', bottom: '40px', width: '2px', backgroundColor: '#dfb65d', opacity: 0.5 }} />
              <div style={{ position: 'absolute', right: '10px', top: '40px', bottom: '40px', width: '2px', backgroundColor: '#dfb65d', opacity: 0.5 }} />
 
              {/* Top-Left Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5 }} viewBox="0 0 40 40">
                <path d="M 40 10 L 20 10 L 10 20 L 10 40" fill="none" stroke="#dfb65d" strokeWidth="2" strokeLinecap="square" />
                <path d="M 15 15 L 23 15 L 23 23 L 15 23 Z" fill="none" stroke="#dfb65d" strokeWidth="2" />
                <rect x="4" y="4" width="4" height="4" fill="#dfb65d" />
              </svg>
 
              {/* Top-Right Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.5 }} viewBox="0 0 40 40">
                <path d="M 0 10 L 20 10 L 30 20 L 30 40" fill="none" stroke="#dfb65d" strokeWidth="2" strokeLinecap="square" />
                <path d="M 25 15 L 17 15 L 17 23 L 25 23 Z" fill="none" stroke="#dfb65d" strokeWidth="2" />
                <rect x="32" y="4" width="4" height="4" fill="#dfb65d" />
              </svg>
 
              {/* Bottom-Left Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.5 }} viewBox="0 0 40 40">
                <path d="M 40 30 L 20 30 L 10 20 L 10 0" fill="none" stroke="#dfb65d" strokeWidth="2" strokeLinecap="square" />
                <path d="M 15 25 L 23 25 L 23 17 L 15 17 Z" fill="none" stroke="#dfb65d" strokeWidth="2" />
                <rect x="4" y="32" width="4" height="4" fill="#dfb65d" />
              </svg>
 
              {/* Bottom-Right Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.5 }} viewBox="0 0 40 40">
                <path d="M 0 30 L 20 30 L 30 20 L 30 0" fill="none" stroke="#dfb65d" strokeWidth="2" strokeLinecap="square" />
                <path d="M 25 25 L 17 25 L 17 17 L 25 17 Z" fill="none" stroke="#dfb65d" strokeWidth="2" />
                <rect x="32" y="32" width="4" height="4" fill="#dfb65d" />
              </svg>
            </div>
          
            {expandedId ? (() => {
              const activeJob = jobs.find(j => j.id === expandedId);
              return (
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  color: '#d4a659',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  width: '100%'
                }}>
                  <h3 style={{
                    fontSize: '2.5rem',
                    margin: 0,
                    textShadow: '2px 2px 0 #1c120e, -2px -2px 0 #1c120e, 2px -2px 0 #1c120e, -2px 2px 0 #1c120e, 0 4px 0 #1c120e',
                    lineHeight: 1.1,
                    letterSpacing: '0.05em'
                  }}>
                    {activeJob?.company}
                  </h3>
                  <div style={{
                    fontSize: '1.4rem',
                    opacity: 0.9,
                    textShadow: '2px 2px 0 #1c120e',
                    color: '#d4a659'
                  }}>
                    {activeJob?.title} <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>|</span> {activeJob?.date}
                  </div>
                  <ul style={{
                    margin: '0.5rem 0 0 0',
                    paddingLeft: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    fontSize: '1.3rem',
                    fontFamily: 'monospace',
                    textShadow: '1px 1px 0 #1c120e',
                    color: '#b8c0af'
                  }}>
                    {activeJob?.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ opacity: 0.95, lineHeight: 1.4 }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              );
            })() : (
              <h2 style={{
                fontSize: '8rem',
                margin: '0',
                letterSpacing: '0.08em',
                fontWeight: 'normal',
                lineHeight: '1.15',
                position: 'relative',
                zIndex: 2,
                textShadow: `
                  3px 3px 0 #1c120e, -3px -3px 0 #1c120e, 3px -3px 0 #1c120e, -3px 3px 0 #1c120e,
                  0 6px 0 #1c120e,
                  0 0 20px rgba(212, 166, 89, 0.45)
                `,
                color: '#d4a659', // Soft warm beige/gold
              }}>
                EXPERIENCE<br/>
                STATION
              </h2>
            )}
          </div> {/* close chalkboard */}

          {/* Right Edge */}
          <div style={{ 
            gridArea: '2 / 3', 
            backgroundImage: `url("${rightBeamBg}")`, 
            backgroundSize: '100% 192px',
            backgroundRepeat: 'repeat-y',
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Bottom-Left Corner */}
          <div style={{ 
            gridArea: '3 / 1', 
            backgroundImage: `url("${bottomLeftCornerBg}")`, 
            backgroundSize: '100% 100%', 
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Bottom Edge */}
          <div style={{ 
            gridArea: '3 / 2', 
            backgroundImage: `url("${bottomBeamBg}")`, 
            backgroundSize: '192px 100%',
            backgroundRepeat: 'repeat-x',
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Bottom-Right Corner */}
          <div style={{ 
            gridArea: '3 / 3', 
            backgroundImage: `url("${bottomRightCornerBg}")`, 
            backgroundSize: '100% 100%', 
            imageRendering: 'pixelated',
            width: '100%', 
            height: '100%' 
          }} />

          {/* Top Decorative Crest (Integrated at the bottom of DOM order to render on top of top edge) */}
          <div style={{
            position: 'absolute',
            top: '-102px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '580px',
            height: '110px',
            zIndex: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 580 110"
              style={{ imageRendering: 'pixelated' }}
            >
              <defs>
                <pattern id="wood-h-pattern" width="192" height="48" patternUnits="userSpaceOnUse" viewBox="0 0 48 12">
                  <rect width="48" height="12" fill="#503629" />
                  <rect y="1" width="48" height="1" fill="#75503e" />
                  <rect y="10" width="48" height="1" fill="#2d1e17" />
                  <path d="M0,4 h8 v1 h10 v-1 h7 v-1 h7 v1 h16" stroke="#2d1e17" strokeWidth="1" fill="none" shapeRendering="crispEdges" />
                  <path d="M2,3 h5 M10,4 h6 M28,2 h4 M35,3 h10" stroke="#75503e" strokeWidth="1" fill="none" shapeRendering="crispEdges" />
                  <path d="M0,8 h12 v1 h10 v-1 h8 v-1 h10 v-1 h8" stroke="#2d1e17" strokeWidth="1" fill="none" shapeRendering="crispEdges" />
                  <path d="M4,7 h6 M14,8 h6 M32,6 h6 M42,7 h5" stroke="#75503e" strokeWidth="1" fill="none" shapeRendering="crispEdges" />
                  <rect x="23" y="6" width="3" height="1" fill="#2d1e17" shapeRendering="crispEdges" />
                  <rect x="24" y="5" width="1" height="3" fill="#2d1e17" shapeRendering="crispEdges" />
                  <rect x="24" y="6" width="1" height="1" fill="#1c120e" shapeRendering="crispEdges" />
                  <path d="M22,5 h1 M25,5 h1 M22,7 h1 M25,7 h1" stroke="#75503e" strokeWidth="1" fill="none" shapeRendering="crispEdges" />
                </pattern>
              </defs>
              {/* Main Crest Wood - Smooth Curved Crest (no bottom stroke) */}
              <path
                d="M 40,110 C 120,110 180,40 290,40 C 400,40 460,110 540,110 Z"
                fill="url(#wood-h-pattern)"
              />
              {/* Outline Stroke - Top Curve Only (leaves bottom open to blend into top frame) */}
              <path
                d="M 40,110 C 120,110 180,40 290,40 C 400,40 460,110 540,110"
                fill="none"
                stroke="#1c120e"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Highlight (top/left wood-colored bevel) */}
              <path
                d="M 42,108 C 120,108 178,42 290,42"
                stroke="#75503e"
                strokeWidth="2"
                fill="none"
              />
              {/* Curved wood grain paths inside crest */}
              <path d="M 60,105 C 100,105 130,95 160,85" stroke="#2d1e17" strokeWidth="4" fill="none" />
              <path d="M 130,95 C 160,95 180,85 210,75" stroke="#75503e" strokeWidth="4" fill="none" />
              <path d="M 420,85 C 450,95 480,105 520,105" stroke="#2d1e17" strokeWidth="4" fill="none" />
              <path d="M 370,75 C 400,85 420,95 450,95" stroke="#2d1e17" strokeWidth="4" fill="none" />
              <path d="M 230,75 C 250,75 270,65 290,65" stroke="#2d1e17" strokeWidth="4" fill="none" />
              {/* Center Gold Ornament (Wings/scrolls and stick figure - Stepped Pixel Art) */}
              <g stroke="#1c120e" strokeWidth="2.5" strokeLinecap="square" fill="none">
                {/* Left outer scroll outline */}
                <path d="M 255,80 H 248 V 72 H 254 V 70 H 258 V 74 H 254" />
                {/* Left inner scroll outline */}
                <path d="M 272,80 H 265 V 72 H 271 V 70 H 275 V 74 H 271" />
                {/* Right inner scroll outline */}
                <path d="M 308,80 H 315 V 72 H 309 V 70 H 305 V 74 H 309" />
                {/* Right outer scroll outline */}
                <path d="M 325,80 H 332 V 72 H 326 V 70 H 322 V 74 H 326" />
                {/* Central Figure limbs outline */}
                <path d="M 290,74 H 284 V 70 H 278 V 66" />
                <path d="M 290,74 H 296 V 70 H 302 V 66" />
                <path d="M 290,74 V 84" />
                <path d="M 290,84 H 287 V 87 H 284 V 90" />
                <path d="M 290,84 H 293 V 87 H 296 V 90" />
              </g>
              <g fill="#d4a659" stroke="none">
                {/* Head - diamond shape */}
                <polygon points="290,65 294,69 290,73 286,69" />
                {/* Left outer scroll gold */}
                <path d="M 255,80 H 248 V 72 H 254 V 70 H 258 V 74 H 254" stroke="#d4a659" strokeWidth="1.2" fill="none" />
                {/* Left inner scroll gold */}
                <path d="M 272,80 H 265 V 72 H 271 V 70 H 275 V 74 H 271" stroke="#d4a659" strokeWidth="1.2" fill="none" />
                {/* Right inner scroll gold */}
                <path d="M 308,80 H 315 V 72 H 309 V 70 H 305 V 74 H 309" stroke="#d4a659" strokeWidth="1.2" fill="none" />
                {/* Right outer scroll gold */}
                <path d="M 325,80 H 332 V 72 H 326 V 70 H 322 V 74 H 326" stroke="#d4a659" strokeWidth="1.2" fill="none" />
                {/* Central figure limbs gold */}
                <path d="M 290,74 H 284 V 70 H 278 V 66 M 290,74 H 296 V 70 H 302 V 66 M 290,74 V 84 M 290,84 H 287 V 87 H 284 V 90 M 290,84 H 293 V 87 H 296 V 90" stroke="#d4a659" strokeWidth="1.2" fill="none" />
              </g>
            </svg>
          </div>
        </div> {/* close 9-slice grid */}
      </div> {/* close main board wrapper */}

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
              
              {/* The Plank itself (Pixelated border and corners) */}
              <button 
                onClick={() => toggleExpand(job.id)}
                style={{
                  width: '100%',
                  backgroundColor: '#2b2e21', // Olive-green chalkboard color
                  border: '4px solid #151710', // Dark green slate border
                  boxShadow: `
                    inset 0px 0px 0px 4px #151710
                  `,
                  clipPath: `polygon(
                    0px 12px, 4px 12px, 4px 8px, 8px 8px, 8px 4px, 12px 4px, 12px 0px,
                    calc(100% - 12px) 0px, calc(100% - 12px) 4px, calc(100% - 8px) 4px, calc(100% - 8px) 8px, calc(100% - 4px) 8px, calc(100% - 4px) 12px, 100% 12px,
                    100% calc(100% - 12px), calc(100% - 4px) calc(100% - 12px), calc(100% - 4px) calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) calc(100% - 4px), calc(100% - 12px) calc(100% - 4px), calc(100% - 12px) 100%,
                    12px 100%, 12px calc(100% - 4px), 8px calc(100% - 4px), 8px calc(100% - 8px), 4px calc(100% - 8px), 4px calc(100% - 12px), 0px calc(100% - 12px)
                  )`,
                  padding: '1.2rem 2.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'none',
                  outline: 'none',
                  color: isExpanded ? '#f4ebd0' : '#d4a659',
                  fontFamily: 'inherit',
                  textShadow: `
                    2px 2px 0 #151710, -2px -2px 0 #151710, 2px -2px 0 #151710, -2px 2px 0 #151710,
                    0 3px 0 #151710
                  `,
                  transition: 'all 0.2s ease',
                  transform: isExpanded ? 'translateZ(20px) scale(1.02)' : 'translateZ(0)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)'; // Brighten on hover
                  e.currentTarget.style.color = '#f4ebd0';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter = 'none';
                  e.currentTarget.style.color = isExpanded ? '#f4ebd0' : '#d4a659';
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
