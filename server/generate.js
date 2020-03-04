//  Faker.js for automatically generating massive amounts of realistic fake data.

var faker = require('faker'); // import faker
var database = { products: []}; //an object with one empty array for products

//for loop to create 300 fake entries using faker methods like faker.commerce.productName() for generating product names
for (var i = 1; i<= 300; i++) 
{
  database.products.push
  ({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number()
  });
}

//converted the database object to a string and log it to standard output.
console.log(JSON.stringify(database));