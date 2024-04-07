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
    ]
}

export interface IGetTaskLevelsResponse {
    levels: [
        {
            id: string,
            taskId: string,
            title: string,
            varQuestCount: number
        }
    ]
}

export interface IPatchTaskRequest {
    title: string,
    description: string,
}
class TaskService  {
    async getTask (id: string)  {
        return await authorizedApi
            .get("task/"+id, {})
            .json<IGetTaskResponse>()
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
}

export default new TaskService();
