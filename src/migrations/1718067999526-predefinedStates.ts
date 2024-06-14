import { State } from 'src/states/entities/state.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PredefinedStates1718067999526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statesRepository = queryRunner.manager.getRepository(State);
    let newStates = [];
    for (let state of ['New', 'In Progress', 'On Hold', 'Converted', 'Closed']) {
      newStates.push(createStateInstance(state));
    }
    await statesRepository.save(newStates);
    function createStateInstance(name: string) {
      let newState = new State();
      newState.name = name;
      return newState;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
