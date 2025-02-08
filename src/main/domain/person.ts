import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Person {
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number

    @Column({ name: "name" })
    name!: string

    @Column({ name: "address" })
    address!: string

    @Column({ name: "is_married" })
    isMarried!: boolean
}