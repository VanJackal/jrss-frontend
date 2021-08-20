import ListView from "./ListView"
import ItemView from "./ItemView"
import { Grid } from "@material-ui/core"

let ItemViewID = "60a829818fb25cc1440c7928"
function App() {
  return (
    <div style={{height:'100vh'}}className="App">
      <Grid container style={{height:"100%"}} direction="column">
        <Grid item xs={12} style={{maxHeight:"40%", overflow:"auto"}}>
          <ListView />
        </Grid>
        <Grid item xs={12} style={{maxHeight:"60%", overflow:"auto"}}>
          <ItemView articleID={ItemViewID} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
