import {
  ViewFacade as View,
  VisionFacade as Vision,
  KeyValue,
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

export const apiErrorHandler = async (
  statusCode: number,
  error: Error,
  ctx: KeyValue,
): Promise<void> => {
  if (statusCode === 500) {
    if (Vision.getConfig().debug) {
      ctx.body = { error: error }
    } else {
      ctx.body = { error: "Oh noes, that's a 500 :(" }
    }
  }

  if (statusCode === 404) {
    ctx.body = { error: "Oh noes, that's a 404 :(" }
  }
}
