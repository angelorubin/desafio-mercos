import React from "react";
import { Dialog } from "@material-ui/core";

const CustomDialog = ({
  maxWidth,
  fullWidth,
  children,
  closeDialog,
  openDialog,
  title,
}) => {
  return (
    <Dialog
      fullWidth={fullWidth ? true : false}
      maxWidth={maxWidth ? maxWidth : "xs"}
      open={openDialog}
      onClose={closeDialog}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
