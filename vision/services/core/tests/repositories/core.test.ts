import { ElixirContainer } from '@visionelixir/elixir/dist'
import { CoreRepository } from '../../repositories/core'

/**
 * Mocks
 */

const queryOne = jest.fn()
const query = jest.fn()
const mock = {
  get: jest.fn(() => ({
    queryOne,
    query,
  })),
}

const container = new ElixirContainer()
container.singleton('DatabaseManager', mock)

beforeEach(jest.clearAllMocks)

/**
 * Tests
 */

describe('Core : Repository : Core', () => {
  describe('all', () => {
    it('it can query all from a table', async () => {
      query.mockImplementationOnce(() => 'all')
      const result = await CoreRepository.all('table')

      expect(query).toBeCalledTimes(1)
      expect(result).toEqual('all')
    })
  })

  describe('find', () => {
    it('can find an item by id', async () => {
      queryOne.mockImplementationOnce(() => 'one')

      const result = await CoreRepository.find('table', 'id')

      expect(queryOne).toBeCalledTimes(1)
      expect(result).toEqual('one')
    })
  })
})
