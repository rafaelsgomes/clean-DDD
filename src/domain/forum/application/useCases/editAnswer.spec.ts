import { EditAnswerUseCase } from './editAnswer'
import { InMemoryAnswersRepository } from 'test/repositories/inMemoryAnswersRepository'
import { makeAnswer } from 'test/factories/makeAnswer'
import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

let repository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(repository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await repository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
      content: 'Test Content',
    })

    if (result.isRigth()) {
      expect(result.value.answer).toMatchObject({
        content: 'Test Content',
      })
      expect(result.value.answer.updatedAt).toEqual(expect.any(Date))
    }
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await repository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',

      content: 'Test Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
