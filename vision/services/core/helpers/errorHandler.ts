import {
  ViewFacade as View,
  VisionFacade as Vision,
  KeyValue,
  ElixirError,
} from '@visionelixir/elixir'

export const websiteErrorHandler = async (
  statusCode: number,
  _error: Error,
  ctx: KeyValue,
): Promise<void> => {
  switch (statusCode) {
    case 500:
      ctx.body = await View.render('500', {
        page: { title: 'Uh oh...', name: 'Something went wrong...' },
      })
      break
    case 404:
      ctx.body = await View.render('404', {
        page: { title: 'Uh oh...', name: 'That page was not found...' },
      })
      break
    default:
      ctx.body = await View.render('error', {
        page: { title: 'Uh oh...', name: 'Something went wrong...' },
      })
  }
}

export const apiErrorHandler = (
  statusCode: number,
  error: ElixirError,
  ctx: KeyValue,
): void => {
  ctx.status = statusCode

  switch (statusCode) {
    case 500:
      if (Vision.getConfig().debug) {
        const { name, type, message, payload, stack } = error

        ctx.body = {
          name,
          type,
          message,
          payload,
          stack,
        }
      } else {
        ctx.body = { error: "Oh noes, that's a 500 :(" }
      }
      break
    case 404:
      if (!ctx.body) {
        ctx.body = { error: "Oh noes, that's a 404 :(" }
      }
      break
    default:
      if (!ctx.body) {
        if (Vision.getConfig().debug && error) {
          const { name, type, message, payload, stack } = error

          ctx.body = {
            name,
            type,
            message,
            payload,
            stack,
          }
        } else {
          ctx.body = { error: "Oh noes, that's an error :(" }
        }
      }
  }
}
