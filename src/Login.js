import React from "react";
import axios from "axios";
import { TextField, Paper, Box, Button } from "@material-ui/core";
import config from './config.json';

class Login extends React.Component {
    style = {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection:"column",
    }
    itemStyle = {
        margin:"2px"
    }
    user = null;
    pass = null;

    handleButton = () => {
        axios.post(`${config.API}/users/login`,{username:this.user.value,password:this.pass.value}).then((res) => {
            console.log(res.status);
            console.log(res)
            if(res.status === 200){
                //this.props.history.push("/");
            }
        });
    }

    render() {
        return (
            <Box sx={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            >
                <Paper elevation={3} style={this.style}>
                    <Box sx={{ padding:"10px", display:"flex", flexDirection:"column" }}>
                        <TextField inputRef={ref => { this.user = ref }} style={this.itemStyle} id="username" label="Username" variant="outlined" />
                        <TextField inputRef={ref => { this.pass = ref }} style={this.itemStyle} type="password" id="password" label="Password" variant="outlined" />
                        <Button onClick={this.handleButton} style={this.itemStyle} variant="contained">Login</Button>
                        <a href="/">Test</a>
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default Login;