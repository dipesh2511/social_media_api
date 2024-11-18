import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
     new winston.transports.File({ filename: 'requestlog.txt'}),
    ],
  });
  
export default async(err,req,res,next)=>{
    let data = err;
    const meta = {
        user_id: req.user.user_id,
        requestUrl : req.url
    };
    await logger.info({ message: data, ...meta })
    next();
}