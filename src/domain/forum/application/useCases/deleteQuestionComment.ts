import { IQuestionCommentsRepository } from '../repositories/IQuestionCommentsRepository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionsCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionsCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question Comment not found!')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsCommentsRepository.delete(questionComment)

    return {}
  }
}
