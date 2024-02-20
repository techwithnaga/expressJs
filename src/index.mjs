import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "Naga", lastName: "Wijaya" },
  { id: 2, username: "bob", lastName: "Idris" },
  { id: 3, username: "Jun", lastName: "Teh" },
];

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello world!" });
});

app.get("/api/users", (req, res) => {
  const {
    query: { filterVar, value },
  } = req;

  if (filterVar && value) {
    return res.send(
      mockUsers.filter((user) => user[filterVar].includes(value))
    );
  }
  return res.status(200).send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).send({ msg: "Bad Request. Invalid ID" });
  }
  const findUser = mockUsers.find((user) => user.id === userId);
  if (!findUser) {
    return res.sendStatus(404);
  }

  return res.send(findUser);
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  return res.status(201).send(mockUsers);
});

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const idx = mockUsers.findIndex((user) => user.id === parseId);
  if (idx === -1) {
    return res.sendStatus(404);
  }

  mockUsers[idx] = { id: parseId, ...body };
  return res.status(200).send(mockUsers);
});

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  console.log(parseId);
  if (isNaN(parseId)) return res.sendStatus(400);
  const idx = mockUsers.findIndex((user) => user.id === parseId);
  if (idx === -1) {
    return res.sendStatus(404);
  }
  mockUsers[idx] = { ...mockUsers[idx], ...body };
  return res.status(200).send(mockUsers);
});

app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    res.sendStatus(400);
  }
  const idx = mockUsers.findIndex((user) => user.id === parseId);
  if (idx === -1) {
    return res.sendStatus(404);
  }

  mockUsers.splice(idx);
  return res.status(200).send(mockUsers);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
