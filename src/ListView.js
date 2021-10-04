import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import axios from "axios";
import React from "react";
import config from './config.json';

function updateRead(article, readState){
    axios.put(`${config.API}/articles/${article._id}`,{read:readState});
}

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rowData: null }
    }

    componentDidMount() {
        this.updateContent();
    }

    componentDidUpdate() {//I think this is a inefficient way of doing this but it works for now
        this.updateContent();//TODO Improve improve this so the entire list isnt reloaded
    }

    updateContent() {
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
        return await (await axios.get(`${config.API}/feeds/${this.props.feedid}/articles`)).data
    }

    Body = () => {
        if (!this.state.rowData) {
            return (<TableBody>
                <TableRow><TableCell>Loading...</TableCell></TableRow>
            </TableBody>)//TODO change the loading to replace the table instead of the the table body
        } else {
            return (
                <TableBody>
                    {
                        this.state.rowData.map((item) => {
                            let selState = false;
                            if(this.props.selected === item._id){//check if the cell is selected (read it if it is)
                                selState = true;
                                updateRead(item, true);
                            }
                            let rowStyle = {'fontWeight': item.read ? 'normal' : 'bold'};
                            return(
                            <TableRow style={rowStyle} selected={selState} key={item._id}>
                                <TableCell onClick={() => this.props.clickFunc(item._id)}>{item.title}</TableCell>
                                <TableCell><FiberManualRecordIcon onClick={() => updateRead(item,!item.read)} color={item.read ? 'action' : 'primary'} fontSize='small'/></TableCell>
                                <TableCell>{item.pubDate}</TableCell>
                            </TableRow>
                        )})
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
                    <TableCell>Read</TableCell>
                    <TableCell>PubDate</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    render = () => {
        return (
            <Table size="small">
                <this.Header />
                <this.Body />
            </Table>
        )
    }
}

export default ListView;