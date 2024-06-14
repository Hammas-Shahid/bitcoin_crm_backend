import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Notes1718289628842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'notes',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'created_by',
                type: 'int',
                default: 1,
              },
              {
                name: 'updated_by',
                type: 'int',
                isNullable: true,
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: true,
              },
              {
                name: 'note',
                type: 'text',
              },
              {
                name: 'type',
                type: 'enum',
                enum: ['Call Note', 'Call Back Note', 'Sale Note', 'Lead Note'],
              },
            ],
          }),
          true,
        );
    
        await queryRunner.createForeignKey(
          'notes',
          new TableForeignKey({
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('notes');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('created_by') !== -1);
        await queryRunner.dropForeignKey('notes', foreignKey);
        await queryRunner.dropTable('notes');
      }

}
