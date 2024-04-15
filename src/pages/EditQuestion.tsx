import {useLocation, useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import taskService, {IAddLevelQuestionRequest, IPatchQuestionRequest} from "../service/TaskService.ts";
import TitlebarImageList from "../components/CustomImageList.tsx";
import React, {ChangeEvent, useRef, useState} from "react";
import {BASE_API_URL} from "../consts/api.ts";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const EditQuestion = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const query = useQuery()
    const title = query.get("title")
    const desc = query.get("desc")
    const img = query.get("img")
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IAddLevelQuestionRequest>()
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState(img?img:"")

    const onSubmit = async (data: IPatchQuestionRequest) => {
        await taskService.patchLevelQuestion(id?id:"empty", data)
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
                    Редактирование вопроса
                </Typography>
                <Box maxWidth={350} component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <TextField {...register('title')}
                               margin="normal"
                               required
                               fullWidth
                               label="Название"
                               autoFocus
                               defaultValue={title}
                    />
                    <TextField {...register('description')}
                               margin="normal"
                               required
                               fullWidth
                               label="Описание"
                               multiline
                               minRows={4}
                               defaultValue={desc}
                    />
                    <div style={{textAlign: "center"}}>
                        <Box
                            component="img"
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxHeight: {xs: 300, md: 300},
                                maxWidth: {xs: 300, md: 350},
                            }}
                            alt={""}
                            src={preview.replace("LOCAL/", BASE_API_URL)}
                        />
                    </div>
                    <Button
                        type="button"
                        color={'secondary'}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            if (fileRef.current) {
                                fileRef.current.click()
                            }
                        }}
                        sx={{mt: 3}}
                    >
                        Загрузить файл
                    </Button>
                        <TextField {...register('contentUrl')}
                                   margin="normal"
                                   fullWidth
                                   defaultValue={img ? img : ""}
                        />
                        <Typography>Выберите изображение или введиту ссылку на ресурс</Typography>
                        <input accept=".jpg,.jpeg,.png, .webp" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            if (event.target.files && event.target.files[0]) {
                                const requestData: FormData = new FormData()
                                requestData.append('file', event.target.files[0])
                                taskService.uploadImage(requestData)
                                    .then((resp) => {
                                        setValue("contentUrl", resp.url)
                                        setPreview(resp.url)
                                    })
                            }
                        }} ref={fileRef} style={{visibility: "hidden", height: 0, width: 0}} type={"file"}/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 1, mb: 2}}
                        >
                            Сохранить
                        </Button>

                        <TitlebarImageList setPreview={setPreview} setValue={setValue}></TitlebarImageList>
                </Box>
            </Box>
        </>
)
}

export default EditQuestion