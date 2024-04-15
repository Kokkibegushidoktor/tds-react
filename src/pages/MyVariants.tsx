import React from "react";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {HTTPError} from "ky";

import variantService, {IGetVariantsResponse} from "../service/VariantService.ts";
const MyVariants = () => {
    const [data, setData] = React.useState<IGetVariantsResponse>({
        results: null
    });
    const [isLoading, setIsLoading] = React.useState(true);


    const handleApiResponse = (response: IGetVariantsResponse) => {
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
        variantService.getMy()
            .then(handleApiResponse)
            .catch(handleApiError)

    const content = isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            {data.results?
                <Grid sx={{flexDirection:"column", padding:"0 20px"}} mt={2} container justifyContent="center" spacing={2}>
                    {data.results.map((value) => (
                        <Grid key={value.id} item>
                            <Card sx={{height:"140px"}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {value.title}
                                    </Typography>
                                    <Typography height={22} sx={{overflow:'hidden'}} variant="body2" color="text.secondary">
                                        {value.description.length>100?value.description.substring(0, 100)+"...":value.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={"/getvariant/"+value.taskId}><Button size="small">Просмотр</Button></Link>

                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                : <>No tasks yet</>} </>
    );

    return <div>{content}</div>;
}

export default MyVariants