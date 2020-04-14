import { Context, Middleware, ElixirError, ViewFacade as View } from '@visionelixir/elixir'
import { CoreRepository } from '../repositories/core'

export class CoreMiddleware {
  public static ctx(): Middleware {
    return async (ctx: Context): Promise<void> => {
      ctx.body = {
        ...ctx.vision,
        instance: 'vision instance'
      }
    }
  }

  public static response500(): Middleware {
    return async (): Promise<void> => {
      throw new ElixirError('Oh noes :(', 'I just blew my payload')
    }
  }

  public static info(): Middleware {
    return async (ctx: Context): Promise<void> => {
      ctx.body = { name: ctx.vision.name }
    }
  }

  public static databaseError(): Middleware {
    return async (ctx: Context): Promise<void> => {
      const result = await CoreRepository.find('chicken', 1)

      ctx.body = { result }
    }
  }

  public static databaseHit(): Middleware {
    return async (ctx: Context): Promise<void> => {
      const result = await CoreRepository.find('vision', 1)
      const result2 = await CoreRepository.find('elixir', 1)

      ctx.body = { result, result2 }
    }
  }

  public static response302(): Middleware {
    return async (ctx: Context): Promise<void> => {
      ctx.redirect('/')
    }
  }

  public static view(): Middleware {
    return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
      await next()

      const view = await View.render('welcome', {
        page: {
          name: 'VisionElixir',
          title: 'Welcome to VisionElixir',
        },
      })

      ctx.body = view
    }
  }
}
