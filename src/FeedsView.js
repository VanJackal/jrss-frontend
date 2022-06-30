import axios from "axios";
import React from "react";
import config from './config.json';

let getData = async () => {
    return await (await axios.get(`${config.API}/feeds`)).data
}

let Header = () => {
    return (
        <thead>
        <tr>
            <th colSpan={2}>Feeds</th>
        </tr>
        </thead>
    )
}

const FeedListItem = ({selected,item, onClick}) => {
    let classes = "feeds-item"
    classes += selected===item._id ? " selected" : ""
    return (
        <tr className={classes} onClick={() => {
            onClick(item._id);
        }}>
            <td className="feed-name">{item.title}</td>
            <td className="unread">{item.unread}</td>
        </tr>
    )
}

function FeedsView(props) {
    const [rowData, setRowData] = React.useState([]);
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
        console.debug("New rowData:",rowData)
        return (
            <tbody>
            {
                rowData.map((row) => {
                    return (<FeedListItem item={row} key={row._id} onClick={props.clickFunc} selected={props.selected}/>)
                })
            }
            </tbody>
        )
    }

    if (!rowData) {
        return (<p>Loading...</p>)
    } else {
        return (
            <table className="feeds">
                <Header />
                <Body />
            </table>
        )
    }
}

export default FeedsView