
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class QuestionController {
  public async index({ response }: HttpContextContract) {
    try {
      const questions = await Question.all()
      return response.status(200).send({questions})
    }catch(e) {
      return response.status(500)
    }
  }

  public async store({ response, request }: HttpContextContract) {
    try {
      const { questionId, answer } = request.body();
      const question = await Question.find(questionId)
      if(answer === 'yes' && question) {
        question.yes =  question.yes + 1
      }else if (question) {
        question.no = question.no + 1
      }
      await question?.save()
      return response.status(201)
    }catch(e) {
      return response.status(500)
    }
  }
}
