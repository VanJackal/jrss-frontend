import React from "react";
import axios from "axios";
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
const config = require("./config.json");

class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    refreshFeed = async () => {
        await axios.post(`${config.API}/articles`,{url:"http://node1.h.njackal.com/feed"})
    }

    render() {
        return (
            <div style={{ height: "3em" ,width : '100%'}}>
                <Toolbar variant="dense">
                    <IconButton size="small" onClick={()=>{this.refreshFeed()}}><Refresh /></IconButton>
                </Toolbar>
            </div>
        )
    }
}

export default TopBar;