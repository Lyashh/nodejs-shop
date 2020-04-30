import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("delivery")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("delivery").insert([
        { id: 1, title: "post" },
        { id: 2, title: "point of delivery" },
      ]);
    });
}
