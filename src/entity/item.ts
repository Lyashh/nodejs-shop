import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {Category} from './category'

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column()
    price: number;

    @Column({nullable: true})
    email: string

    @ManyToOne(type => Category, category => category.items)
    category: Category;
}