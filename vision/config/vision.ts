import { VisionConfig, Environment } from '@visionelixir/elixir'
import * as path from 'path'

export const VISION_CONFIG: VisionConfig = {
  name: 'Vision',

  host: 'localhost',
  port: 3000,

  environment: Environment.DEVELOPMENT,

  debug: true,

  timezone: 'UTC',

  encryptionKey: '',

  baseDirectory: path.normalize(`${__dirname}/..`),

  configDirectory: 'config',

  services: {
    setupFile: 'Setup',
    routeFile: 'routes',
    eventFile: 'events',
    directory: 'services',
    require: ['core'],
  },
}
