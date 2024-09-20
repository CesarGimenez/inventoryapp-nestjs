import { UserTypeEnum } from "../../../../types/enums";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text', { unique: true, nullable: false })
    email: string

    @Column('text')
    password: string

    @Column('text', { nullable: true })
    name: string

    @Column('text', { nullable: true })
    username: string

    @Column({
        type: "enum",
        enum: UserTypeEnum,
        default: UserTypeEnum.NORMAL,
    })
    type: UserTypeEnum

    @Column('boolean', { default: true })
    active: boolean

    @BeforeInsert()
    @BeforeUpdate()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
        this.username = this.username.toLowerCase().trim();
        this.name = this.name.trim();
    }
}

