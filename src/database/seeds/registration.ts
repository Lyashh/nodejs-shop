import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("registration")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("registration").insert([
        { id: 1, title: "local" },
        { id: 2, title: "google" },
      ]);
    });
}
