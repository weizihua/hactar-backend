import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";
import * as Joi from "@hapi/joi";

export interface CreateNodeDiskInformationRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        freeSpace: string;
        takenSpace: string;
        nodeInfo: {
            url: string;
            address: string;
        };
    };
}

export const CreateNodeDiskInforamtionValidationSchema = Joi.object({
    freeSpace: Joi.string().regex(/^\d+$/).required(),
    takenSpace: Joi.string().regex(/^\d+$/).required(),
    nodeInfo: Joi.object({
        url: Joi.string().required(),
        address: Joi.string().required(),
    })
});

export interface FetchNodeDiskInformationRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        filter: string;
    };
}

export const FetchNodeDiskInforamtionValidationSchema = Joi.object({
    filter: Joi.string().valid('day', 'week', 'month', 'year').required(),
});
