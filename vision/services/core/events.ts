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

EventDispatcher.on(ElixirEvents.INIT_VARS, async (event: ElixirEvent) => {
  const { data } = event.getData()

  data.someVar = 'some var'
})
