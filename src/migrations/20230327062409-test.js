// @ts-nocheck
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * @param {{ addColumn: (arg0: string, arg1: string, arg2: { type: any; allowNull: boolean; }) => any; }} queryInterface
	 * @param {{ STRING: any; }} Sequelize
	 */
	async up(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn("tests", "seat", {
				type: Sequelize.STRING,
				allowNull: true,
			}),
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.removeColumn("tests", "seat");
	},
};
