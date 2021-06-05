import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrder1622887962169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(new Table(
        {
          name: "orders",
          columns: [

            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name: 'user_id',
              type: 'uuid'
            },
            {
              name: 'game_id',
              type: 'uuid'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }

          ]
        }
      ))

      await queryRunner.createForeignKeys('orders', [
        new TableForeignKey({
          name: 'userForeignKey',
          columnNames:["user_id"],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: "SET NULL",
          onUpdate: "CASCADE"

        }),
        new TableForeignKey({
          name: 'gameForeignKey',
          columnNames:["game_id"],
          referencedColumnNames: ['id'],
          referencedTableName: 'games',
          onDelete: "SET NULL",
          onUpdate: "CASCADE"

        })
      ])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {


      await queryRunner.dropForeignKey('orders', 'gameForeignKey')
      await queryRunner.dropForeignKey('orders', 'userForeignKey')

      await queryRunner.dropTable('orders')

    }

}
