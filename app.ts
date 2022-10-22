import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { GameController } from "./controller/game.controller";
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// import * as fs from 'fs';

class App {

    public express: express.Application;
    public logger: APILogger;
    public gameController: GameController;

    /* Swagger files start */
    // private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    // private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    // private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    // private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.gameController = new GameController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
    }

    private routes(): void {

        this.express.get('/api/games', (req, res) => {
            this.gameController.getGames().then(data => res.json(data));
        });
        
        this.express.post('/api/game', (req, res) => {
            console.log(req.body);
            this.gameController.createGame(req.body.game).then(data => res.json(data));
        });
        
        this.express.put('/api/game', (req, res) => {
            this.gameController.updateGame(req.body.game).then(data => res.json(data));
        });
        
        this.express.delete('/api/game/:id', (req, res) => {
            this.gameController.deleteGame(req.params.id).then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // swagger docs
        // this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;