import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto'
import routesMapPoint from '../routes/mapPoint';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConndect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API working'
            })
        })
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/mapPoints', routesMapPoint);
    }

    midlewares() {

        this.app.use(express.json())

        //cors
        this.app.use(cors());
    }

    async dbConndect() {

        try {
            await db.authenticate()
            console.log('Base de datos conectada.')
        } catch (error) {
            console.log(error)
            console.log('Error al concetarse a la base de datos.')
        }

    }

}

export default Server;