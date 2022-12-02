import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: 24,
    width: "fit-content",
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

export default function AlertUser({
  open,
  onClose,
  onAccept,
  titleLabel,
  acceptLabel,
  message = null,
  isScheduleAlert = false,
  scheduleConflicts = [],
}) {
  const classes = useStyles();

  const handleOnAccept = () => {
    onAccept();
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
                  <Typography variant="h5" sx={{ fontWeight: 700, p: 1 }}>
                    {titleLabel}
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
              <Grid
                className={classes.modalItem}
                item
                container
                direction={"column"}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    textAlign={"center"}
                    sx={{ m: 1 }}
                  >
                    {message}
                  </Typography>
                </Grid>
                {isScheduleAlert ? (
                  <Grid item>
                    <Stack divider={<Divider />} spacing={1}>
                      {scheduleConflicts.map((conflict, index) => {
                        console.log(conflict);
                        return (
                          <Typography
                            key={index}
                            color={"error"}
                            sx={{ fontWeight: 600 }}
                          >
                            {`${conflict.day} - ${conflict.classA} - ${conflict.classB}`}
                          </Typography>
                        );
                      })}
                    </Stack>
                  </Grid>
                ) : null}
              </Grid>
              <Grid
                className={classes.modalItem}
                item
                container
                sx={{ paddingBottom: 1 }}
              >
                <Grid item>
                  <Box
                    boxShadow={1}
                    sx={{ borderRadius: 15, height: "fit-content" }}
                  >
                    <Button
                      className={classes.modalActionsButtons}
                      variant="contained"
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleOnAccept()}
                      color="success"
                      sx={{ color: "white" }}
                    >
                      {acceptLabel}
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={0.2} />
                <Grid item>
                  <Box
                    boxShadow={1}
                    sx={{ borderRadius: 15, height: "fit-content" }}
                  >
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
