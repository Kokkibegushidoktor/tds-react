import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import taskService, {IAddLevelQuestionRequest, IListFilesResponse} from "../service/TaskService.ts";
import {BASE_API_URL} from "../consts/api.ts";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {UseFormSetValue} from "react-hook-form";
import {HTTPError} from "ky";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

type ImgListProps = {
    setValue: UseFormSetValue<IAddLevelQuestionRequest>
    setPreview?:  React.Dispatch<React.SetStateAction<string>>
}
export default function TitlebarImageList(props:ImgListProps) {
    const [sus, setSus] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = (src: string) => {
        setSus(src)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const [data, setData] = useState<IListFilesResponse>({
        page: 0,
        pageSize: 0,
        total: 0,
        results: null
    });
    const [isLoading, setIsLoading] = useState(true);
    const query = useQuery()
    const page = query.get("page")
    const pageSize = query.get("pageSize")

    const handleApiResponse = (response: IListFilesResponse) => {
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

    const handleClick = (item: string) =>{
        props.setValue("contentUrl", item)
        if (props.setPreview != null) {
            props.setPreview(item)
        }
    }
    const getData = () =>
        taskService.listFiles(page?page:"1", pageSize?pageSize:"10")
            .then(handleApiResponse)
            .catch(handleApiError)

    const content = isLoading ? (
        <div>Loading...</div>
    ) : (
        data.results?
            <>
                <ImageList sx={{ mb:3, maxWidth: 350, maxHeight: 450 }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">Uploaded Files</ListSubheader>
                    </ImageListItem>
                    {data.results.map((item) => (
                        <ImageListItem key={item.id}>
                            <img onClick={()=>handleOpen(item.url.replace("LOCAL/",BASE_API_URL))}
                                srcSet={`${item.url.replace("LOCAL/",BASE_API_URL)}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.url.replace("LOCAL/",BASE_API_URL)}?w=248&fit=crop&auto=format`}
                                alt={item.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                subtitle={item.uploader}
                                actionIcon={
                                    <IconButton
                                        onClick={()=>handleClick(item.url)}
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.name}`}
                                    >
                                        <CheckCircleIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <CssBaseline />
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                        <Box sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '0px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: { xs: 233, md: 367 },
                                    maxWidth: { xs: 350, md: 450 },
                                }}
                                alt="a"
                                src={sus}
                            />
                        </Box>
                </Modal>
            </>
            : <>No files yet</>
    );

    return <div>{content}</div>;
}
