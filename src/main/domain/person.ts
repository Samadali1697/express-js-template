import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Person {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    address!: string

    @Column()
    isMarried!: boolean
}