import { Box, Typography } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import axios from "axios";
import React from "react";
import config from './config.json';

let getData = async () => {
    return await (await axios.get(`${config.API}/feeds`)).data
}

let Header = () => {
    return (
        <p>Feeds</p>
    )
}

const FeedListItem = ({ item }) => {
    return (
        <TreeItem nodeId={item._id} label={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ flexGrow: 1 }}>{item.title}</Typography>
                <Typography variant="caption">{item.unread}</Typography>
            </Box>
        } />
    )
}

function FolderFeeds(props) {
    return (
        <TreeItem nodeId={props.folder} label={props.folder}>
            {
                props.feeds.map((item) => {
                    return (
                        <FeedListItem item={item} />
                    )
                })
            }
        </TreeItem>
    )
}

function FeedsView(props) {
    const [rowData, setRowData] = React.useState(null);
    const [expanded, setExpanded] = React.useState([]);
    React.useEffect(() => {
        let updateData = async () => {
            try {
                setRowData(await getData());
            } catch (e) {
                console.log(e);
            }
        }
        updateData()
    }, [props.updated]);

    let Body = () => {
        return (
            <TreeView selected={props.selected} expanded={expanded} onNodeToggle={(_, expanded) => { setExpanded(expanded) }} onNodeSelect={(_, selected) => { props.clickFunc(selected) }}>
                {
                    rowData.map((folder) => {
                        return (
                            <FolderFeeds folder={folder.folder} feeds={folder.feeds} />
                        )
                    })
                }
            </TreeView>
        )
    }

    if (!rowData) {
        return (<p>Loading...</p>)
    } else {
        return (
            <>
                <Header />
                <Body />
            </>
        )
    }
}

export default FeedsView