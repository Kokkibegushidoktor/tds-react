import React from "react";
import {useParams} from "react-router-dom";
import {HTTPError} from "ky";
import variantService, {IGetTaskVariantResponse} from "../service/VariantService.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BASE_API_URL} from "../consts/api.ts";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {Divider} from "@mui/material";
const Tasks = () => {
    const [data, setData] = React.useState<IGetTaskVariantResponse>({
        result: null
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const {id} = useParams()


    const handleApiResponse = (response: IGetTaskVariantResponse) => {
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
        variantService.newVariant(id?id:"aif")
            .then(handleApiResponse)
            .catch(handleApiError)

    const content = isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            {data.result?
                <Container component="main" sx={{
                    maxWidth: {xs: "xs", md: 666},
                }}>
                    <CssBaseline />
                    <Box mt={5}>
                        <Typography align={'center'} fontSize={25}>{data.result.title}</Typography>
                        <Divider/>
                        <pre style={{fontFamily: 'inherit', textWrap:'wrap'}}>
                                                <Typography>{data.result.description}</Typography>
                                            </pre>
                        <Divider/>
                        {data.result.levels?.map((val) => (
                                <div key={val.title}>
                                    <Typography align={'center'}>{val.title}</Typography>
                                    {val.questions?.map((quest) => (
                                        <Box key={quest.id} sx={{p: 1, m: 1, border: '1px dashed grey'}}>
                                            {/*<Typography>{quest.title}</Typography>*/}
                                            <pre style={{fontFamily: 'inherit', textWrap:'wrap'}}>
                                                <Typography>{quest.description}</Typography>
                                            </pre>

                                            {quest.contentURL ? <div style={{textAlign: "center"}}>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        margin: 'auto',
                                                        maxHeight: {xs: 300, md: 300},
                                                        maxWidth: {xs: 300, md: 350},
                                                    }}
                                                    alt={""}
                                                    src={quest.contentURL.replace("LOCAL/", BASE_API_URL)}
                                                />
                                            </div> : <></>}
                                        </Box>
                                    ))}
                                    <Divider/>
                                </div>
                            )
                        )
                        }
                    </Box>
                </Container>
                : <>что-то пошло не так</>} </>
    );

    return <div>{content}</div>;
}

export default Tasks