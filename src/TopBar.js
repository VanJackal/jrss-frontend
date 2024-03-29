import React from "react";
import axios from "axios";
import { Toolbar, IconButton } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import AddFeedButton from "./AddFeedButton";
import EditFeedButton from "./EditFeedButton";
import RemoveFeedButton from "./RemoveFeedButton";
import config from './config.json';

function TopBar(props) {

    let refreshFeed = async () => {
        await axios.post(`${config.API}/util/feeds/refresh`)
        props.updateFunc();
    }

    return (
        <div style={{ height: "3em", width: '100%' }}>
            <Toolbar variant="dense">
                <IconButton size="small" onClick={() => { refreshFeed() }}><Refresh /></IconButton>
                <AddFeedButton />
                <EditFeedButton feedid={props.feedid} />
                <RemoveFeedButton feedid={props.feedid} />
            </Toolbar>
        </div>
    )
}

export default TopBar;