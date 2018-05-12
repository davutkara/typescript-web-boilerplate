import {Request,Response,NextFunction} from 'express';


var indexController:any = [

    (req:Request,res:Response,next:NextFunction):void => {
        console.log("Middelware");
        next();
    },

    (req:Request,res:Response):void => {
       res.render("index.hbs");
    }
];

export = indexController;