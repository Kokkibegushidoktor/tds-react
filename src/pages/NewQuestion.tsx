import { useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import taskService, {IAddLevelQuestionRequest} from "../service/TaskService.ts";
import TitlebarImageList from "../components/CustomImageList.tsx";
import {ChangeEvent, useRef, useState} from "react";
import {BASE_API_URL} from "../consts/api.ts";

const NewQuestion = () => {
    const [preview, setPreview] = useState("")

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IAddLevelQuestionRequest>()
    const fileRef = useRef<HTMLInputElement | null>(null);

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
                               minRows={4}
                    />
                    <Box
                        component="img"
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxHeight: { xs: 300, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt={""}
                        src={preview.replace("LOCAL/",BASE_API_URL)}
                    />
                    <TextField {...register('contentUrl')}
                               margin="normal"
                               fullWidth
                    />
                    <Typography>Select an image below or enter a custom URL</Typography>
                    <input accept=".jpg,.jpeg,.png, .webp" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.files && event.target.files[0]) {
                            const requestData: FormData = new FormData()
                            requestData.append('file', event.target.files[0])
                            taskService.uploadImage(requestData)
                                .then((resp)=>{
                                    setValue("contentUrl", resp.url)
                                })
                        }
                    }} ref={fileRef} style={{visibility:"hidden", height:0, width:0}} type={"file"}/>
                    <Button
                        type="button"
                        color={'secondary'}
                        fullWidth
                        variant="contained"
                        onClick={()=>{
                            if (fileRef.current) {
                                fileRef.current.click()
                            }
                        }}
                        sx={{ mt: 3 }}
                    >
                        Upload a file
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Create
                    </Button>

                    <TitlebarImageList setPreview={setPreview} setValue={setValue}></TitlebarImageList>
                </Box>
            </Box>
        </>
    )
}

export default NewQuestion