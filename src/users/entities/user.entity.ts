import { PrimaryGeneratedColumn,Column,Entity ,BeforeInsert} from "typeorm";
import * as bcrypt from "bcryptjs";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'int'})
    phoneNumber: number;

    @Column()
    role:string

    @Column()
    password:string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10);
    }

}
