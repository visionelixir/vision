import { Vision } from '@visionelixir/elixir'
import { VISION_CONFIG } from './config/vision'
;(async (): Promise<void> => {
  const vision = await new Vision(VISION_CONFIG)
  await vision.up()
})()
