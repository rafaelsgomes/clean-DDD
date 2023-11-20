import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'
import { IQuestionCommentsRepository } from '../repositories/IQuestionCommentsRepository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionsCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionsCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
