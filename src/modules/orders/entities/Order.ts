import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'


@Entity("orders")
class Order {


  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @Column()
  game_id: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}

export { Order} 