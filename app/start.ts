import {webServer} from "./modules/webserver";

let MyServer:webServer = new webServer();
MyServer.listenServer()
        .startRouter();