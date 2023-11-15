import { Answer } from '../../enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/IAnswersRepository'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findyManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return {
      answers,
    }
  }
}
