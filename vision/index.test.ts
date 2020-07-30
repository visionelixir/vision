const up = jest.fn()

jest.mock('./config/vision', () => ({}))

afterEach(jest.clearAllMocks)

jest.mock('@visionelixir/elixir', () => ({
  Vision: jest.fn(() => ({
    up,
  })),
}))

import { app } from './index'

/**
 * Tests
 */

describe('index', () => {
  it('should create an app and call up', async () => {
    await app

    expect(up).toBeCalledTimes(1)
  })
})
