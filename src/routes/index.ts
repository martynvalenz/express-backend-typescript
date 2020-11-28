import {Application, Request, Response} from 'express'
import {createUser} from '../controllers/users-controller'

const routes = (app:Application) => {
   app.post('/create', createUser)
}

export default routes