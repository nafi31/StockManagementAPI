import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate,CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar"})
  productName:string;

  @Column({ type: 'int', default: 0 })
  productInStock: number;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  dateUpdated: Date;
}
