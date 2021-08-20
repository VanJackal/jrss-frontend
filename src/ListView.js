import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import axios from "axios";
import React from "react";
const config = require("./config.json");

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rowData: null }
    }

    componentDidMount() {
        if (!this.state.data) {
            (
                async () => {
                    try {
                        this.setState({ rowData: await this.getData() })
                    } catch (e) {
                        console.log(e);
                    }
                }
            )();
        }
    }

    getData = async () => {
        return await (await axios.get(`${config.API}/articles`)).data
    }

    Body = () => {
        if (!this.state.rowData) {
            return (<p>Loading...</p>)
        } else {
            return (
                <TableBody>
                    {
                        this.state.rowData.map((item) => (
                            <TableRow>
                                <TableCell>{item.title}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            )
        }
    }

    Header = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    render = () => {
        return (
            <Table size="small">
                <this.Header />
                {this.Body() || "test"}
            </Table>
        )
    }
}

export default ListView;