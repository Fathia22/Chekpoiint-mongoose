const mongoose = require ('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});

// Connect to data base
//console.log(process.env.MONGO_URI);
mongoose.connect('mongodb://localhost:27017/person', {family:4},
{
   useNewUrlParser: "true",
   useUnifiedTopology: "true"
  })
  .then(() => console.log('Connected To MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err.message));

  //create a person
  const personSchema = new mongoose.Schema({
    name: {type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  //Model
  const Person = mongoose.model('person', personSchema);

  //To create and save a record of a model
  const person = new Person({
    name: 'John',
    age: 35,
    favoriteFoods: ['pizza', 'pasta']
  });
  
  person.save()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
  //create many contact
  const createPeople = async () => {
    const arrayOfPeople = [
      { name: 'Alice', age: 25, favoriteFoods: ['tacos', 'burgers'] },
      { name: 'Bob', age: 40, favoriteFoods: ['steak', 'pasta'] },
      { name: 'Charlie', age: 20, favoriteFoods: ['burritos', 'pizza'] }
    ];
    
    try {
      const data = await Person.create(arrayOfPeople);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  //To find all the people
  const findPersonName =async (name) =>{
    try {
      const person = await Person.find({name: 'John'});
      console.log(person);
    } catch (error) {
      console.error("Error", err.message);
    }
   }
  //To find just one person which has a certain food in the person's favorites

  const findPersonFood =async (favoriteFoods) =>{
    try {
      const person = await Person.findOne({ifavoriteFoods: 'pizza'});
      console.log(person);
    } catch (error) {
      console.error("Error", err.message);
    }
   }

 //To find the (only!!) person having a given _id
 const findPerson =async (id) =>{
  try {
    const person = await Person.findById({id})
    console.log(person);
  } catch (error) {
    console.error("Error", err.message);
  }
 }
  //To perform classic updates by running find,
  const update = async (id, favoriteFoods) => {
    try {

      const person = await Person.findById({ favoriteFoods: 'hamburger' }, { age: 20 }, { new: true });
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
  
  //To perform new updates on a document 
  const updatePerson = async (id, name) => {
    try {

      const person = await Person.findByIdAndUpdate({ name: 'John' }, { age: 20 }, { new: true });
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

  //To delete one document

  const personRemove = async (id, name) => {
    try {

      const person = await Person.findByIdAndRemove({ name: 'John' }, { age: 20 }, { new: true });
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
 