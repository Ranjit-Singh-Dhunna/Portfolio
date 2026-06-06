"use client"

import { useEffect, useRef } from "react"

const COLOR = "#f59fdb"
const HIT_COLOR = "#8dbff7"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#f59fdb"
const PADDLE_COLOR = "#f59fdb"
const LETTER_SPACING = 1
const WORD_SPACING = 3


interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  alpha: number
  decay: number
}

export function PromptingIsAllYouNeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)
  const activePaddleRef = useRef<number | null>(null)
  const activePaddleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let paddleWidth = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      document.fonts.load('16px "ChonkyPixels"').then(() => {
        initializeGame()
      })
    }

    const initializeGame = () => {
      const scale = scaleRef.current
      const BALL_SPEED = 4.2 * scale

      pixelsRef.current = []
      const words = ["Rendering future", "pixel by pixel"]
      
      const offscreen = document.createElement('canvas')
      const oCtx = offscreen.getContext('2d', { willReadFrequently: true })
      if (!oCtx) return

      const largeFontSize = 24;
      const smallFontSize = 24;
      
      oCtx.font = `${largeFontSize}px "ChonkyPixels"`
      const w1 = oCtx.measureText(words[0]).width
      oCtx.font = `${smallFontSize}px "ChonkyPixels"`
      const w2 = oCtx.measureText(words[1]).width
      
      offscreen.width = Math.max(w1, w2) + 10
      offscreen.height = largeFontSize + smallFontSize + 15 

      interface RawPixel {
        x: number;
        y: number;
        line: number;
        charIdx: number;
      }
      const rawPixels: RawPixel[] = []

      // Helper to get character index for a given x-coordinate on a line
      const getCharacterIndex = (x: number, spans: { start: number; end: number }[]) => {
        let bestIdx = -1;
        let minDistance = Infinity;
        for (let i = 0; i < spans.length; i++) {
          const span = spans[i];
          if (x >= span.start && x < span.end) {
            return i;
          }
          const dist = Math.min(Math.abs(x - span.start), Math.abs(x - (span.end - 1)));
          if (dist < minDistance) {
            minDistance = dist;
            bestIdx = i;
          }
        }
        return bestIdx;
      };

      // Process words[0]
      oCtx.clearRect(0, 0, offscreen.width, offscreen.height)
      oCtx.textBaseline = "top"
      oCtx.textAlign = "right"
      oCtx.font = `${largeFontSize}px "ChonkyPixels"`
      oCtx.fillText(words[0], offscreen.width - 5, 0)

      let imgData = oCtx.getImageData(0, 0, offscreen.width, offscreen.height)
      let data = imgData.data

      // Calculate spans for line 0
      const spans0: { start: number; end: number }[] = []
      const totalW0 = oCtx.measureText(words[0]).width
      const leftEdge0 = offscreen.width - 5 - totalW0
      for (let i = 0; i < words[0].length; i++) {
        const start = leftEdge0 + oCtx.measureText(words[0].substring(0, i)).width
        const end = leftEdge0 + oCtx.measureText(words[0].substring(0, i + 1)).width
        spans0.push({ start, end })
      }

      for (let y = 0; y < offscreen.height; y++) {
        for (let x = 0; x < offscreen.width; x++) {
          const alpha = data[(y * offscreen.width + x) * 4 + 3]
          if (alpha > 128) {
            rawPixels.push({
              x,
              y,
              line: 0,
              charIdx: getCharacterIndex(x, spans0)
            })
          }
        }
      }

      // Process words[1]
      oCtx.clearRect(0, 0, offscreen.width, offscreen.height)
      oCtx.font = `${smallFontSize}px "ChonkyPixels"`
      oCtx.fillText(words[1], offscreen.width - 5, largeFontSize + 4)

      imgData = oCtx.getImageData(0, 0, offscreen.width, offscreen.height)
      data = imgData.data

      // Calculate spans for line 1
      const spans1: { start: number; end: number }[] = []
      const totalW1 = oCtx.measureText(words[1]).width
      const leftEdge1 = offscreen.width - 5 - totalW1
      for (let i = 0; i < words[1].length; i++) {
        const start = leftEdge1 + oCtx.measureText(words[1].substring(0, i)).width
        const end = leftEdge1 + oCtx.measureText(words[1].substring(0, i + 1)).width
        spans1.push({ start, end })
      }

      for (let y = 0; y < offscreen.height; y++) {
        for (let x = 0; x < offscreen.width; x++) {
          const alpha = data[(y * offscreen.width + x) * 4 + 3]
          if (alpha > 128) {
            rawPixels.push({
              x,
              y,
              line: 1,
              charIdx: getCharacterIndex(x, spans1)
            })
          }
        }
      }

      if (rawPixels.length === 0) return

      const minX = Math.min(...rawPixels.map(p => p.x))
      const maxX = Math.max(...rawPixels.map(p => p.x))
      const minY = Math.min(...rawPixels.map(p => p.y))
      const maxY = Math.max(...rawPixels.map(p => p.y))

      const textWidth = maxX - minX + 1
      const textHeight = maxY - minY + 1

      const scaleFactor = (canvas.width * 0.85) / textWidth
      const pixelSize = scaleFactor 

      const startX = canvas.width - (textWidth * pixelSize) - (canvas.width * 0.05)
      const startY = canvas.height * 0.10

      // Group pixels by character key: `line,charIdx`
      const charPixelsMap = new Map<string, RawPixel[]>()
      rawPixels.forEach(p => {
        const key = `${p.line},${p.charIdx}`
        if (!charPixelsMap.has(key)) {
          charPixelsMap.set(key, [])
        }
        charPixelsMap.get(key)!.push(p)
      })

      const adjustedPixels: { x: number; y: number; isExempt: boolean }[] = []

      charPixelsMap.forEach((pixels, key) => {
        const [line, charIdx] = key.split(',').map(Number)
        
        let finalPixels = pixels.map(p => ({ x: p.x, y: p.y }))
        let isExempt = false

        if (line === 0 && charIdx === 0) {
          isExempt = true
          const compMinX = Math.min(...finalPixels.map(c => c.x))
          const compMaxX = Math.max(...finalPixels.map(c => c.x))
          const compMinY = Math.min(...finalPixels.map(c => c.y))
          const compMaxY = Math.max(...finalPixels.map(c => c.y))

          const targetRemoveKey = `${compMinX + 1},${compMaxY}`
          const targetRemoveKey2 = `${compMinX},${compMinY}`
          let newComp = finalPixels.filter(c => {
            const k = `${c.x},${c.y}`
            return k !== targetRemoveKey && k !== targetRemoveKey2
          })

          const addKeys = [
            `${compMaxX},${compMaxY}`,
            `${compMaxX - 1},${compMaxY}`,
            `${compMinX + 2},${compMaxY - 7}`
          ]

          const currentSet = new Set(newComp.map(c => `${c.x},${c.y}`))
          addKeys.forEach(k => {
            if (!currentSet.has(k)) {
              const [ax, ay] = k.split(',').map(Number)
              newComp.push({ x: ax, y: ay })
              currentSet.add(k)
            }
          })
          finalPixels = newComp
        } else if (line === 0 && (charIdx === 2 || charIdx === 7)) {
          isExempt = true
          const compMaxX = Math.max(...finalPixels.map(c => c.x))
          const compMaxY = Math.max(...finalPixels.map(c => c.y))

          const addKeys = [
            `${compMaxX},${compMaxY}`,
            `${compMaxX - 1},${compMaxY}`
          ]

          const currentSet = new Set(finalPixels.map(c => `${c.x},${c.y}`))
          addKeys.forEach(k => {
            if (!currentSet.has(k)) {
              const [ax, ay] = k.split(',').map(Number)
              finalPixels.push({ x: ax, y: ay })
              currentSet.add(k)
            }
          })
        } else if (line === 0 && charIdx === 8) {
          isExempt = true
          const compMinX = Math.min(...finalPixels.map(c => c.x))
          const compMaxY = Math.max(...finalPixels.map(c => c.y))

          const addKeys = [
            `${compMinX + 1},${compMaxY - 1}`,
            `${compMinX + 1},${compMaxY - 2}`
          ]

          const currentSet = new Set(finalPixels.map(c => `${c.x},${c.y}`))
          addKeys.forEach(k => {
            if (!currentSet.has(k)) {
              const [ax, ay] = k.split(',').map(Number)
              finalPixels.push({ x: ax, y: ay })
              currentSet.add(k)
            }
          })
        } else if (line === 1 && (charIdx === 0 || charIdx === 9)) {
          isExempt = true
          finalPixels = finalPixels.map(pt => ({ x: pt.x, y: pt.y - 6 }))
        }

        finalPixels.forEach(p => {
          adjustedPixels.push({ x: p.x, y: p.y, isExempt })
        })
      })

      // Group adjustedPixels into separate letter components using a BFS
      const finalComponents: { x: number; y: number }[][] = []
      const exemptIndices = new Set<number>()
      
      const pixelSet = new Set(adjustedPixels.map(p => `${p.x},${p.y}`))
      const visited = new Set<string>()

      const exemptCoordSet = new Set(adjustedPixels.filter(p => p.isExempt).map(p => `${p.x},${p.y}`))

      for (const p of adjustedPixels) {
        const key = `${p.x},${p.y}`
        if (visited.has(key)) continue

        const comp: { x: number; y: number }[] = []
        const queue: { x: number; y: number }[] = [p]
        visited.add(key)

        let isCompExempt = false

        while (queue.length > 0) {
          const curr = queue.shift()!
          comp.push(curr)
          if (exemptCoordSet.has(`${curr.x},${curr.y}`)) {
            isCompExempt = true
          }

          const neighbors = [
            { x: curr.x - 1, y: curr.y },
            { x: curr.x + 1, y: curr.y },
            { x: curr.x, y: curr.y - 1 },
            { x: curr.x, y: curr.y + 1 },
            { x: curr.x - 1, y: curr.y - 1 },
            { x: curr.x + 1, y: curr.y - 1 },
            { x: curr.x - 1, y: curr.y + 1 },
            { x: curr.x + 1, y: curr.y + 1 }
          ]

          for (const n of neighbors) {
            const nKey = `${n.x},${n.y}`
            if (pixelSet.has(nKey) && !visited.has(nKey)) {
              visited.add(nKey)
              queue.push(n)
            }
          }
        }
        
        const compIdx = finalComponents.length
        finalComponents.push(comp)
        if (isCompExempt) {
          exemptIndices.add(compIdx)
        }
      }

      const filteredPixels: { x: number; y: number }[] = []

      finalComponents.forEach((comp, compIndex) => {
        if (comp.length === 0) return

        const compMaxY = Math.max(...comp.map(c => c.y))
        const bottomPixels = comp.filter(c => c.y === compMaxY)
        const bottomXs = Array.from(new Set(bottomPixels.map(c => c.x))).sort((a, b) => a - b)

        // Group contiguous bottom X coordinates (separate stems)
        const groups: number[][] = []
        let currentGroup: number[] = []
        for (let i = 0; i < bottomXs.length; i++) {
          if (currentGroup.length === 0 || bottomXs[i] === bottomXs[i - 1] + 1) {
            currentGroup.push(bottomXs[i])
          } else {
            groups.push(currentGroup)
            currentGroup = [bottomXs[i]]
          }
        }
        if (currentGroup.length > 0) groups.push(currentGroup)

        // If there are 2 or more separate parallel stems terminating at the bottom row,
        // remove the bottom-most pixel of the rightmost stem (skip for exempt components).
        const toRemove = new Set<string>()
        if (!exemptIndices.has(compIndex) && groups.length > 1) {
          const targetGroupXs = groups[groups.length - 1]
          targetGroupXs.forEach(tx => {
            toRemove.add(`${tx},${compMaxY}`)
          })
        }

        comp.forEach(c => {
          if (!toRemove.has(`${c.x},${c.y}`)) {
            filteredPixels.push(c)
          }
        })
      })

      // Initialize the physical blocks with the filtered pixel coordinates
      filteredPixels.forEach((p) => {
        pixelsRef.current.push({
          x: startX + (p.x - minX) * pixelSize,
          y: startY + (p.y - minY) * pixelSize,
          size: pixelSize,
          hit: false
        })
      })

      const adjustedLargePixelSize = pixelSize * 2.5
      const ballStartX = canvas.width * 0.9
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: adjustedLargePixelSize / 2.5,
      }

      paddleWidth = adjustedLargePixelSize * 0.15;
      const paddleLength = 8 * adjustedLargePixelSize
      const offset = paddleWidth * 5;

      paddlesRef.current = [
        {
          x: offset,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth - (paddleWidth * 5.0),
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: offset,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth - offset - (canvas.height * 0.1),
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ]
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      paddles.forEach((paddle, index) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
            activePaddleRef.current = index
            if (activePaddleTimerRef.current) clearTimeout(activePaddleTimerRef.current)
            activePaddleTimerRef.current = setTimeout(() => { activePaddleRef.current = null }, 400)
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
            activePaddleRef.current = index
            if (activePaddleTimerRef.current) clearTimeout(activePaddleTimerRef.current)
            activePaddleTimerRef.current = setTimeout(() => { activePaddleRef.current = null }, 400)
          }
        }
      })

      const offset = paddleWidth * 5;
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(offset, Math.min(canvas.height - paddle.height - offset - (canvas.height * 0.1), paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(offset, Math.min(canvas.width - paddle.width - (paddleWidth * 5.0), paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
        }
      })

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true

          // Spawn explosion particles
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          const particleCount = 30 + Math.floor(Math.random() * 15) // 30 to 45 particles
          const colors = [COLOR, HIT_COLOR, "#ffffff"]
          
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = (1.5 + Math.random() * 5.0) * scaleRef.current // faster speed
            particlesRef.current.push({
              x: centerX,
              y: centerY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: pixel.size * (0.35 + Math.random() * 0.45), // larger size
              alpha: 1.0,
              decay: 0.012 + Math.random() * 0.018 // slower decay
            })
          }

          // Mark adjacent pixels as hit too (1.6 * size covers diagonals in a 3x3 grid)
          const threshold = 1.6 * pixel.size
          pixelsRef.current.forEach((p) => {
            if (!p.hit && Math.abs(p.x - pixel.x) <= threshold && Math.abs(p.y - pixel.y) <= threshold) {
              p.hit = true
            }
          })

          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })

      // Update particles physics and remove decayed particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        return p.alpha > 0
      })
    }

    const drawGame = () => {
      if (!ctx) return

      // ctx.fillStyle = BACKGROUND_COLOR
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      // Ball and paddles (bars) are visually hidden while physics stays active.

      // Draw active explosion particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      })
      ctx.globalAlpha = 1.0 // Reset opacity
    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (activePaddleTimerRef.current) clearTimeout(activePaddleTimerRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0"
      style={{ zIndex: 10, width: '95vw', height: '100vh' }}
      aria-label="Prompting Is All You Need: Fullscreen Pong game with pixel text"
    />
  )
}

export default PromptingIsAllYouNeed
