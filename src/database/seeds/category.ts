import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("category").del()
        .then(() => {
            // Inserts seed entries
            return knex("category").insert([
                { id: 1, title: "Outdoor" },
                { id: 2, title: "Indoor" },
                { id: 3, title: "Artist Currated" },
                { id: 4, title: "Flowering" },
            ]);
        });
};
