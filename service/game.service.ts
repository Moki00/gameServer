import { GameRepository } from '../repository/game.repository';

export class GameService {

    private gameRepository: GameRepository;

    constructor() {
        this.gameRepository = new GameRepository();
    }

    async getGames() {
        return await this.gameRepository.getGames();
    }

    async createGame(game) {
        return await this.gameRepository.createGame(game);
    }

    async updateGame(game) {
        return await this.gameRepository.updateGame(game);
    }

    async deleteGame(gameId) {
        return await this.gameRepository.deleteGame(gameId);
    }

}