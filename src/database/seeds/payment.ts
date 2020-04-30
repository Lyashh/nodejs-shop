import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("payment")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("payment").insert([
        { id: 1, title: "cart" },
        { id: 2, title: "cash" },
      ]);
    });
}
