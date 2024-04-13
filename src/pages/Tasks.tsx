import {IListTasksResponse} from "../service/TaskService.ts";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent} from "@mui/material";
import taskService from "../service/TaskService.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {HTTPError} from "ky";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Tasks = () => {
    const [data, setData] = React.useState<IListTasksResponse>({
        page: 0,
        pageSize: 0,
        total: 0,
        results: null
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const query = useQuery()
    const page = query.get("page")
    const pageSize = query.get("pageSize")

    const handleApiResponse = (response: IListTasksResponse) => {
        console.log("Res", response);
        setData(response);
        setIsLoading(false);
    };

    const handleApiError = (error: HTTPError) => {
        if (error.response.status == 404) {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        getData();
    }, []);
    const getData = () =>
        taskService.listTasks(page?page:"1", pageSize?pageSize:"10")
            .then(handleApiResponse)
            .catch(handleApiError)

    const content = isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            <Link to={"newtask"}><IconButton sx={{ml:5}}><AddCircleIcon/></IconButton></Link>
            {data.results?
                <Grid sx={{flexDirection:"column", padding:"0 20px"}} mt={2} container justifyContent="center" spacing={2}>
                    {data.results.map((value) => (
                        <Grid key={value.id} item>
                            <Card sx={{height:"140px"}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {value.title}
                                    </Typography>
                                    <Typography height={22} sx={{overflow:'hidden'}} variant="body2" color="text.secondary">
                                        {value.description.length>100?value.description.substring(0, 100)+"...":value.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={"/task/"+value.id}><Button size="small">View</Button></Link>
                                    <Link to={"/task/"+value.id}><Button size="small">Delete</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                : <>No tasks yet</>} </>
    );

    return <div>{content}</div>;
}

export default Tasks