import * as express from 'express';
import * as hbs from "hbs";
import * as bodyParser from "body-parser";
import {router} from "./router";

module webServerModule{
    export class webServer{

        public app: express.Application = express();
        public port: any = process.env.PORT || 3000;
        public appRouter:router;
        constructor(){
            // SET HBS CONF.
            this.app.set("wiev engine","hbs");
            this.app.use(express.static(__dirname+"/../public"));
            this.app.set("views",__dirname+"/../views");
            this.app.use(bodyParser.json());
            hbs.registerPartials(__dirname+"/../views/partials");
        }
        listenServer():webServer{
            console.log("Server listening: ");
            try{
                this.app.listen(this.port, () => {
                    console.log(`http://localhost:${this.port}/`);               
                });
            }catch(e){
                console.log(e);
                process.exit();
            }
            return this;
        }

        startRouter():webServer{
            console.log("Router starting..");
            try{
                this.appRouter = new router(this.app);
                this.appRouter.mainRouter();
            }catch(e){
                console.log(e);
                process.exit();
            }
            return this;
        }
        
    }
}

export = webServerModule;