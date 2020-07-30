import {
  ElixirContainer,
  ElixirEvent,
  ElixirEvents,
} from '@visionelixir/elixir/dist'
import { apiErrorHandler } from '../helpers/errorHandler'

/**
 * Mocks
 */
jest.mock(
  '../helpers/errorHandler',
  jest.fn(() => ({
    apiErrorHandler: jest.fn(),
  })),
)

const MockEvent = {
  getData: () => ({
    status: 500,
    ctx: {},
    error: new Error(),
  }),
} as ElixirEvent

const events: string[] = []
const callbacks: { (event: ElixirEvent): void }[] = []

const EventDispatcherMock = {
  on: jest.fn((event, callback) => {
    events.push(event)
    callbacks.push(callback)
  }),
}

const container = new ElixirContainer()
container.singleton('EventDispatcher', EventDispatcherMock)

beforeEach(jest.clearAllMocks)

/**
 * Tests
 */

describe('Core : Events', () => {
  it('listens to two events', async () => {
    require('../events')

    expect(events).toHaveLength(1)
    expect(EventDispatcherMock.on).toBeCalledTimes(1)
  })

  it('handles the response error event', () => {
    if (!events.length) {
      require('../events')
    }

    expect(events[0]).toEqual(ElixirEvents.RESPONSE_ERROR)

    callbacks[0](MockEvent)

    expect(apiErrorHandler).toBeCalledTimes(1)
  })
})
