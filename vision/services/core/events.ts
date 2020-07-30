import {
  EventDispatcherFacade as EventDispatcher,
  ElixirEvents,
  ElixirEvent,
} from '@visionelixir/elixir'
import { apiErrorHandler } from './helpers/errorHandler'

EventDispatcher.on(ElixirEvents.RESPONSE_ERROR, async (event: ElixirEvent) => {
  const { status, ctx, error } = event.getData()

  await apiErrorHandler(status, error, ctx)
})
