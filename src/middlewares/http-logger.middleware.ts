import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware{
    constructor(private readonly logger:Logger){}
    use(req: Request, res: Response, next: NextFunction) {
        const {method,ip,originalUrl}=req;
        const userMachine=req.get('user-agent')??''
        const startTime=Date.now()
        res.on('finish',()=>{
            const {statusCode}=res;
            const duration=Date.now()-startTime
            const message=`${method} ${originalUrl} ${statusCode} - ${duration}ms | IP: ${ip} | Machine: ${userMachine}`;
            const name='Middleware'
            if(statusCode>=500){
                this.logger.error(message,name)

            }else if(statusCode>=400){
                this.logger.warn(message,name)

            }else{
                this.logger.log(message,name)

            }
        })

        next()
    }
}