import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("pots")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("pots").insert([
        { id: 1, title: "STONE" },
        { id: 2, title: "CHARCOAL" },
        { id: 3, title: "SLATE" },
        { id: 4, title: "MULTI" },
        { id: 5, title: "CLAY" },
        { id: 6, title: "INDIGO" },
        { id: 7, title: "ALABASTER" },
        { id: 8, title: "TERRACOTTA" },
        { id: 9, title: "BASALT" },
      ]);
    });
}
