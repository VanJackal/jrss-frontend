import React from "react"
import ListView from "./ListView"
import ItemView from "./ItemView"
import { Grid } from "@material-ui/core"

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {articleID:"60a829818fb25cc1440c7928", selected:[]}
  }

  changeArticle = (id) => {
    this.setState({articleID:id});
  }
  render() {
    return (
      <div style={{ height: '100vh' }} className="App">
        <Grid container style={{ height: "100%" }} direction="column">
          <Grid item xs={12} style={{ maxHeight: "40%", overflow: "auto" }}>
            <ListView selected={this.state.articleID} clickFunc={this.changeArticle}/>
          </Grid>
          <Grid item xs={12} style={{ maxHeight: "60%", overflow: "auto" }}>
            <ItemView articleID={this.state.articleID} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
