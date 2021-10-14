import React from "react"
import ListView from "./ListView"
import ItemView from "./ItemView"
import FeedsView from "./FeedsView"
import TopBar from "./TopBar"
import { Grid } from "@material-ui/core"

const styles = {
  container: { display: "flex", flexDirection: "column", overflow: "auto", height: "100%", width: "100%" }
};

function App(props) {
  const [feedID, setFeedID] = React.useState(null);
  const [dataAge, setDataAge] = React.useState(new Date());

  let updateTime = () => {
    setDataAge(new Date());
  }

  let AppView = () => {
    return (
      <Grid container direction="row" style={styles.container}>
        <Grid item style={{ width: "20%" }}>
          <FeedsView clickFunc={setFeedID} selected={feedID} />
        </Grid>
        <Grid item style={{ width: "80%", height: "100%" }}>
          <FeedView />
        </Grid>
      </Grid>
    )
  }

  let FeedView = () => {
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

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: "auto" }}>
      <Grid container direction="column" style={styles.container} wrap="nowrap">
        <Grid item style={{ height: "3em", }}>
          <TopBar updateFunc={updateTime} feedid={feedID} />
        </Grid>
        <Grid item style={{ height: "calc(100% - 3em)" }}>
          <AppView />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
