import { GetQuestionBySlugUseCase } from './getQuestionBySlug'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { Slug } from '../../enterprise/entities/valueObjects/slug'

let repository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(repository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await repository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    if (result.isRigth()) {
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
