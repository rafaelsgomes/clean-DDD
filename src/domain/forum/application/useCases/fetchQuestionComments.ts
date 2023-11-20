import { QuestionComment } from '../../enterprise/entities/questionComment'
import { IQuestionCommentsRepository } from '../repositories/IQuestionCommentsRepository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findyManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
