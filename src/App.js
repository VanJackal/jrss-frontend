import React from "react"
import ListView from "./ListView"
import ItemView from "./ItemView"
import FeedsView from "./FeedsView"
import TopBar from "./TopBar"
import { Grid } from "@material-ui/core"

const styles = {
  container: { display: "flex", flexDirection: "column", overflow: "auto", height: "100%", width: "100%" }
};

let AppView = ({ feedID, selectFeed, dataAge }) => {
  return (
    <Grid container direction="row" style={styles.container}>
      <Grid item style={{ width: "20%", height:"100%", overflowY:"auto" }}>
        <FeedsView updated={dataAge} clickFunc={selectFeed} selected={feedID} />
      </Grid>
      <Grid item style={{ width: "80%", height: "100%" }}>
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
    <Grid container style={{ height: "100%" }} wrap="nowrap" direction="column">
      <Grid item xs={12} style={{ overflowY: "scroll", flexBasis: "40%" }}>
        <ListView updated={dataAge} feedid={feedID} selected={articleID} clickFunc={selectArticle} />
      </Grid>
      <Grid item xs={12} style={{ overflow: "auto", flexBasis: "60%" }}>
        <ItemView articleID={articleID} />
      </Grid>
    </Grid>
  )
}

function App(props) {
  const [feedID, setFeedID] = React.useState(null);
  const selectFeed = React.useCallback(id => {
    setFeedID(id);
  }, [])
  const [dataAge, setDataAge] = React.useState(new Date());

  let updateTime = () => {
    setDataAge(new Date());
  }


  return (
    <div style={{ height: '100vh', width: '100vw', overflow: "auto" }}>
      <Grid container direction="column" style={styles.container} wrap="nowrap">
        <Grid item style={{ height: "3em", }}>
          <TopBar updateFunc={updateTime} feedid={feedID} />
        </Grid>
        <Grid item style={{ height: "calc(100% - 3em)" }}>
          <AppView feedID={feedID} selectFeed={selectFeed} dataAge={dataAge} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
