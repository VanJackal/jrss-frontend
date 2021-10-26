import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from './config.json';

export default function EditFeedButton(props) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{
    getFeedInfo();
  },[props.feedid])

  let formInput = {};
  const [infoPresets, setRecievedInfo] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRecievedInfo(null);
  };

  const handleSubmit = () => {
    if (infoPresets) {
      let feed = {
        link: formInput.url.value,
        title: formInput.title.value,
        feedid: formInput.id.value,
        description: formInput.desc.value,
        folder: formInput.folder.value,
      }
      editFeed(feed);
      handleClose();
    }
  }

  let editFeed = async (feed) => {
    await axios.put(`${config.API}/feeds/${props.feedid}`, feed);
  }

  let getFeedInfo = async () => {//TODO update this
    if(!props.feedid){
      return;
    }
    axios.get(`${config.API}/feeds/${props.feedid}`).then(res => {
      setRecievedInfo({
        url: res.data.link,
        title: res.data.title,
        feedid: res.data.feedid,
        description: res.data.description,
        folder: res.data.folder,
      });
    });
  }

  let GetDialogContent = () => {
    if (infoPresets) {
      return (
        <DialogContent>
          <DialogContentText>
            Enter Changes To Feed
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={ref => { formInput.url = ref }}
            margin="dense"
            id="name"
            label="Feed URL"
            value={infoPresets?.url || ""}
            fullWidth
          />
          <TextField
            autoFocus
            inputRef={ref => { formInput.title = ref }}
            margin="dense"
            id="name"
            label="FeedTitle"
            defaultValue={infoPresets?.title || ""}
            fullWidth
          />
          <TextField
            autoFocus
            inputRef={ref => { formInput.id = ref }}
            margin="dense"
            id="name"
            label="FeedID"
            fullWidth
          />
          <TextField
            autoFocus
            inputRef={ref => { formInput.folder = ref }}
            margin="dense"
            id="name"
            label="Folder"
            defaultValue={infoPresets?.folder || "Loading"}
            fullWidth
          />
          <TextField
            autoFocus
            inputRef={ref => { formInput.desc = ref }}
            margin="dense"
            id="name"
            label="FeedDescription"
            defaultValue={infoPresets?.description || "Loading"}
            fullWidth
          />
        </DialogContent>
      )
    } else {
      return (
        <DialogContent>
          <DialogContentText>
            Loading...
          </DialogContentText>
        </DialogContent>
      )
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">Edit Feed</DialogTitle>
        <GetDialogContent />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}