import axios from "axios";
import React from "react";
import config from './config.json';

function updateRead(article, readState) {
    article.read = readState;
    console.debug("updating readstate for: ", article)
    axios.patch(`${config.API}/articles/${article._id}`, { read: readState });
}

let getData = async (feedid) => {
    return await (await axios.get(`${config.API}/feeds/${feedid}/articles`)).data
}

let Header = () => {
    return (
        <thead>
            <tr>
                <td>Title</td>
                <td>Read</td>
                <td>PubDate</td>
            </tr>
        </thead>
    )
}

let ReadIndicator = () => {
    return (
        <div>&bull;</div>
    )
}

const ListItem = ({ item, articleID, clickFunc }) => {
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

    let readClick = () => {
        updateRead(item, !read);
        setRead(!read);
    }

    return (
        <tr className={"articles row" + (selState ? " selected" : "") + (read? "" : " unread")} key={item._id}>
            <td onClick={() => clickFunc(item._id)} className="articles title">{item.title}</td>
            <td onClick={readClick} className="articles readIndicator"><ReadIndicator read={read} /></td>
            <td className={"articles pubDate"}>{item.pubDate}</td>
        </tr>
    )
}

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
    }, [props.articleID, props.feedid, props.updated])

    let Body = () => {
        return (
            <tbody>
                {
                    rowData.map((item) => {
                        return (<ListItem key={item._id} item={item} articleID={props.selected} clickFunc={props.clickFunc} />)
                    })
                }
            </tbody>
        )
    }

    if (!rowData) {
        return (<p>Loading...</p>)
    } else {
        return (
            <table className="articles">
                <Header />
                <Body />
            </table>
        )
    }
}

export default ListView