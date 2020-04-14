import { RouterFacade as Router } from '@visionelixir/elixir'
import { CoreMiddleware } from './middleware/core'

Router.get('', [CoreMiddleware.view()])
Router.get('302', [CoreMiddleware.response302()])
Router.get('info', [CoreMiddleware.info()])
Router.get('db-hit', [CoreMiddleware.databaseHit()])
Router.get('db-error', [CoreMiddleware.databaseError()])
Router.get('500', [CoreMiddleware.response500()])
Router.get('ctx', [CoreMiddleware.ctx()])
