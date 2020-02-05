import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column()
    age: number;

    @Column({nullable: true})
    email: string
}

export interface UserInterface{
    id: number
    name: string
    age: number
    email: string
}