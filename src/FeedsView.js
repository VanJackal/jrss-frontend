import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
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

const FeedListItem = ({ selected, item, clickFunc }) => {
    let selState = false;
    if (selected === item._id) {//check if the cell is selected (read it if it is)
        selState = true;
    }
    return (
        <TreeItem nodeId={item._id} label={item.title}/>
    )
    /*
    return (
        <TableRow selected={selState} key={item._id}>
            <TableCell onClick={() => { clickFunc(item._id) }}>{item.title}</TableCell>
            <TableCell >{item.unread}</TableCell>
        </TableRow>
    )
    */
}

function FeedsView(props) {
    const [rowData, setRowData] = React.useState(null);
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
            <TreeView onNodeSelect={(_, selected) => { props.clickFunc(selected) }}>
                {
                    rowData.map((item) => {
                        return (<FeedListItem key={item._id} selected={props.selected} item={item} clickFunc={props.clickFunc} />)
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