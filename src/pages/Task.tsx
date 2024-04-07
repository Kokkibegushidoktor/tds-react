import {useParams} from "react-router-dom";
import {IGetTaskResponse, IPatchTaskRequest} from "../service/TaskService.ts";
import React from "react";
import taskService from "../service/TaskService.ts";
import {Divider, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Task = () => {
    const onSubmit = async (data: IPatchTaskRequest) => {
        await taskService.patchTask(id?id:"", data).
        then(() => {
            handleModClose()
            getData()
        })
    };
    const {
        register,
        handleSubmit
    } = useForm<IPatchTaskRequest>()
    const [modOpen, setModOpen] = React.useState(false);
    const handleModOpen = () => setModOpen(true);
    const handleModClose = () => setModOpen(false);
    const [data, setData] = React.useState<IGetTaskResponse>({
        task: {
            id: "string",
            title: "string",
            description: "string",
        }
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const {id} = useParams()
    const handleApiResponse = (response: IGetTaskResponse) => {
        console.log("Res", response);
        setData(response);
        setIsLoading(false);
    };

    React.useEffect(() => {
        getData();
    }, []);
    const getData = () =>
        taskService.getTask(id?id:"empty")
            .then(handleApiResponse)

    const content = isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            <Container sx={{mt:2}} component="main" maxWidth="md">
                <Button onClick={handleModOpen} variant='contained'>Edit</Button>
                <Box component="section" sx={{ p: 2, m:3, border: '1px dashed grey' }}>
                    <Typography fontSize={20} sx={{ wordBreak: "break-word"}} align={'center'}>{data.task.title}</Typography>
                    <Divider variant="middle" component="p" />
                    <Typography sx={{ wordBreak: "break-word"}}>{data.task.description}</Typography>
                </Box>
            </Container>
            <Modal
                open={modOpen}
                onClose={handleModClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}  noValidate sx={{ mt: 1 }}>
                        <TextField {...register('title')}
                                   margin="normal"
                                   required
                                   fullWidth
                                   label="Title"
                                   autoFocus
                        />
                        <TextField {...register('description')}
                                   margin="normal"
                                   required
                                   fullWidth
                                   multiline
                                   rows={4}
                                   label="Description"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );

    return <div>{content}</div>;
}

export default Task