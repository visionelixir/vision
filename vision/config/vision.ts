import { VisionConfig, Environment, AppEnvironment } from '@visionelixir/elixir'
import * as path from 'path'

export const VISION_CONFIG: VisionConfig = {
  name: Environment.get('NAME') || 'Vision',

  host: 'localhost',
  port: Environment.get('PORT') || 3000,

  environment: AppEnvironment.DEVELOPMENT,

  debug: false,

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
