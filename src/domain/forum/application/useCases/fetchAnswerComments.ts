import { AnswerComment } from '../../enterprise/entities/answerComment'
import { IAnswerCommentsRepository } from '../repositories/IAnswerCommentsRepository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findyManyByAnswerId(answerId, {
        page,
      })

    return {
      answerComments,
    }
  }
}
