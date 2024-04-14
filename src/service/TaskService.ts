import {authorizedApi} from "../api/apiInstance.ts";
import {taskEndpoints} from "../api/endpoints.ts";

export interface IGetTaskResponse {
    task: {
        id: string,
        title: string,
        description: string
    }
}

export interface  IListTasksResponse {
    total: number,
    page: number,
    pageSize: number,
    results: [
        {
            id: string,
            title: string,
            description: string
        }
    ] | null
}

export interface IGetTaskLevelsResponse {
    levels: [
        {
            id: string,
            taskId: string,
            title: string,
            varQuestCount: number
            questions: [
                {
                    id: string,
                    title: string,
                    description: string,
                    contentURL: string | null
                }
            ] | null
        }
    ] | null
}

export interface IAddTaskLevelRequest {
    taskId: string,
    title: string,
    varQuestCount: number
}

export interface IAddTaskLevelResponse {
    id: string
}

export interface IPatchTaskRequest {
    title: string,
    description: string,
}

export interface IAddTaskRequest {
    title: string,
    description: string,
}

export interface IAddTaskResponse {
    id: string
}

export interface IPatchTaskLevelRequest {
    title: string,
    varQuestCount: number
}

export interface IAddLevelQuestionRequest {
    levelId: string,
    title: string,
    description: string,
    contentUrl: string
}

export interface IAddLevelQuestionResponse {
    id: string
}

export interface IPatchQuestionRequest {
    title: string,
    description: string,
    contentUrl: string
}

export interface IListFilesResponse {
    total: number,
    page: number,
    pageSize: number,
    results: [
        {
            id: string,
            name: string,
            type: string
            contentType: string,
            size: number,
            status: number,
            url: string,
            uploader: string
        }
    ] | null
}

export interface IUploadImageResponse {
    url: string
}

class TaskService  {
    async getTask (id: string)  {
        return await authorizedApi
            .get("task/"+id, {})
            .json<IGetTaskResponse>()
    }

    async addTask(data: IAddTaskRequest) {
        return await authorizedApi
            .post(taskEndpoints.ListTasks, {json:{...data}})
            .json<IAddTaskResponse>()
    }

     async listTasks (page: string, pageSize: string) {
        return await authorizedApi
            .get(taskEndpoints.ListTasks, {searchParams: {page, pageSize}})
            .json<IListTasksResponse>()
    }

    async patchTask(id: string, data: IPatchTaskRequest) {
        return authorizedApi
            .patch(taskEndpoints.MethodTask+id, {
                json: {...data}
            })
    }

    async getTaskLevels(id: string) {
        return await authorizedApi
            .get(taskEndpoints.MethodTask+id+"/levels")
            .json<IGetTaskLevelsResponse>()
    }

    async addTaskLevel(data: IAddTaskLevelRequest) {
        return await authorizedApi
            .post(taskEndpoints.NewLevel, {json: {...data}})
            .json<IAddTaskLevelResponse>()
    }

    async patchTaskLevel(id: string, data: IPatchTaskLevelRequest) {
        return authorizedApi
            .patch(taskEndpoints.MethodLevel+id, {json: {...data}})
    }

    async addLevelQuestion(data: IAddLevelQuestionRequest) {
        return await authorizedApi
            .post(taskEndpoints.NewQuestion, {json: {...data}})
            .json<IAddLevelQuestionResponse>()
    }

    async patchLevelQuestion(id: string, data: IPatchQuestionRequest) {
        return authorizedApi
            .patch(taskEndpoints.MethodQuestion+id, {json: {...data}})
    }

    async listFiles (page: string, pageSize: string) {
        return await authorizedApi
            .get(taskEndpoints.ListFiles, {searchParams: {page, pageSize}})
            .json<IListFilesResponse>()
    }

    async uploadImage (data: FormData) {
        return await authorizedApi
            .post(taskEndpoints.UploadFile, {body: data})
            .json<IUploadImageResponse>()
    }
}

export default new TaskService();
