import { table } from '#config/tables'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = table.VAULT()

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments('id')

      t.integer('user_id').unsigned().references(table.USER('id')).notNullable().onDelete('CASCADE')

      t.text('key').notNullable()

      t.integer('version').notNullable()

      t.integer('timeout').nullable()

      t.timestamp('created_at')
      t.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
