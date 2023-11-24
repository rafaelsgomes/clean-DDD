import { CreateQuestionUseCase } from './createQuestion'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'

let repository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(repository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'New question content',
      title: 'New question title',
    })

    expect(result.value?.question.id).toBeTruthy()
  })
})
