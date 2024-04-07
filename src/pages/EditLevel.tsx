import {useLocation, useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import taskService, {IPatchTaskLevelRequest} from "../service/TaskService.ts";
import {Input} from "@mui/material";
import React from "react";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const EditLevel = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {
        register,
        handleSubmit
    } = useForm<IPatchTaskLevelRequest>()
    const query = useQuery()
    const title = query.get("title")
    const num = query.get("num")

    const onSubmit = async (data: IPatchTaskLevelRequest) => {
        data.varQuestCount = parseInt(String(data.varQuestCount), 10)
        console.log(data)
        await taskService.patchTaskLevel(id?id:"empty", data)
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
                    Edit an existing level
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('title')}
                               margin="normal"
                               required
                               fullWidth
                               label="Title"
                               autoFocus
                               defaultValue={title}
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
                               defaultValue: num?num:1,
                           }}
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
        </>
    )
}

export default EditLevel