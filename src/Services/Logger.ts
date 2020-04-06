import winston from "winston";
import ElasticsearchTransport, {LogData} from "winston-elasticsearch"
import {ClientOptions} from "@elastic/elasticsearch"

import config from "../Config/Config";

const logger = winston.createLogger({
    level: "info",
    transports: new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `${info.timestamp} | ${info.level} | ${info.message}`),
        ),
    }),
});

const esTransportOpts = {
    level: 'info',
    transformer: (logData: LogData) => {
        return {
            "@timestamp": (new Date()).toLocaleString(),
            severity: logData.level,
            message: logData.message
        }
    },
    clientOpts: {
        node: `${config.elasticsearch.url}:${config.elasticsearch.port}`,
        log: `${config.elasticsearch.level}`
    } as ClientOptions,
};

if (config.env != "dev") {
    // eslint-disable-next-line
    logger.add(new (<any>ElasticsearchTransport)(esTransportOpts));
}

export default logger;

export const morganLogger = {
    write: (message: string): void => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};
