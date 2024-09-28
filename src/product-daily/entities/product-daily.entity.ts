import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
//import { ShiftManager } from './shift-manager.entity';

@Entity()
export class ProductDaily {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;   

    @Column()
    amountDaily: number;   
    
    
    @Column()
    totalInStock: number; 
    
    
    //    @ManyToOne(() => ShiftManager, (manager) => manager.id)
    //    shiftManager: ShiftManager;  

    
    @Column('real')
    date: number;
}