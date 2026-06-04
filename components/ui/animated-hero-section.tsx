"use client"

import { useEffect, useRef } from "react"

const COLOR = "#d4c417"
const HIT_COLOR = "#333333"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#d4c417"
const PADDLE_COLOR = "#d4c417"
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

export function PromptingIsAllYouNeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)
  const activePaddleRef = useRef<number | null>(null)
  const activePaddleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trailRef = useRef<{ x: number; y: number }[]>([])

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
      const words = ["INTRODUCING", "RANJIT"]
      
      const offscreen = document.createElement('canvas')
      const oCtx = offscreen.getContext('2d', { willReadFrequently: true })
      if (!oCtx) return

      const largeFontSize = 24;
      const smallFontSize = 14;
      
      oCtx.font = `${largeFontSize}px "ChonkyPixels"`
      const w1 = oCtx.measureText(words[0]).width
      oCtx.font = `${smallFontSize}px "ChonkyPixels"`
      const w2 = oCtx.measureText(words[1]).width
      
      offscreen.width = Math.max(w1, w2) + 10
      offscreen.height = largeFontSize + smallFontSize + 15 
      
      oCtx.clearRect(0, 0, offscreen.width, offscreen.height)
      oCtx.textBaseline = "top"
      oCtx.textAlign = "right"
      
      oCtx.font = `${largeFontSize}px "ChonkyPixels"`
      oCtx.fillText(words[0], offscreen.width - 5, 0)
      
      oCtx.font = `${smallFontSize}px "ChonkyPixels"`
      oCtx.fillText(words[1], offscreen.width - 5, largeFontSize + 4)

      const imgData = oCtx.getImageData(0, 0, offscreen.width, offscreen.height)
      const data = imgData.data

      let minX = offscreen.width, maxX = 0, minY = offscreen.height, maxY = 0
      for (let y = 0; y < offscreen.height; y++) {
        for (let x = 0; x < offscreen.width; x++) {
          const alpha = data[(y * offscreen.width + x) * 4 + 3]
          if (alpha > 128) {
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }

      if (maxX < minX) return

      const textWidth = maxX - minX + 1
      const textHeight = maxY - minY + 1

      const scaleFactor = (canvas.width * 0.8) / textWidth
      const pixelSize = scaleFactor 

      const startX = canvas.width - (textWidth * pixelSize) - (canvas.width * 0.05)
      const startY = (canvas.height - (textHeight * pixelSize)) / 2

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          const alpha = data[(y * offscreen.width + x) * 4 + 3]
          if (alpha > 128) {
            pixelsRef.current.push({
              x: startX + (x - minX) * pixelSize,
              y: startY + (y - minY) * pixelSize,
              size: pixelSize,
              hit: false
            })
          }
        }
      }

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
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
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

      // Draw meteor
      const ball = ballRef.current
      const TRAIL_LENGTH = 28

      // Record trail position
      trailRef.current.push({ x: ball.x, y: ball.y })
      if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.shift()

      // Draw fading tail
      for (let i = 0; i < trailRef.current.length; i++) {
        const t = i / trailRef.current.length           // 0 (oldest) → 1 (newest)
        const alpha = t * t * 0.7                       // quadratic fade
        const r = ball.radius * (0.2 + t * 0.7)        // grows toward head
        ctx.beginPath()
        ctx.arc(trailRef.current[i].x, trailRef.current[i].y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 196, 23, ${alpha})`
        ctx.fill()
      }

      // Glowing head
      const glow = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius * 2.2)
      glow.addColorStop(0, 'rgba(255, 255, 200, 1)')
      glow.addColorStop(0.3, 'rgba(212, 196, 23, 0.9)')
      glow.addColorStop(1, 'rgba(212, 196, 23, 0)')
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius * 2.2, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // Solid core
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      paddlesRef.current.forEach((paddle, index) => {
        if (activePaddleRef.current !== index) return
        ctx.fillStyle = PADDLE_COLOR
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })
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
