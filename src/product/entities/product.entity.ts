import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    
    id : number;

    @Column({type:'varchar',length:'400'})
    productName: string;

    @Column({type:'int'})
    productInStock: number;

}
