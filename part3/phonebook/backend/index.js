const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(morgan(":method :url :body"));

const bodyTokenMiddleware = (request, response, next) => {
  morgan.token("body", (request) => JSON.stringify(request.body));
  next();
};

app.use(bodyTokenMiddleware);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  response.json(persons);
});

const generateId = () => {
  const maxValue = 1000;
  return Math.floor(Math.random() * maxValue);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const isPersonRegistered = persons.find((person) => person.name === body.name)
    ? true
    : false;

  if (isPersonRegistered) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId().toString(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.status(201).json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
