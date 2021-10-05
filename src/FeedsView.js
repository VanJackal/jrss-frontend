import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import axios from "axios";
import React from "react";
import config from './config.json';

function FeedsView(props) {
    const [rowData, setRowData] = React.useState(null);
    React.useEffect(updateContent);

    async function updateContent() {
        try {
            setRowData(await getData());
        } catch (e) {
            console.log(e);
        }
    }

    let getData = async () => {
        return await (await axios.get(`${config.API}/feeds`)).data
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
                            }
                            return (
                                <TableRow selected={selState} key={item._id}>
                                    <TableCell onClick={() => { props.clickFunc(item._id) }}>{item.title || "Loading..."}</TableCell>
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
                    <TableCell>Feed</TableCell>
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

export default FeedsView;