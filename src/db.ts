import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

export async function initDatabase() {
  const connection = await createConnection();

  async function testDatabase() {
    try {
      console.log("[test-database] Inserting a new user into the database...");
      const user = new User();
      user.firstName = "Timber";
      user.lastName = "Saw";
      user.age = 25;
      await connection.manager.save(user);
      console.log("[test-database] Saved a new user with id: " + user.id);

      console.log("[test-database] Loading users from the database...");
      const users = await connection.manager.find(User);
      console.log("[test-database] Loaded users: ", users);
    } catch (err) {
      console.error("[test-database] Test failed: ", err);
    }

    setTimeout(() => testDatabase(), 30 * 60 * 1000);
  }

  await testDatabase();
}
