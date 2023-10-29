/* eslint-disable react/prop-types */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CreateAuction from "./components/CreateAuction";

// Code Pulse React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";

// Data
import MDButton from "components/MDButton";
import { IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "context";
import UserCreatedAuctionsData from "./data/UserCreatedAuctionsData";
import { connect } from "react-redux";
import { getAuctionActions } from "app/actions/auctionActions";
import UpcomingAuctionsData from "./data/UpcomingAuctionsData";
import LiveAuctionsData from "./data/LiveAuctionsData";

const Tables = ({
  getLiveAuctions,
  getUpcomingAuctions,
  getMyAuctions,
  liveAuctions,
  upcomingAuctions,
  myAuctions,
}) => {
  const [open, setOpen] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const { columns, rows } = UpcomingAuctionsData(upcomingAuctions);
  const { columns: pColumns, rows: pRows } = UserCreatedAuctionsData(myAuctions);
  const { columns: lColumns, rows: lRows } = LiveAuctionsData(liveAuctions);

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  useEffect(() => {
    getLiveAuctions();
    getUpcomingAuctions();
    getMyAuctions();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Live Auctions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: lColumns, rows: lRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Upcoming Auctions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h6" color="white">
                  Your Created Auctions
                </MDTypography>
                <MDBox>
                  <MDButton color="dark" variant="gradient" onClick={() => setOpen(true)}>
                    Create New Auction
                  </MDButton>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <MDBox mx={50}>
                      <Card>
                        <MDBox
                          sx={{
                            px: 2,
                            py: 1,
                          }}
                          id="modal-modal-title"
                        >
                          <MDBox
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <MDTypography variant="h6" component="h2">
                              Create Auction
                            </MDTypography>
                            <MDBox>
                              <IconButton
                                sx={navbarIconButton}
                                aria-label="Delete"
                                onClick={handleClose}
                              >
                                <CloseIcon sx={iconsStyle} />
                              </IconButton>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                        <CreateAuction handleClose={handleClose} />
                      </Card>
                    </MDBox>
                  </Modal>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

const mapStoreStateToProps = ({ auction }) => {
  return {
    ...auction,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuctionActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Tables);
