import { getRepository, ILike, Like, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games").where(`LOWER(games.title) ILIKE '%${param.toLowerCase()}%'`).getMany()
       // Complete usando query builder.
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(
      `
      SELECT 
        COUNT(*)
      FROM users
      `
    ); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {


    const game = await this.repository
      .createQueryBuilder("game")
      .innerJoinAndSelect("game.users", 'user')
      .where("game.id = :id", {id})
      .getOneOrFail()
      return game.users


    // Outro jeito de fazer 
    
    // return this.repository
    //   .createQueryBuilder()
    //   .relation(Game, 'users')
    //   .of(id)
    //   .loadMany()
      
      // Complete usando query builder
  }
}
