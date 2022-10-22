import { APILogger } from '../logger/api.logger';
import { GameService } from '../service/game.service';

export class GameController {

    private gameService: GameService;
    private logger: APILogger;

    constructor() {
        this.gameService = new GameService();
        this.logger = new APILogger()
    }

    async getGames() {
        this.logger.info('Controller: getGames', null)
        return await this.gameService.getGames();
    }

    async createGame(game) {
        this.logger.info('Controller: createGame', game);
        return await this.gameService.createGame(game);
    }

    async updateGame(game) {
        this.logger.info('Controller: updateGame', game);
        return await this.gameService.updateGame(game);
    }

    async deleteGame(gameId) {
        this.logger.info('Controller: deleteGame', gameId);
        return await this.gameService.deleteGame(gameId);
    }
}