import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

type SnackProps = {
    text: string
    duration: number
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setText?: React.Dispatch<React.SetStateAction<string>>
}

export default function AutohideSnackbar(props: SnackProps) {

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={props.open}
                autoHideDuration={props.duration}
                onClose={handleClose}
                message={props.text}
                anchorOrigin={{vertical:"top", horizontal:"center"}}
            />
        </div>
    );
}