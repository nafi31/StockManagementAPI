import { Client } from "src/client/entities/client.entity";
import { Product } from "src/product/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => Client, { cascade: true, onDelete: 'CASCADE' })
    client: Client;  // Renamed to client to hold the Client entity

    @ManyToOne(() => Product, { cascade: true, onDelete: 'CASCADE' })
    product: Product;  // Renamed to product to hold the Product entity

    @Column({ type: 'float' })
    amountInKg: number;

    @Column({ type: 'float' })
    pricePerItem: number;

    @Column({ type: 'float' })
    totalPrice: number;

    @Column({ type: 'text' })
    remark: string;
}
