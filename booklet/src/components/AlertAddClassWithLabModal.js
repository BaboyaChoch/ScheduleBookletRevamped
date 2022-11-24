import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MiniCoursesTable from "./MiniCoursesTable";
import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: 24,
    width: "20vw",
    borderRadius: 12,
  },
  modalItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalActionsButtons: {
    borderRadius: "15px !important",
    fontSize: "11px !important",
    fontWeight: "700 !important",
  },
  warnIcon: {
    position: "absolute",
    top: "-24.5%",
    left: "34%",
    backgroundColor: "#ff9800",
    borderRadius: 15,
  },
});

export default function AlertAddClassWithLabModal({
  rows,
  open,
  onClose,
  onAddClass,
}) {
  const classes = useStyles();

  const handleOnAddClass = () => {
    onAddClass();
    onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.root}>
            <Grid container direction="column" spacing={1}>
              <Grid
                className={classes.modalItem}
                item
                container
                direction="column"
                // sx={{ paddingTop: 10 }}
              >
                {/*<Grid item>*/}
                {/*  <Box className={classes.warnIcon}>*/}
                {/*    <WarningAmberIcon sx={{ fontSize: 120, color: "white" }} />*/}
                {/*  </Box>*/}
                {/*</Grid>*/}
                <Grid>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Add Class?
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Divider
                    orientation="horizontal"
                    sx={{ backgroundColor: "#E0E0E0", width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.modalItem} item>
                <Typography variant="subtitle2">
                  This class has a lab
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  marginLeft: 1,
                  marginRight: 1,
                }}
              >
                <MiniCoursesTable isLab rows={rows} />
              </Grid>
              <Grid className={classes.modalItem} item>
                <Typography variant="subtitle2">
                  Do you still want to add it?
                </Typography>
              </Grid>
              <Grid
                className={classes.modalItem}
                item
                container
                sx={{ paddingBottom: 1 }}
              >
                <Grid item>
                  <Box boxShadow={1} sx={{ borderRadius: 15,  height: 'fit-content' }}>
                    <Button
                      className={classes.modalActionsButtons}
                      variant="contained"
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleOnAddClass()}
                      color="success"
                      sx={{ color: "white" }}
                    >
                      Add Class
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={0.2} />
                <Grid item>
                  <Box boxShadow={1} sx={{ borderRadius: 15, height: 'fit-content' }}>
                    <Button
                      className={classes.modalActionsButtons}
                      variant="contained"
                      aria-label="expand row"
                      size="small"
                      onClick={onClose}
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}