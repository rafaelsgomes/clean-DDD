import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/slug'
import { UniqueEntityId } from '@/core/entities/UniqueEntityId'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'Example Question',
    content: 'Example content',
    ...override,
  })

  return question
}
