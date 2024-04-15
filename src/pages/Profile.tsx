import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {jwtDecode} from "jwt-decode";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import authService, {ICreateUserRequest} from "../service/AuthService.ts";
import * as React from "react";
import AutohideSnackbar from "../components/CustomizableSnackbar.tsx";
import {HTTPError} from "ky";
import {IErrorResponse} from "../api/apiInstance.ts";

export interface OurToken {
    sub: string
    name: string
    adm: boolean
    rls: Array<string>
}

const Profile = () => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("false");
    const {
        register,
        handleSubmit
    } = useForm<ICreateUserRequest>()
    const token = localStorage.getItem("token")
    if (token == null){
        return <></>
    }
    const decode = jwtDecode<OurToken>(token)

    const onSubmit = async (data: ICreateUserRequest) => {
        await authService.createUser(data).
        then(() => {
            setText("User Created")
            setOpen(true)
        }, async (error:HTTPError) => {
            const err: IErrorResponse = await error.response?.json()
            setText(error.response?error.response.status + " " + err.error:error.toString())
            setOpen(true)
        })
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography fontSize={20} m={2} align={'center'}>Your Profile</Typography>
                <Box component="section" sx={{ p: 2, m:3, border: '1px dashed grey' }}>
                    {/*<Typography>{decode.sub}</Typography>*/}
                    <Typography>Your name: {decode.name}</Typography>
                    <Typography>Your roles: {decode.rls?decode.rls.toString():"empty"}</Typography>
                    {decode.adm?<Typography color={"red"}>Admin privileges enabled</Typography>:<></>}
                </Box>

                {decode.adm?<>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField {...register('username')}
                                   margin="normal"
                                   required
                                   fullWidth
                                   label="New Username"
                                   autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create New User
                        </Button>
                    </Box></>:<></>}
            </Container>
            <AutohideSnackbar open={open} text={text} setOpen={setOpen} duration={6000}></AutohideSnackbar>
        </>
    )
}

export default Profile