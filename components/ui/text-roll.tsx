"use client"

import React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const STAGGER = 0.006 // Snappy, ultra-fast sequence
const DURATION = 0.18 // Shorter transition duration

export default function TextRoll({
  children,
  className,
  style,
  center = false,
}: {
  children: string
  className?: string
  style?: React.CSSProperties
  center?: boolean
}) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("cursor-pointer", className)}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        lineHeight: 0.9,
        pointerEvents: "auto",
        ...style,
      }}
    >
      {/* Top Text (Slides up) */}
      <div style={{ display: "block", whiteSpace: "nowrap" }}>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeOut",
                duration: DURATION,
                delay,
              }}
              style={{ display: "inline-block" }}
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          )
        })}
      </div>

      {/* Bottom Text (Slides in from bottom) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          whiteSpace: "nowrap",
        }}
      >
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeOut",
                duration: DURATION,
                delay,
              }}
              style={{ display: "inline-block" }}
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          )
        })}
      </div>
    </motion.span>
  )
}

export function TextRollParagraph({
  children,
  className,
  style,
  highlights = [],
}: {
  children: string
  className?: string
  style?: React.CSSProperties
  highlights?: { word: string; style: React.CSSProperties }[]
}) {
  const words = children.split(" ")

  return (
    <motion.p
      initial="initial"
      whileHover="hovered"
      className={className}
      style={{
        margin: 0,
        pointerEvents: "auto",
        ...style,
      }}
    >
      {words.map((word, i) => {
        // Clean punctuation for matching highlight words (keep dots for file extensions)
        const cleanWord = word.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        const highlight = highlights.find(
          (h) => h.word.toLowerCase() === cleanWord.toLowerCase()
        )

        return (
          <React.Fragment key={i}>
            <TextRoll
              style={{
                display: "inline-block",
                ...highlight?.style,
              }}
            >
              {word}
            </TextRoll>
            {i < words.length - 1 && " "}
          </React.Fragment>
        )
      })}
    </motion.p>
  )
}
