import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clientName: string;
}
