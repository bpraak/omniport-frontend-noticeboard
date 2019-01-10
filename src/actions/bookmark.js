import { BOOKMARK_NOTICE } from "../constants/action-types";
import { urlWhoAmI, urlGetMaintainers, getCookie } from 'formula_one';
import { urlNotice, urlStarRead } from "../urls";


function BookmarkNotice(notice_id_list, toggle) {

  return {
    type: BOOKMARK_NOTICE,
    payload: {
        notice_id_list: notice_id_list,
        toggle: toggle
    }
  }
}

export default function NoticeBookmark(notice_id_list, toggle) {

  return (dispatch) => {
     let headers = {
         'Content-Type': 'application/json',
         'X-CSRFToken': getCookie('csrftoken')
     };
     let keyword;

     if (toggle) {
         keyword = 'star';
     } else {
         keyword = 'unstar';
     }

     let body = JSON.stringify({
         keyword: keyword,
         notices: notice_id_list
     });
     return fetch(urlStarRead(),
           {method: 'post', headers: headers, body: body})
         .then(response => dispatch(BookmarkNotice(notice_id_list, toggle)));
  }
}