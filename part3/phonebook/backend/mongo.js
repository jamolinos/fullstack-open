const mongoose = require("mongoose");

if (process.argv.length < 3) {
  if (process.argv[2] === undefined) {
    console.log("give password as argument");
    process.exit(1);
  }
}

const password = process.env.PASSWORD || process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://javiermolinosv:${password}@sa-cluster.3wrmp.mongodb.net/contacts-db?retryWrites=true&w=majority&appName=sa-cluster`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (personName === undefined) {
  Person.find({}).then((result) => {
    result.forEach(({ name, number }) => {
      console.log(name, number);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then(({ name, number }) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
