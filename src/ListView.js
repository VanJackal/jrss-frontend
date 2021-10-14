import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import axios from "axios";
import React from "react";
import config from './config.json';

function updateRead(article, readState) {
    article.read = readState;
    axios.put(`${config.API}/articles/${article._id}`, { read: readState });
}

let getData = async (feedid) => {
    return await (await axios.get(`${config.API}/feeds/${feedid}/articles`)).data
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

const ListItem = React.memo(({ item, articleID, clickFunc }) => {
    const [read, setRead] = React.useState(item.read);

    let selState = false;
    if (articleID === item._id) {//check if the cell is selected (read it if it is)
        selState = true;
        if (!read) {
            item.read = true;
            setRead(true);
            updateRead(item, true);
        }
    }
    let rowStyle = { 'fontWeight': read ? 'normal' : 'bold' };

    let readClick = () => {
        updateRead(item, !read);
        setRead(!read);
    }

    return (
        <TableRow style={rowStyle} selected={selState} key={item._id}>
            <TableCell onClick={() => clickFunc(item._id)}>{item.title}</TableCell>
            <TableCell><FiberManualRecordIcon onClick={readClick} color={read ? 'action' : 'primary'} fontSize='small' /></TableCell>
            <TableCell>{item.pubDate}</TableCell>
        </TableRow>
    )
}, (prev, next) => {
    return prev.item.read === next.read && prev.articleID === next.articleID;
})

function ListView(props) {
    const [rowData, setRowData] = React.useState(null);
    React.useEffect(() => {
        async function updateContent() {
            try {
                setRowData(await getData(props.feedid))
            } catch (e) {
                console.log(e);
            }
        }

        updateContent()
    }, [props.articleID, props.feedid])

    let Body = () => {
        return (
            <TableBody>
                {
                    rowData.map((item) => {
                        return (<ListItem key={item._id} item={item} articleID={props.selected} clickFunc={props.clickFunc} />)
                    })
                }
            </TableBody>
        )
    }

    if (!rowData) {
        return (<p>Loading...</p>)
    } else {
        return (
            <Table size="small">
                <Header />
                <Body />
            </Table>
        )
    }
}

export default React.memo(ListView, (prev, next) => {
    return prev.selected === next.selected && prev.feedid === next.feedid && prev.updated === next.updated;
});