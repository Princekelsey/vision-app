import { IsEmail, Length, MinLength } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Length(1, 255)
  firstName: string;

  @Column({ nullable: false })
  @Length(1, 255)
  lastName: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ nullable: false, select: false })
  @MinLength(6)
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public static mockUser(): User {
    const user = new User();

    user.id = 1;
    user.email = "test@email.com";
    user.firstName = "testFirstname";
    user.lastName = "testLastName";
    user.password = "testPassword";

    return user;
  }
}
