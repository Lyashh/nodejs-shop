import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    return knex("users").del()
        .then(() => {
            let users: Array<Object> = []
            for(let i = 0; i <= 20 ; i++) {
                let role_id = 1
                if(i%5 == 0) {
                    role_id = 2
                }
                users.push({
                    registration_id: 1,
                    email: `user_${i}@gmail.com`,
                    name: `name_${i}`,
                    password: `$2b$10$e5Vfof6l7jNC9tx8dIviuOJbFBje4XFj2bdISE0yWUvEvb6CFxD.e`,
                    role_id
                })
            }
            return knex("users").insert(users);
        });
};
