import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Title: string

    @Column()
    Description: string

    @Column()
    Body: string

    @Column()
    User_id: number

}
