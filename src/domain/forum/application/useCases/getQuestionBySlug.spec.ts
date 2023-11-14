import { GetQuestionBySlugUseCase } from './getQuestionBySlug'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/valueObjects/slug'
import { UniqueEntityId } from '@/core/entities/UniqueEntityId'

let repository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(repository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Example Question',
      slug: Slug.create('example-question'),
      content: 'Example content',
    })

    await repository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
