import {test, expect} from 'vitest'
import {AnswerQuestionUseCase} from './answerQuestion'


test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})