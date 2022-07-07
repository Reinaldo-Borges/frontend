import { ResponseQuestion } from "./response-quesntion.model"

export class Question{
    id: string = '00000000-0000-0000-0000-000000000000'
    code: string = ''
    description: string = ''
    typeQuestion: string = ''
    creationDate: Date | undefined
    lessonId: string = '00000000-0000-0000-0000-000000000000'
    responses: ResponseQuestion[] = []
}
