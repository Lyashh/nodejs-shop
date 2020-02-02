import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Item} from './item'

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @OneToMany(type => Item, item => item.category)
    items: Item[]
}