import React from "react"
import ListView from "./ListView"
import ItemView from "./ItemView"
import FeedsView from "./FeedsView"
import TopBar from "./TopBar"
import {Grid} from "@material-ui/core"


let AppView = ({feedID, selectFeed, dataAge}) => {
    return (
        <Grid container direction="row">
            <Grid item style={{width: "20%", height: "100%", overflowY: "auto"}}>
                <FeedsView updated={dataAge} clickFunc={selectFeed} selected={feedID}/>
            </Grid>
            <Grid item style={{width: "80%", height: "100%"}}>
                <FeedView feedID={feedID} dataAge={dataAge}/>
            </Grid>
        </Grid>
    )
}

let FeedView = ({feedID, dataAge}) => {
    const [articleID, setArticleID] = React.useState(null);

    const selectArticle = React.useCallback(id => {
        setArticleID(id)
    }, [])
    return (
        <Grid container style={{height: "100%"}} wrap="nowrap" direction="column">
            <Grid item xs={12} style={{overflowY: "scroll", flexBasis: "40%"}}>
            </Grid>
            <Grid item xs={12} style={{overflow: "auto", flexBasis: "60%"}}>
            </Grid>
        </Grid>
    )
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


    return (
        <div className="wrapper">
            <div className="grid header">
                <TopBar feedid={feedID} updateFunc={updateTime}/>
            </div>
            <div className="grid content">
                <div className="grid feeds">
                    <FeedsView updated={dataAge} clickFunc={selectFeed} selected={feedID}/>
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
