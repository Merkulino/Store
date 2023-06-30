const app = require('./app');
const { seedDatabase } = require('./models/databaseODM');
const connectDB = require('./models/db.connection');

connectDB.then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Escutando na porta ${process.env.PORT || 3001}`);
  });
  seedDatabase();
}).catch((error) => {
  console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
});
