import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex("users").insert([
                { id: 1, registration_id: "1", email: "user1@gmail.com", name: "name1", password: "$2b$10$e5Vfof6l7jNC9tx8dIviuOJbFBje4XFj2bdISE0yWUvEvb6CFxD.e" },
                { id: 2, registration_id: "1", email: "user2@gmail.com", name: "name2", password: "$2b$10$e5Vfof6l7jNC9tx8dIviuOJbFBje4XFj2bdISE0yWUvEvb6CFxD.e" },
                { id: 3, registration_id: "1", email: "admin@gmail.com", name: "name_admin1", password: "$2b$10$e5Vfof6l7jNC9tx8dIviuOJbFBje4XFj2bdISE0yWUvEvb6CFxD.e", role_id: 2 }
            ]);
        });
};
