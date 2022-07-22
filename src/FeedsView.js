import React from "react";

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
    const [expanded, setExpanded] = React.useState([]);

    let Body = () => {
        console.debug("New rowData:",props.feeds)
        return (
            <tbody>
            {
                props.feeds.map((row) => {
                    return (<FeedListItem item={row} key={row._id} onClick={props.clickFunc} selected={props.selected}/>)
                })
            }
            </tbody>
        )
    }

    if (!props.feeds) {
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