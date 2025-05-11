import { config } from 'dotenv';
import { readFileSync } from 'fs';
import connectDB from '../../../db/db.js';
import ProductModel from '../../../db/models/product.model.js';

config({ path: '../../../config/config.env' });

// connect to DB
connectDB();

// Read data
const products = JSON.parse(readFileSync('./products.json'));


// Insert data into DB
const insertData = async () => {
  try {
    await ProductModel.create(products);

    console.log('Data Inserted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
//   0    1        2
// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
