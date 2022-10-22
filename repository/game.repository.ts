import { connect, disconnect } from "../config/db.config";
import { GameModel } from '../model/game.model';
import { APILogger } from '../logger/api.logger';

export class GameRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getGames() {
        const games = await GameModel.find({});
        console.log('games:::', games);
        return games;
    }

    async createGame(game) {
        let data = {};
        try {
            data = await GameModel.create(game);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateGame(game) {
        let data = {};
        try {
            data = await GameModel.updateOne(game);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteGame(gameId) {
        let data: any = {};
        try {
            data = await GameModel.deleteOne({_id : gameId});
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
}