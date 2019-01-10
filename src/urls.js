export function urlMainApp () {
    return '/api/noticeboard/'
}

export function url_search_get_param(url, search_keyword) {
    if (search_keyword) {
        url += `&keyword=${search_keyword}`;
    }
    return url;
}

export function urlExpiredNotices (page, search_keyword) {
    let url = `${urlMainApp()}old/?page=${page}`;
    return url_search_get_param(url, search_keyword);
}

export function urlNotices (page, search_keyword) {
    let url = `${urlMainApp()}new/?page=${page}`;
    return url_search_get_param(url, search_keyword);
}

export function urlBookmarkedNotices (page) {
    return `${urlMainApp()}star_filter_view/?page=${page}`
}

export function urlNotice (id, expired) {
    if (!expired) {
       return `${urlMainApp()}new/${id}/`;
    } else {
        return `${urlMainApp()}old/${id}/`
    }
}

export function urlFilterList() {
    return `${urlMainApp()}filter_list/`
}

export function urlFilter (page, banner_id, search_keyword) {
    let url = `${urlMainApp()}filter/?banner=${banner_id}&page=${page}`;
    return url_search_get_param(url, search_keyword);
}

export function urlDateFilter(page, start, end, banner_id, search_keyword) {
    let url;
    url = `${urlMainApp()}date_filter_view/?start=${start}&end=${end}&page=${page}`;

    if (banner_id) {
        url += `&banner=${banner_id}`;
    }
    return url_search_get_param(url, search_keyword);
}

export function urlStarRead () {
    return `${urlMainApp()}star_read/`
}