
module.exports = {
    name: "default",
    type: "postgres",
    url: "postgres://postgres:813621az@localhost:5432/typeorm",
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: [`./src/database/entity/**/*.${process.env.ORM_FORMAT}`],
    migrations: [`./src/database/migrations/**/*.${process.env.ORM_FORMAT}`],
    subscribers: [`./src/database/subscriber/**/*.${process.env.ORM_FORMAT}`],
    cli: {
        entitiesDir: "./src/database/entity",
        migrationsDir: "./src/database/migrations",
        subscribersDir: "./src/database/subscriber"
    }
 };