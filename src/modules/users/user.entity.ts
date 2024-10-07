import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public lastName1: string;

  @Column()
  public lastName2: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt: Date;
}
