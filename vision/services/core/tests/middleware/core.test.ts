import { CoreMiddleware } from '../../middleware/core'
import { Context, Next } from 'koa'
import { ElixirContainer, ViewFacade } from '@visionelixir/elixir'

/**
 * Mocks
 */

const mock = {
  render: jest.fn(() => 'some view'),
}

const container = new ElixirContainer()
container.singleton('View', mock)

beforeEach(jest.clearAllMocks)

/**
 * Tests
 */

describe('Core : Middleware : Core', () => {
  describe('home', () => {
    it('renders the view', async () => {
      const ctx = ({
        vision: {
          name: 'some name',
        },
      } as unknown) as Context

      await CoreMiddleware.view()(ctx, jest.fn() as Next)

      expect(ViewFacade.render).toBeCalledTimes(1)
      expect(ctx.body).toEqual('some view')
    })
  })
})
