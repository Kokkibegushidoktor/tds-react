import {useParams} from "react-router-dom";
import TaskService, {IGetTaskResponse} from "../service/TaskService.ts";

const Task = () => {
    const {id} = useParams()
    if (id == undefined) {
        return
    }

    TaskService.getTask(id).
    then((resp: IGetTaskResponse)=> {
        return (
            <>
                <h1>{resp.task.title}</h1>
                <h1>{resp.task.description}</h1>
            </>
        )
    })

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default Task