import { apiCall } from "api";
import { openAlertMessage } from "./alertActions";
import { ENDPOINTS } from "constants/AppConstants";

export const auctionActions = {
  SET_LIVE_AUCTIONS: "AUCTION.SET_LIVE_AUCTIONS",
  SET_UPCOMING_AUCTIONS: "AUCTION.SET_UPCOMING_AUCTIONS",
  SET_MY_AUCTIONS: "AUCTION.SET_MY_AUCTIONS",
};

export const getAuctionActions = (dispatch) => {
  return {
    createAuction: (auctionDetails) => dispatch(createAuction(auctionDetails)),
    getLiveAuctions: () => dispatch(getLiveAuctions()),
    getUpcomingAuctions: () => dispatch(getUpcomingAuctions()),
    getMyAuctions: () => dispatch(getMyAuctions()),
    setLiveAuctions: (data) => dispatch(setLiveAuctions(data)),
    setUpcomingAuctions: (data) => dispatch(setUpcomingAuctions(data)),
    setMyAuctions: (data) => dispatch(setMyAuctions(data)),
    getAuctionDetails: (auctionId) => dispatch(getAuctionDetails(auctionId)),
  };
};

export const setLiveAuctions = (data) => {
  return {
    type: auctionActions.SET_LIVE_AUCTIONS,
    data,
  };
};

export const setUpcomingAuctions = (data) => {
  return {
    type: auctionActions.SET_UPCOMING_AUCTIONS,
    data,
  };
};

export const setMyAuctions = (data) => {
  return {
    type: auctionActions.SET_MY_AUCTIONS,
    data,
  };
};

export const createAuction = (auctionDetails) => {
  return async (dispatch) => {
    const response = await apiCall(auctionDetails, ENDPOINTS.CREATE_AUCTION, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
    }
  };
};

export const getLiveAuctions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_LIVE_AUCTIONS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setLiveAuctions(response?.data));
    }
  };
};

export const getUpcomingAuctions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_UPCOMING_AUCTIONS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setUpcomingAuctions(response?.data));
    }
  };
};

export const getMyAuctions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_MY_AUCTIONS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setMyAuctions(response?.data));
    }
  };
};

export const getAuctionDetails = (auctionId) => {
  return async (dispatch) => {
    const response = await apiCall(
      {},
      ENDPOINTS.GET_AUCTION_DETAILS + "?auctionId=" + auctionId,
      "GET"
    );
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
    }
  };
};
