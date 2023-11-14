import { Answer } from '../../enterprise/entities/answer'

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
}
