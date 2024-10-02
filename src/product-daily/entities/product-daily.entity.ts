import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Shiftmanager } from 'src/shiftmanager/entities/shiftmanager.entity';

@Entity()
export class ProductDaily {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;   

    @Column()
    amountDaily: number;   
    
    
    
    @ManyToOne(() => Shiftmanager, (manager) => manager.id)
    shiftManager: Shiftmanager;   

    
    @Column('datetime')
    date: Date;
}