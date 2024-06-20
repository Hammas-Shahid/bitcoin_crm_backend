import { Disposition } from "src/dispositions/entities/disposition.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PredefinedDispositions1718834495708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const dispositionsRepository = queryRunner.manager.getRepository(Disposition);
    let newDispositions = [];
    for (let disposition of ['Sale Made']) {
      newDispositions.push(createDispositionInstance(disposition));
    }
    await dispositionsRepository.save(newDispositions);
    function createDispositionInstance(name: string) {
      let newDisposition = new Disposition();
      newDisposition.name = name;
      return newDisposition;
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
