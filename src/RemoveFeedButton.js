import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const config = require("./config.json");

export default function AddFeedButton(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    removeFeed();
    handleClose();
  }

  let removeFeed = async () =>{
    await axios.delete(`${config.API}/feeds/${props.feedid}`);
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        RemoveFeed
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">Remove Feed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this feed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}