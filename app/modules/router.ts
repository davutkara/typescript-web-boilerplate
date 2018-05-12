import {Application,Request,Response} from 'express';
import * as indexController from '../controllers/index.controller';
module RouterModule{

    export class router{
        private app:Application;
        constructor(app:Application){
            this.app = app;
        }        
        mainRouter(){
            this.app.get('/', indexController);
            this.app.get('/davut', (req: Request, res: Response) => {
                res.send('Hello, Davut!');
            });
        }
    }

}

export = RouterModule;
