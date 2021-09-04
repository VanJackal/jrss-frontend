import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"

class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: "3em" ,width : '100%'}}>
                <Toolbar variant="dense">
                    <IconButton size="small"><Refresh /></IconButton>
                </Toolbar>
            </div>
        )
    }
}

export default TopBar;