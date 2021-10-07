import { Express } from 'express-serve-static-core'
import * as IndexController from '../controllers/index.controller'

/**
 *
 * @param app
 * @param validators
 */
export const api = (app: Express, validators: { indexValidator: any }) => {
    app.get('/', IndexController.index)
    app.post('/', () => validators.indexValidator,  IndexController.indexPost)
}