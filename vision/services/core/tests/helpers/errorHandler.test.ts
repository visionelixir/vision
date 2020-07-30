import {
  Context,
  ElixirContainer,
  ElixirError,
} from '@visionelixir/elixir/dist'
import {
  apiErrorHandler,
  websiteErrorHandler,
} from '../../helpers/errorHandler'

/**
 * Mocks
 */

const VisionMock = {
  getConfig: jest.fn(),
}

const ViewMock = {
  render: jest.fn((status) => {
    switch (status) {
      case '500':
        return '500'
      case '404':
        return '404'
      default:
        return 'unknown'
    }
  }),
}

const container = new ElixirContainer()
container.singleton('Vision', VisionMock)
container.singleton('View', ViewMock)

beforeEach(jest.resetAllMocks)

/**
 * Tests
 */

describe('Core : Helpers : errorHandler', () => {
  describe('apiErrorHandler', () => {
    it('handles 500 errors', () => {
      const ctx = ({} as unknown) as Context

      VisionMock.getConfig.mockImplementationOnce(() => ({
        debug: false,
      }))

      apiErrorHandler(500, new ElixirError('Oh no'), ctx)

      expect(VisionMock.getConfig).toBeCalledTimes(1)
      expect(ctx.status).toEqual(500)
      expect(ctx.body).toMatchObject({
        error: "Oh noes, that's a 500 :(",
      })
    })

    it('handles 500 errors in debug', () => {
      const error = new ElixirError('Oh no')
      const ctx = ({} as unknown) as Context

      VisionMock.getConfig.mockImplementationOnce(() => ({
        debug: true,
      }))

      apiErrorHandler(500, error, ctx)

      expect(VisionMock.getConfig).toBeCalledTimes(1)
      expect(ctx.status).toEqual(500)
      expect(ctx.body).toMatchObject({
        message: error.message,
        name: error.name,
        type: error.type,
        payload: error.payload,
        stack: error.stack,
      })
    })

    it('handles 404 errors', () => {
      const ctx = ({} as unknown) as Context

      apiErrorHandler(404, new ElixirError('Not found'), ctx)

      expect(ctx.status).toEqual(404)
      expect(ctx.body).toMatchObject({
        error: "Oh noes, that's a 404 :(",
      })
    })

    it('handles 404 errors with body', () => {
      const ctx = ({
        body: { error: 'unknown route' },
      } as unknown) as Context

      apiErrorHandler(404, new ElixirError('Not found'), ctx)

      expect(ctx.status).toEqual(404)
      expect(ctx.body).toMatchObject({
        error: 'unknown route',
      })
    })

    it('handles unknown errors', () => {
      const ctx = ({} as unknown) as Context

      VisionMock.getConfig.mockImplementationOnce(() => ({
        debug: false,
      }))

      apiErrorHandler(406, new ElixirError('Not found'), ctx)

      expect(ctx.status).toEqual(406)
      expect(ctx.body).toMatchObject({
        error: "Oh noes, that's an error :(",
      })
    })

    it('handles unknown errors with body', () => {
      const ctx = ({
        body: { error: 'unknown' },
      } as unknown) as Context

      VisionMock.getConfig.mockImplementationOnce(() => ({
        debug: false,
      }))

      apiErrorHandler(406, new ElixirError('Not found'), ctx)

      expect(ctx.status).toEqual(406)
      expect(ctx.body).toMatchObject({
        error: 'unknown',
      })
    })

    it('handles unknown errors in debug', () => {
      const ctx = ({} as unknown) as Context
      const error = new ElixirError('Not found')

      VisionMock.getConfig.mockImplementationOnce(() => ({
        debug: true,
      }))

      apiErrorHandler(406, error, ctx)

      expect(ctx.status).toEqual(406)
      expect(ctx.body).toMatchObject({
        message: error.message,
        name: error.name,
        type: error.type,
        payload: error.payload,
        stack: error.stack,
      })
    })
  })

  describe('websiteErrorHandler', () => {
    it('handles 500 errors', async () => {
      const ctx = {} as Context
      await websiteErrorHandler(500, new ElixirError('Oh no'), ctx)

      expect(ViewMock.render).toBeCalledTimes(1)
      expect(ctx.body).toEqual('500')
    })

    it('handles 404 errors', async () => {
      const ctx = {} as Context
      await websiteErrorHandler(404, new ElixirError('Oh no'), ctx)

      expect(ViewMock.render).toBeCalledTimes(1)
      expect(ctx.body).toEqual('404')
    })

    it('handles unknown errors', async () => {
      const ctx = {} as Context
      await websiteErrorHandler(406, new ElixirError('Oh no'), ctx)

      expect(ViewMock.render).toBeCalledTimes(1)
      expect(ctx.body).toEqual('unknown')
    })
  })
})
