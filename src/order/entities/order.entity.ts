import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Client } from 'src/client/entities/client.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client,{ cascade: true, onDelete: 'CASCADE' })
  client: Client; // This will store clientId as a foreign key

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => Product,{ cascade: true, onDelete: 'CASCADE' })
  product: Product; // This will store productId as a foreign key

  @Column({ type: 'int' })
  amountInBag: number;

  @Column({ type: 'float' })
  amountInKg: number;

  @Column({ type: 'float' })
  pricePerBag: number;

  @Column({ type: 'float' })
  priceInTotal: number;

  @Column({ type: 'text' })
  remark: string;

  @Column({ type: 'boolean', default: false })
  paid: boolean;
}