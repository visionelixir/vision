import { KeyValue, DatabaseManagerFacade as DatabaseManager } from '@visionelixir/elixir'

export class CoreRepository {
  public static all = async (table: string, db?: string): Promise<KeyValue[]> => {
    const query = `
      SELECT *
      FROM ${table}
      ORDER BY id`

    const result = await DatabaseManager.get(db).query(query)

    return result
  }

  public static find = async (
    table: string,
    id: string | number,
    db?: string,
  ): Promise<KeyValue | null> => {
    const query = `
      SELECT *
      FROM ${table}
        WHERE id = $1
    `

    const result = await DatabaseManager.get(db).queryOne(query, [id])

    return result
  }
}
