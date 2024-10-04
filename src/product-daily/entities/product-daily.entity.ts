import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Shiftmanager } from 'src/shiftmanager/entities/shiftmanager.entity';

@Entity()
export class ProductDaily {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Product, (product) => product.id,{ cascade: true, onDelete: 'CASCADE' })
    product: Product;   

    @Column()
    amountDaily: number;   
    
    
    
    @ManyToOne(() => Shiftmanager, (manager) => manager.id,{ cascade: true, onDelete: 'CASCADE' })
    shiftManager: Shiftmanager;   

    
    @Column({type:'datetime'})
    date: Date;
}