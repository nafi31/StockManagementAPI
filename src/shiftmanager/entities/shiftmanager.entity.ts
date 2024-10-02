import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Shiftmanager {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    shiftManager : string
}
