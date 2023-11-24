import { InMemoryQuestionCommentsRepository } from 'test/repositories/inMemoryQuestionCommentsRepository'
import { CommentOnQuestionUseCase } from './commentOnQuestion'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { makeQuestion } from 'test/factories/makeQuestion'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let repository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, repository)
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      authorId: '1',
      questionId: question.id.toString(),
      content: 'New comment content',
    })

    expect(result.isRigth()).toBe(true)
    if (result.isRigth()) {
      expect(result.value.questionComment.content).toEqual(
        'New comment content',
      )
    }
  })
})
