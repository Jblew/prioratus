import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

export function initDatabase() {
  createConnection()
    .then(async (connection) => {
      console.log("Inserting a new user into the database...");
      const user = new User();
      user.firstName = "Timber";
      user.lastName = "Saw";
      user.age = 25;
      await connection.manager.save(user);
      console.log("Saved a new user with id: " + user.id);

      console.log("Loading users from the database...");
      const users = await connection.manager.find(User);
      console.log("Loaded users: ", users);
    })
    .catch((error) => console.log(error));

  setTimeout(() => initDatabase(), 30 * 60 * 1000);
}
