import { useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import taskService, {IAddTaskRequest, IAddTaskResponse} from "../service/TaskService.ts";

const NewTask = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
    } = useForm<IAddTaskRequest>()

    const onSubmit = async (data: IAddTaskRequest) => {
        await taskService.addTask(data)
            .then((resp: IAddTaskResponse)=>{
                navigate("/task/"+resp.id)
            })
    };

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Новое задание
                </Typography>
                <Box maxWidth={350} component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('title')}
                               margin="normal"
                               required
                               fullWidth
                               label="Название"
                               autoFocus
                    />
                    <TextField {...register('description')}
                               margin="normal"
                               required
                               fullWidth
                               label="Описание"
                               multiline
                               rows={4}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Создать
                    </Button>
                    
                </Box>
            </Box>
        </>
    )
}

export default NewTask