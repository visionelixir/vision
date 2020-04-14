import { EventDispatcherFacade as EventDispatcher, ElixirEvents, ElixirEvent, VisionFacade as Vision } from '@visionelixir/elixir'

EventDispatcher.on(ElixirEvents.RESPONSE_ERROR, async (event: ElixirEvent) => {
  const { status, ctx, error } = event.getData()

  if (status === 500) {
    if (Vision.getConfig().debug) {
      ctx.body = { error: error }
    } else {
      ctx.body = { error: 'Oh noes, that\'s a 500 :(' }
    }
  }

  if (status === 404) {
    ctx.body = { error: 'Oh noes, that\'s a 404 :(' }
  }
})

EventDispatcher.on(ElixirEvents.INIT_VARS, async (event: ElixirEvent) => {
  const { data } = event.getData()

  data.someVar = 'some var'
})
