import { Sequelize } from "sequelize";
import { testEntity } from "../components/test/test.entity";

const models = (sequelize: Sequelize) => {
	const _testEntity = testEntity(sequelize);

	// Create Associations here
	// _testEntity.hasMany(<model name>, { foreignKey: 'id' })

	return {
		TestEntity: _testEntity,
	};
};

export default models;
