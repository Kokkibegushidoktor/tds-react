import { useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import taskService, {IAddLevelQuestionRequest} from "../service/TaskService.ts";
import TitlebarImageList from "../components/CustomImageList.tsx";

const NewQuestion = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IAddLevelQuestionRequest>()

    const onSubmit = async (data: IAddLevelQuestionRequest) => {
        data.levelId = id?id:"empty"
        await taskService.addLevelQuestion(data)
            .finally(()=>{
                navigate(-1)
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
                    Add a new Question
                </Typography>
                <Box maxWidth={350} component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                               label="Description"
                               multiline
                               rows={4}
                    />
                    <TextField {...register('contentUrl')}
                               margin="normal"
                               fullWidth
                               
                    />
                    <Typography>Select an image below or enter a custom URL</Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>

                    <TitlebarImageList setValue={setValue}></TitlebarImageList>


                </Box>
            </Box>
        </>
    )
}

export default NewQuestion