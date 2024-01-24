const dotenv = require('dotenv');
const app = require('./app');

// Configures environment variables, sets up the app, and starts listening on the specified port
dotenv.config({ path: './config.env' });


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
