import React from "react";
import axios from "axios";
import { TextField, Paper, Box, Button } from "@material-ui/core";
import config from './config.json';

function Register() {
    const style = {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    }
    const itemStyle = {
        margin: "2px"
    }
    let user = null;
    let pass = null;

    let handleButton = () => {
        axios.post(`${config.API}/users/register`, { username: user.value, password: pass.value }).then((res) => {
            console.log(res.status);
            console.log(res)
            if (res.status === 409) {
                console.log(res.message);
            }
        });
    }

    return (
        <Box sx={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
        }}
        >
            <Paper elevation={3} style={style}>
                <Box sx={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                    <TextField inputRef={ref => { user = ref }} style={itemStyle} id="username" label="Username" variant="outlined" />
                    <TextField inputRef={ref => { pass = ref }} style={itemStyle} type="password" id="password" label="Password" variant="outlined" />
                    <Button onClick={handleButton} style={itemStyle} variant="contained">Register</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Register;