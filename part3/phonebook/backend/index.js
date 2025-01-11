require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const bodyTokenMiddleware = (request, response, next) => {
  morgan.token("body", (request) => JSON.stringify(request.body));
  next();
};
app.use(bodyTokenMiddleware);
app.use(morgan(":method :url :body"));

app.get("/info", (request, response) => {
  const personsLength = persons.length;

  response.set("Content-Type", "text/html");
  response.send(
    Buffer.from(`<p>
    Phonebook has info for ${personsLength} people<br />
    ${new Date()}
    </p>`)
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.find({ _id: id })
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const personName = request.body.name;
  const personNumber = request.body.number;

  if (!personName || !personNumber) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then((savedPerson) => {
    console.log(
      `added ${savedPerson.name} number ${savedPerson.number} to phonebook`
    );
    response.status(201).json(person);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const personNewNumber = request.body.number;

  Person.findOneAndUpdate(
    { _id: id },
    { $set: { number: personNewNumber } },
    { returnDocument: "after" }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.deleteOne({ _id: id })
    .then(({ acknowledged }) => {
      if (acknowledged) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformattted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
