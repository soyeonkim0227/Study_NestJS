import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    @Column()
    createdAt: Date;

    @UpdateDateColumn()
    @Column()
    updatedAt: Date;
}