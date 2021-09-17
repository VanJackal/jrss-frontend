import React from "react";
import { TextField, Paper, Box, Button } from "@material-ui/core";

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
        alert(`${this.user.value} ${this.pass.value}`);
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
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default Login;