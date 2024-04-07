import { useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import taskService, {IAddTaskLevelRequest} from "../service/TaskService.ts";
import {Input} from "@mui/material";

const NewLevel = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {
        register,
        handleSubmit
    } = useForm<IAddTaskLevelRequest>()

    const onSubmit = async (data: IAddTaskLevelRequest) => {
        data.taskId = id?id:"empty"
        data.varQuestCount = parseInt(String(data.varQuestCount), 10)
        console.log(data)
        await taskService.addTaskLevel(data)
            .finally(()=>{
                navigate("/task/"+id)
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
                    Add a new level
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('title')}
                               margin="normal"
                               required
                               fullWidth
                               label="Title"
                               autoFocus
                    />
                    <Typography>Number of questions per variant</Typography>
                    <Input {...register('varQuestCount')}
                           required
                           fullWidth
                           inputProps={{
                               step: 1,
                               min: 1,
                               max: 100,
                               type: 'number',
                               defaultValue:1,
                           }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default NewLevel