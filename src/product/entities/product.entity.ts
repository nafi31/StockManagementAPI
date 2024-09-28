import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate,CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm';
import { ProductVariant } from 'src/productvariant/entities/productvariant.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  productMade: number;

  @Column({ type: 'int', default: 0 })
  productInStock: number;

  @CreateDateColumn({ type: 'datetime' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'datetime' })
  dateUpdated: Date;

  // Many products can have one variant (not an array)
  @ManyToOne(() => ProductVariant, variant => variant.products, { eager: true })
  variant: ProductVariant;  // This should be a single ProductVariant, not an array
}
