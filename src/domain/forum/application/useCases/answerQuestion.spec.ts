import { AnswerQuestionUseCase } from './answerQuestion'
import { IAnswersRepository } from '../repositories/IAnswersRepository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { expect } from 'vitest'

const fakeAnswersRepository: IAnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
