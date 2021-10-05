import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import axios from "axios";
import React from "react";
import config from './config.json';

function updateRead(article, readState) {
    axios.put(`${config.API}/articles/${article._id}`, { read: readState });
}

function ListView(props) {
    const [rowData, setRowData] = React.useState(null);
    React.useEffect(updateContent,[props.selected,props.feedid])

    async function updateContent() {
        try {
            setRowData(await getData())
        } catch (e) {
            console.log(e);
        }
    }

    let getData = async () => {
        return await (await axios.get(`${config.API}/feeds/${props.feedid}/articles`)).data
    }

    let Body = () => {
        if (!rowData) {
            return (
            <TableBody>
                <TableRow><TableCell>Loading...</TableCell></TableRow>
            </TableBody>
            )//TODO change the loading to replace the table instead of the the table body
        } else {
            return (
                <TableBody>
                    {
                        rowData.map((item) => {
                            let selState = false;
                            if (props.selected === item._id) {//check if the cell is selected (read it if it is)
                                selState = true;
                                updateRead(item, true);
                            }
                            let rowStyle = { 'fontWeight': item.read ? 'normal' : 'bold' };
                            return (
                                <TableRow style={rowStyle} selected={selState} key={item._id}>
                                    <TableCell onClick={() => props.clickFunc(item._id)}>{item.title}</TableCell>
                                    <TableCell><FiberManualRecordIcon onClick={() => updateRead(item, !item.read)} color={item.read ? 'action' : 'primary'} fontSize='small' /></TableCell>
                                    <TableCell>{item.pubDate}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            )
        }
    }

    let Header = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Read</TableCell>
                    <TableCell>PubDate</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    return (
        <Table size="small">
            <Header />
            <Body />
        </Table>
    )
}

export default ListView;