## Install and Run

- Use `yarn install`
- To run project on development server
  - Use `yarn dev`

## Build

- Use `yarn build`
- It will produce `dist` dir where all the code will be available for production

## Run db migration

### Update Config
- You have to update src/config/config.json file
- Update it according to your DB configuration

### Add new field to exiting table

- Add field into your exited table
- switch to src dir using `cd src`
- then create migrations for your table with `npx sequelize-cli create:migrations --name your-table-name`. It will create a migration file in your migrations folder or dir
- update your migration file and add the logic for table to add column i.e

  ```
     module.exports = {
       /**
       * @param {{ addColumn: (arg0: string, arg1: string, arg2: { type: any; allowNull: boolean; }) => any; }} queryInterface
       * @param {{ STRING: any; }} Sequelize
       */
       async up(queryInterface, Sequelize) {
         return Promise.all([
           queryInterface.addColumn("table-name", "new-field-name", {
             // field format like field type etc
           }),
         ]);
       },

       async down(queryInterface, Sequelize) {
         return await queryInterface.removeColumn("table-name", "column-name");
       },
     };
  ```

- Now run the migration using `npx sequelize-cli db:migrate`
