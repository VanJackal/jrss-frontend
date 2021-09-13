import React from "react"
import ListView from "./ListView"
import ItemView from "./ItemView"
import FeedsView from "./FeedsView"
import TopBar from "./TopBar"
import { Grid } from "@material-ui/core"

const styles = {
  container: {display:"flex", flexDirection: "column", overflow:"auto", height:"100%",width:"100%" }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { articleID: null, feedID: null, selected: [] }
  }

  changeArticle = (id) => {
    this.setState({ articleID: id });
  }
  changeFeed = (id) =>{
    this.setState({feedID:id});
  }
  render() {
    return (
      <div style={{ height: '100vh', width: '100vw', overflow:"auto"}}>
        <Grid container direction="column" style={styles.container} wrap="nowrap">
          <Grid item style={{height:"3em",}}>
            <TopBar feedid={this.state.feedID}/>
          </Grid>
          <Grid item style={{height:"calc(100% - 3em)"}}>
            <this.AppView/>
          </Grid>
        </Grid>
      </div>
    );
  }

  AppView = () => {
    return (
      <Grid container direction="row" style={styles.container}>
        <Grid item>
          <FeedsView clickFunc={this.changeFeed} selected={this.state.feedID}/>
        </Grid>
        <Grid item style={{height:"100%"}}>
          <this.FeedView/>
        </Grid>
      </Grid>
    )
  }

  FeedView = () => {
    return (
      <Grid container style={{ height: "100%" }} wrap="nowrap" direction="column">
        <Grid item xs={12} style={{ overflowY: "scroll", flexBasis:"40%"}}>
          <ListView feedid={this.state.feedID} selected={this.state.articleID} clickFunc={this.changeArticle} />
        </Grid>
        <Grid item xs={12} style={{ overflow: "auto", flexBasis:"60%"}}>
          <ItemView articleID={this.state.articleID} />
        </Grid>
      </Grid>
    )
  }
}

export default App;
