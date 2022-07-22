import React from "react"
import axios from "axios"
import ListView from "./ListView"
import ItemView from "./ItemView"
import FeedsView from "./FeedsView"
import TopBar from "./TopBar"
import config from "./config.json"

let getFeeds = async () => {
    return (await axios.get(`${config.API}/feeds`)).data
}

function App(props) {
    const [feedID, setFeedID] = React.useState(null);
    const selectFeed = React.useCallback(id => {
        console.debug(`Selected new feed:`,id)
        setFeedID(id);
    }, [])

    const [articleID, setArticleID] = React.useState(null);
    const selectArticle = React.useCallback(id => {
        setArticleID(id)
    }, [])

    const [dataAge, setDataAge] = React.useState(new Date());

    let updateTime = () => {
        setDataAge(new Date());
    }
    const [feeds, setFeeds] = React.useState(null);
    React.useEffect(() => {
        getFeeds().then((feeds) => {setFeeds(feeds)})
    }, [dataAge])

    const updateFeed = (feedid, feed) => {//TODO this function updates the feeds with any changes in its feed variable
        feeds.find((feed) => {
            return feed._id === feedid;
        })

    }

    return (
        <div className="wrapper">
            <div className="grid header">
                <TopBar feedid={feedID} updateFunc={updateTime}/>
            </div>
            <div className="grid content">
                <div className="grid feeds">
                    <FeedsView updated={dataAge} clickFunc={selectFeed} selected={feedID} feeds={feeds}/>
                </div>
                <div className="grid feed">
                    <div className="grid articles">
                        <ListView updated={dataAge} feedid={feedID} selected={articleID} clickFunc={selectArticle}/>
                    </div>
                    <div className="grid article">
                        <ItemView articleID={articleID}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
