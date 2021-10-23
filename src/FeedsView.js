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
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <Typography sx={{flexGrow:1}}>{item.title}</Typography>
                <Typography variant="caption">{item.unread}</Typography>
            </Box>
        } />
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
            <TreeView expanded={expanded} onNodeToggle={(_, expanded) => { setExpanded(expanded) }} onNodeSelect={(_, selected) => { props.clickFunc(selected) }}>
                <TreeItem nodeId={"header"} label="feeds">
                    {
                        rowData.map((item) => {
                            return (<FeedListItem item={item}/>)
                        })
                    }
                </TreeItem>
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