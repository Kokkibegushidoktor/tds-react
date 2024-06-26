import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import authService, {ISignInRequest, ISignInResponse} from "../service/AuthService.ts";
import {useForm} from 'react-hook-form';
import {useAuth} from "../store/UseAuth.ts";
import AutohideSnackbar from "../components/CustomizableSnackbar.tsx";
import * as React from "react";

const Login = () => {
    const { state } = useLocation();
    const { setAuth } = useAuth();
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    const {
        register,
        //formState: {errors},
        handleSubmit
    } = useForm<ISignInRequest>()

    const onSubmit = async (data: ISignInRequest) => {
        await authService.login(data).
        then((resp: ISignInResponse) => {
            localStorage.setItem("token",resp.token)
            setAuth(true)
            navigate(state?.myPath?state.myPath:"/")
        }, (reason) => {
            console.log(reason)
            setOpen(true)
        })
    };

    return (
            <div>
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Вход
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextField {...register('username')}
                                       margin="normal"
                                       required
                                       fullWidth
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
                                       autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>
                            <Grid container>
                                {/*<Grid item xs>
                                    <Link to="#" style={{color: "blue"}}>
                                        Forgot password?
                                    </Link>
                                </Grid>*/}
                                <Grid item>
                                    <Link to="/signup" style={{color: "blue"}}>
                                        {"Нет аккаунта? Зарегистрироваться"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <AutohideSnackbar open={open} text={"Вход не удался"} setOpen={setOpen} duration={3000}></AutohideSnackbar>
            </div>

    );
}

export default Login