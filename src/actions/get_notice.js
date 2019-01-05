import { GET_NOTICE, REQUEST_NOTICE } from "../constants/action-types";
import { urlNotice } from "../urls";

function requestNotice(notice_id) {
    return {
        type: REQUEST_NOTICE,
        payload: {
            notice_id: notice_id,
            is_fetching_notice: true
        }
    }
}

function receiveNotice(notice_data) {
  return {
    type: GET_NOTICE,
    payload: {
        notice: notice_data
    }
  }
}

export default function GetNotice(notice_id) {
  return (dispatch) => {
    dispatch(requestNotice(notice_id));
    return fetch(urlNotice(notice_id))
      .then(response => response.json())
      .then(json => dispatch(receiveNotice(json)))
  }
}