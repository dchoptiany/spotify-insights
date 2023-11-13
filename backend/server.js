const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './backend/config.env' });


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});