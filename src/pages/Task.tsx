import {Link, useParams} from "react-router-dom";
import {IGetTaskLevelsResponse, IGetTaskResponse, IPatchTaskRequest} from "../service/TaskService.ts";
import React from "react";
import taskService from "../service/TaskService.ts";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Modal, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {BASE_API_URL} from "../consts/api.ts";
import QRCode from "react-qr-code";
import {QrCode} from "@mui/icons-material";

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
    const [qrOpen, setQrOpen] = React.useState(false);
    const handleQrOpen = () => setQrOpen(true);
    const handleQrClose = () => setQrOpen(false);
    const [data, setData] = React.useState<IGetTaskResponse>({
        task: {
            id: "string",
            title: "string",
            description: "string",
        }
    });
    const [levelsLoading, setlevelsLoading] = React.useState(true);
    const [levels, setLevels] = React.useState<IGetTaskLevelsResponse>({
        levels: [{     id: "string",     taskId: "string",     title: "string",     varQuestCount: 1, questions: null }]
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
    const getData = () => {
        taskService.getTask(id?id:"empty")
            .then(handleApiResponse)
        taskService.getTaskLevels(id?id:"empty")
            .then((resp: IGetTaskLevelsResponse)=> {
                setLevels(resp)
                setlevelsLoading(false)
            }
        )
    }

    const levelsContent = levelsLoading ? (
        <div>Loading levels...</div>
    ) : levels.levels != null? (
        <>
            {levels.levels.map((value) => (
                <Accordion key={value.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Stack divider={<Divider orientation="vertical" flexItem />}
                               spacing={1}
                               direction={'row'}>
                            <Typography>{value.title}</Typography>
                            <Typography>{"Вопросов в варианте: "+value.varQuestCount}</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Link to={"/level/"+value.id+"?title="+value.title+"&num="+value.varQuestCount}><IconButton><EditIcon/></IconButton></Link>
                        <IconButton><DeleteForeverIcon/></IconButton>
                        <Link to={"/level/"+value.id+"/newquest"}><IconButton><AddCircleIcon/></IconButton></Link>
                        <Divider sx={{mt:2, mb:2}} variant="middle" component="p" />
                        {value.questions?
                            value.questions.map((val, index)=>(
                                <Accordion key={val.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Stack divider={<Divider orientation="vertical" flexItem />}
                                               spacing={1}
                                               direction={'row'}>
                                            <Typography>{index+1}</Typography>
                                            <Typography>{val.title}</Typography>
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Link to={"/quest/"+val.id+"?title="+val.title+"&desc="+encodeURI(val.description)+"&img="+val.contentURL}><IconButton><EditIcon/></IconButton></Link>
                                        <IconButton><DeleteForeverIcon/></IconButton>
                                        <Divider sx={{mt:2, mb:2}} variant="middle" component="p" />
                                        <Typography sx={{wordBreak: "break-word"}}>
                                            <pre style={{fontFamily: 'inherit', textWrap:'wrap'}}>
                                                {val.description}
                                            </pre>
                                        </Typography>
                                        {val.contentURL ?
                                            <Box
                                                component="img"
                                                sx={{
                                                    maxHeight: {xs: 300, md: 300},
                                                    maxWidth: {xs: 300, md: 350},
                                                }}
                                                alt={val.title}
                                                src={val.contentURL.replace("LOCAL/",BASE_API_URL)}
                                            />:<></>
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        :<Typography>No questions yet</Typography>
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    ): <Typography>No levels yet</Typography>
    const content = isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            <Container sx={{mt:2}} component="main" maxWidth="md">
                <Button onClick={handleQrOpen} startIcon={<QrCode/>} variant='contained'>Qr</Button>
                <Button onClick={handleModOpen} sx={{ml:2}} variant='contained'>Редактировать</Button>
                <Link to='newlevel'><Button sx={{ml:2}} startIcon={<AddCircleIcon/>} variant='contained'>Новый уровень</Button></Link>
                <Box component="section" sx={{ p: 2, m:3, border: '1px dashed grey' }}>
                    <Typography fontSize={20} sx={{ wordBreak: "break-word"}} align={'center'}>{data.task.title}</Typography>
                    <Divider variant="middle" component="p" />
                    <Typography sx={{ wordBreak: "break-word"}}>{data.task.description}</Typography>
                </Box>
                {levelsContent}
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
            <Modal
                open={qrOpen}
                onClose={handleQrClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <QRCode style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={window.location.href} />
                </Box>
            </Modal>
        </>
    );

    return <div>{content}</div>;
}

export default Task