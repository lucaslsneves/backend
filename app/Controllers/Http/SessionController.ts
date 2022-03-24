import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class SessionController {
  public async signIn({ auth, response, request }: HttpContextContract) {
      try {
        const {email , password} = request.body();
        const user = await User.findBy('email', email)
        if (!user) {
          response.badRequest({
            rule: 'invalid credentials',
            field: 'email',
            message: 'email doesnt exists',
          })
          return
        }

        if (!(await Hash.verify(user.password, password))) {
          response.badRequest({
            rule: 'invalid credentials',
            field: 'password',
            message: 'invalid password',
          })
          return
        }
        await Database.rawQuery('delete from api_tokens where user_id = ?', [user.id])
        const token = await auth.use('api').generate(user)
        response.status(201).send({ token, user })
      } catch (error) {
        response.internalServerError('Internal Server Error')
      }
  }

  public async signUp({auth, request, response }: HttpContextContract) {
   
      try {
        const {email , password} = request.body();

        const emailAlreadyExists = await User.findBy('email', email)

        if (emailAlreadyExists) {
          response.badRequest({
            rule: 'unique',
            field: 'email',
            message: 'email already exists',
          })
          return
        }
        
        const user = await User.create({email , password})

        await Database.rawQuery('delete from api_tokens where user_id = ?', [user.id])
        const token = await auth.use('api').generate(user)
        return response.status(201).send({ token, user })
      } catch (error) {
        response.internalServerError('Internal Server Error')
      }
  }
}
