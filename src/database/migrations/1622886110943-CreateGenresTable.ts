import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGenresTable1622886110943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable( new Table(
        {
          name:'genres',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name:"title",
              type:'varchar'
            },
            {
              name:"description",
              type:'varchar'
            },
            {
              name:"game_id",
              type:'uuid'
            },
            {
              name:"created_at",
              type:'timestamp',
              default: "now()" 
            },
            { 
              name:"updated_at",
              type:'timestamp',
              default: "now()"        
            }
          ]
        }
      ))


      await queryRunner.createForeignKey('genres',new TableForeignKey({
        name: 'genresForeignKey',
        columnNames:["game_id"],
        referencedTableName: 'games',
        referencedColumnNames: ['id'],
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }))

    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropForeignKey('genres','genresForeignKey')
      await queryRunner.dropTable('genres')

    }

}
