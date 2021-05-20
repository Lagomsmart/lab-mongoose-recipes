const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://admin123:admin123@cluster0.gpmgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    return Recipe.create({
      title: "spaghetti",
      level: "Easy Peasy",
      ingredients: ["sauce", "pasta", "salt"],
      dishType: "main_course",
      duration: 13,
      creator: "Jesper",
      cuisine: "Italian",
    }).then(() => {
      return Recipe.insertMany(data);
    });
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then((res) => console.log(res));
  })

  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" }).then((res) => console.log(res));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

