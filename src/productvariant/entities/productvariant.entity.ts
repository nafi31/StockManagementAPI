import { OneToMany,Entity, Column, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate,CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    variantName: string;  // This will hold values like "color-16 count", "black-sis", etc.

    @OneToMany(() => Product, product => product.variant)
    products: Product[];
}