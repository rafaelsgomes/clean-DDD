import { EditQuestionUseCase } from './editQuestion'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

let repository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(repository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await repository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Test Question',
      content: 'Test Content',
    })

    if (result.isRigth()) {
      expect(result.value.question).toMatchObject({
        title: 'Test Question',
        content: 'Test Content',
      })
      expect(result.value.question.updatedAt).toEqual(expect.any(Date))
    }
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await repository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      title: 'Test Question',
      content: 'Test Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
