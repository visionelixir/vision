import { Vision } from '@visionelixir/elixir'
import { VISION_CONFIG } from './config/vision'

let app: Vision
;(async (): Promise<void> => {
  const vision = new Vision(VISION_CONFIG)
  app = vision

  await vision.up()
})()

export { app }
