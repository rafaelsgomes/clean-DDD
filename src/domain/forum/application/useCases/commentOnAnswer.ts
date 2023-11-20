import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { AnswerComment } from '../../enterprise/entities/answerComment'
import { IAnswersRepository } from '../repositories/IAnswersRepository'
import { IAnswerCommentsRepository } from '../repositories/IAnswerCommentsRepository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answersCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answersCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
