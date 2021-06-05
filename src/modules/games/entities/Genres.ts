
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Game } from './Game'

@Entity('genres')
class Genres{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @ManyToMany(() => Game, (game) => game.id)
  game_id: string


  @CreateDateColumn()
  created_at: Date


  @UpdateDateColumn()
  updated_at: Date

}

export {Genres}