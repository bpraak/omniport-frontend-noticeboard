import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import 'rc-calendar/assets/index.css';

export default class DropdownView extends Component {
    render () {
        return (
            <div styleName='notice_css.tab-common-elements'>
                <Dropdown text='All Notices' styleName='notice_css.tab-dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='All Notices' />
                        <Dropdown.Item text='Authorities' />
                        <Dropdown.Item text='Departments' />
                        <Dropdown.Item text='Placement Office' />
                        <Dropdown.Divider />
                        <Dropdown.Item text='Expired' />
                    </Dropdown.Menu>
                </Dropdown>

                 <Dropdown text='Date' styleName='notice_css.tab-dropdown'>
                </Dropdown>
            </div>
        )
    }
}