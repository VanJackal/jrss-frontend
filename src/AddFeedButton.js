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

export default function AddFeedButton() {
  const [open, setOpen] = React.useState(false);

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
      }
      addFeed(feed);
      handleClose();
    } else {
      getFeedInfo();
    }
  }

  let addFeed = async (feed) => {
    await axios.post(`${config.API}/feeds`, feed);
  }

  let getFeedInfo = async () => {
    axios.post(`${config.API}/util/feeds/info`, { url: formInput.url.value }).then(res => {
      setRecievedInfo({
        description:res.data.description,
        title:res.data.title,
        url:formInput.url.value
      });
      console.log(infoPresets);
    });
  }

  let GetDialogContent = () => {
    if (infoPresets) {
      console.log(infoPresets)
      return (
        <DialogContent>
          <DialogContentText>
            Enter a Feed URL
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
            Enter a Feed URL
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={ref => { formInput.url = ref }}
            margin="dense"
            id="name"
            label="Feed URL"
            fullWidth
          />
        </DialogContent>
      )
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        AddFeed
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">Add Feed</DialogTitle>
        <GetDialogContent />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}