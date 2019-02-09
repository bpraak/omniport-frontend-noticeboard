import React, { Component } from 'react';
import { Container, Divider, Segment, Header, Loader, Popup, Icon } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import { Editor } from '@tinymce/tinymce-react';
import { connect } from "react-redux";
import moment from 'moment';

const timeoutLength = 1000;

const mapStateToProps = state => {

    if (!state.GetNotice.is_fetching_notice) {
        return {
            notice: state.GetNotice.notice,
            notice_exists: state.GetNotice.notice_exists,
            is_fetching_notice: state.GetNotice.is_fetching_notice,
        };
    } else {
        return {
            is_fetching_notice: state.GetNotice.is_fetching_notice,
            notice_id: state.GetNotice.notice_id,
        };
    }
};


class NoticeView extends Component {

    state = { isOpen: false };

    copyUrl = () => {
        const el = document.createElement('input');
        el.value = document.location.href;
        el.id = "url-input";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        el.remove();
    };

    handleOpen = () => {
        this.setState({ isOpen: true });
        this.timeout = setTimeout(() => {
            this.setState({ isOpen: false })
        }, timeoutLength);
    };

    handleClose = () => {
        this.setState({ isOpen: false });
        clearTimeout(this.timeout);
    };

    render () {
        const notice = this.props.notice;
        const is_fetching_notice = this.props.is_fetching_notice;
        const notice_exists = this.props.notice_exists;

        return (
          <div>
                {!is_fetching_notice ? (
                    <Container styleName="notice_css.notice-box notice_css.notice-container-width">
                        {notice_exists ? (
                            <Segment.Group>
                                <Segment as='h5'>Subject: {notice.title} </Segment>

                                <Segment>
                                    <div styleName='notice-list-div'>
                                        <p styleName="notice_css.notice-posted-by">Posted by: {notice.banner.name}</p>
                                            <Popup trigger={
                                                 <p styleName="notice_css.get_shareable_link" onClick={this.copyUrl}>
                                                      Get shareable link
                                                 </p>
                                            } content={`Copied!`} on='click' hideOnScroll
                                            onClose={this.handleClose} open={this.state.isOpen} onOpen={this.handleOpen}/>
                                    </div>
                                    <p>Posted on: {moment(notice.datetimeModified).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                </Segment>

                                <Divider fitted/>

                                <Container textAlign='justified' styleName="notice_css.notice-view-container">
                                    <Header as='h2' styleName='notice_css.notice-box-header'>{notice.title}</Header>
                                      <div dangerouslySetInnerHTML={{__html: notice.content}} />
                                    </Container>
                            </Segment.Group>
                        ) : (
                            <div>
                                <Container styleName='notice_css.notice-list-view'>
                                    <div styleName='notice_css.notice-view-no-notice'>
                                        <h1 styleName='no-results-found'> No notice found </h1>
                                    </div>
                                </Container>
                            </div>
                        )}

                    </Container>
                ) : (
                    <Container styleName="notice_css.notice-box notice_css.notice-view-loading notice_css.notice-container-width">
                       <Loader active styleName='notice_css.loader-element'/>
                    </Container>
                )
             }
          </div>
    )}
}

export default connect(mapStateToProps) (NoticeView);