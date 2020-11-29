import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import Users, { User } from '../models/user'

export const createUser = async (req:Request, res:Response):Promise<void> => {
   try {
      const {username, email, password} = req.body

      if(!username || !email || !password){
         throw {status:406, message:'invalid body params'}
      }

      const hash: string = bcrypt.hashSync(password, 15)

      const user: User = await Users.create({
         username:username,
         email:email,
         password:hash
      })
      res.send(user)
   } 
   catch (e) {
      res.status(e.status || 500).send(e.message)
   }
}