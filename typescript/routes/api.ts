import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import * as IndexController from '../controllers/index.controller'

/**
 *
 * @param app
 * @param validators
 */
export const api = (app: {
		get: (arg0: string, arg1: (req: Request<ParamsDictionary, any, any /**
 *
 * @param app
 * @param validators
 */, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<void>) => void; post: (arg0: string, arg1: any, arg2: (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<void>) => void
	}, validators: { indexValidator: any }) => {
    app.get('/', IndexController.index)
    app.post('/', validators.indexValidator, IndexController.indexPost)
}