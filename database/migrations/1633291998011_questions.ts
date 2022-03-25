import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('yes').defaultTo(0)
      table.integer('no').defaultTo(0)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
