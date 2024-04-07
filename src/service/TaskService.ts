import {authorizedApi} from "../api/apiInstance.ts";

export interface IGetTaskResponse {
    task: {
        id: string,
        title: string,
        description: string
    }
}

class TaskService  {
    async getTask (id: string)  {
        return await authorizedApi
            .get("task/"+id, {})
            .json<IGetTaskResponse>()
    }

}

export default new TaskService();
