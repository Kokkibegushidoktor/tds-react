import {authorizedApi} from "../api/apiInstance.ts";
import { taskEndpoints} from "../api/endpoints.ts";


export interface IGetTaskVariantResponse {
    result: {
        id: string,
        userId: string,
        taskId: string,
        title: string,
        description: string,
        levels: [
            {
                title: string,
                questions: [
                    {
                        id: string,
                        title: string,
                        description: string,
                        contentURL: string | null,
                    }
                ]
            }
        ] | null
    } | null
}

export interface IGetVariantsResponse {
    results: [
        {
            id: string,
            userId: string,
            taskId: string,
            title: string,
            description: string,
            levels: [
                {
                    title: string,
                    questions: [
                        {
                            id: string,
                            title: string,
                            description: string,
                            contentURL: string | null,
                        }
                    ]
                }
            ] | null
        }
    ] | null
}

class VariantService  {
    async newVariant (taskId: string)  {
        return await authorizedApi
            .get(taskEndpoints.MethodTask+taskId+"/variant", )
            .json<IGetTaskVariantResponse>()
    }

    async getMy () {
        return await  authorizedApi
            .get("variants/my")
            .json<IGetVariantsResponse>()
    }

    async getAll (taskId: string) {
        return await authorizedApi
            .get("variants", {searchParams:{taskId}})
            .json<IGetVariantsResponse>()
    }
}

export default new VariantService();
