import winston from "winston";
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
     new winston.transports.File({ filename: 'errorlog.txt'}),
    ],
  });

export default async (err,req, res, next) => {
    console.log("this is a error logge")
    let data = err.message;
    const meta = {
        user_id: req.user.user_id,
        requestUrl : req.url,
        statusCode : err.code
    };
    await logger.info({ message: data, ...meta })
    next();
}