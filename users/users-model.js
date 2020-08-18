const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users")
    .join("roles", "users.role", "roles.id")
    .where(filter)
    .select(
      "users.id",
      "users.username",
      "users.password",
      "roles.name as role",
    )
    .orderBy("users.id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}
