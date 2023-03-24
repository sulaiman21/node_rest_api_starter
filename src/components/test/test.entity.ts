import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";

class TestEntity extends Model<InferAttributes<TestEntity>, InferCreationAttributes<TestEntity>> {
	declare id: CreationOptional<number>;
	declare name: CreationOptional<string>;
	declare content: CreationOptional<string>;

	// For foregin key
	// declare otherTableId: ForeignKey<otherTableName[<column name in string>]

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

export const testEntity = (sequelize: Sequelize) => {
	const testModel = TestEntity.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE,
		},
		{
			createdAt: "created_at",
			updatedAt: "updated_at",
			modelName: "test",
			sequelize,
		}
	);

	return testModel.sequelize.model("test");
};
