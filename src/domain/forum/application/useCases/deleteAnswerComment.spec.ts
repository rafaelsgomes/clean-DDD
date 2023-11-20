import { InMemoryAnswerCommentsRepository } from 'test/repositories/inMemoryAnswerCommentsRepository'
import { DeleteAnswerCommentUseCase } from './deleteAnswerComment'
import { makeAnswerComment } from 'test/factories/makeAnswerComment'
import { UniqueEntityId } from '@/core/entities/UniqueEntityId'

let repository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(repository)
  })

  it('should be able to delete a answer comment', async () => {
    const comment = makeAnswerComment()

    await repository.create(comment)

    await sut.execute({
      authorId: comment.authorId.toString(),
      answerCommentId: comment.id.toString(),
    })

    expect(repository.items).toHaveLength(0)
  })

  it('should not be able to delete another user a answer comment', async () => {
    const comment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await repository.create(comment)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerCommentId: comment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
