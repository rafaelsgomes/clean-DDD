import { InMemoryAnswerCommentsRepository } from 'test/repositories/inMemoryAnswerCommentsRepository'
import { CommentOnAnswerUseCase } from './commentOnAnswer'
import { InMemoryAnswersRepository } from 'test/repositories/inMemoryAnswersRepository'
import { makeAnswer } from 'test/factories/makeAnswer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let repository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, repository)
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'New comment content',
    })

    expect(answerComment.content).toEqual('New comment content')
  })
})
