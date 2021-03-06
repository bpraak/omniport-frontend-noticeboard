import { BOOKMARK_NOTICE } from '../constants/action-types'
import { getCookie } from 'formula_one'
import { urlStarRead } from '../urls'
import { toast } from 'react-semantic-toasts'

function bookmarkNotice (noticeIdList, toggle) {
  return {
    type: BOOKMARK_NOTICE,
    payload: {
      noticeIdList: noticeIdList,
      toggle: toggle
    }
  }
}

export const noticeBookmark = (noticeIdList, toggle) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    }
    let keyword

    if (toggle) {
      keyword = 'star'
    } else {
      keyword = 'unstar'
    }

    let body = JSON.stringify({
      keyword: keyword,
      notices: noticeIdList
    })
    return fetch(urlStarRead(), {
      method: 'post',
      headers: headers,
      body: body
    })
      .then(response => dispatch(bookmarkNotice(noticeIdList, toggle)))
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
                type: 'error',
                title:
                  keyword === 'star'
                    ? 'Unable to bookmark!'
                    : 'Delete bookmark failed!'
              })
            : toast({
                type: 'error',
                title:
                  keyword === 'star'
                    ? 'Unable to bookmark!'
                    : 'Delete bookmark failed!'
              })
        } else {
          toast({
            type: 'error',
            title:
              keyword === 'star'
                ? 'Unable to bookmark!'
                : 'Delete bookmark failed!'
          })
        }
      })
  }
}
