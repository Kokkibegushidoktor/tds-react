import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AutohideSnackbar from "../components/CustomizableSnackbar.tsx";
import * as React from "react";
import {useForm} from "react-hook-form";
import authService, { ISetUpRequest} from "../service/AuthService.ts";
import {HTTPError} from "ky";
import {IErrorResponse} from "../api/apiInstance.ts";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("false");
    const navigate = useNavigate()
    const {
        register,
        handleSubmit
    } = useForm<ISetUpRequest>()
    const onSubmit = async (data: ISetUpRequest) => {
        if (data.password != data.password_repeat) {
            setText("Passwords do not match")
            setOpen(true)
            return
        }
        await authService.setUp(data).
        then(() => {
            setText("Redirecting to SignIn page...")
            setOpen(true)
            setTimeout(() =>
                {
                    navigate("/login")
                },
                3000);
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
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PermContactCalendarIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField {...register('username')}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            autoFocus
                        />
                        <TextField {...register('password')}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                        />
                        <TextField {...register('password_repeat')}
                            margin="normal"
                            required
                            fullWidth
                            name="password_repeat"
                            label="Повторите Пароль"
                            type="password"
                            id="password_repeat"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </Container>
            <AutohideSnackbar open={open} text={text} setOpen={setOpen} duration={5000}></AutohideSnackbar>
        </>
    );
}

export default SignUp