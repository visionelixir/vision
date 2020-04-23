import * as app from './index'

/**
 * Jest
 */

beforeEach(jest.clearAllMocks)

/**
 * Tests
 */

describe('index', () => {
  it('should serve an app', () => {
    // eslint-disable-next-line no-console
    console.log(app)
  })
})
