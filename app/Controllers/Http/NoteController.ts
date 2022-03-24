
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class NoteController {
  public async store({ response, request }: HttpContextContract) {
    try {
      const { email, password } = request.body();
      const user = await User.findBy('email', email)

    }catch(e) {
      
    }
  }

}
