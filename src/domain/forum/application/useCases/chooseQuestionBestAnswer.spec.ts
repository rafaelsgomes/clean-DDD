import { ChooseQuestionBestAnswerUseCase } from './chooseQuestionBestAnswer'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { InMemoryAnswersRepository } from 'test/repositories/inMemoryAnswersRepository'
import { makeAnswer } from 'test/factories/makeAnswer'

let repository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    answersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(repository, answersRepository)
  })

  it('should be able to set best answer to a question', async () => {
    const newQuestion = makeQuestion()

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await repository.create(newQuestion)
    await answersRepository.create(newAnswer)

    const { question } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(question.bestAnswerId).toEqual(newAnswer.id)
    expect(question.updatedAt).toEqual(expect.any(Date))
  })

  it('should not able to set best answer to a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await repository.create(newQuestion)
    await answersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
