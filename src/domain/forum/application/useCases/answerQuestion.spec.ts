import { AnswerQuestionUseCase } from './answerQuestion'
import { InMemoryAnswersRepository } from 'test/repositories/inMemoryAnswersRepository'

let repository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(repository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'New answer content',
    })

    expect(result.isRigth()).toBe(true)
    expect(repository.items[0]).toEqual(result.value?.answer)
  })
})
