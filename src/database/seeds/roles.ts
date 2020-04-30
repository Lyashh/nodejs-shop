import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("roles").insert([
        { id: 1, title: "user" },
        { id: 2, title: "admin" },
      ]);
    });
}
