/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Mehuge (mehuge@sorcerer.co.uk)
 * @Date: 2017-05-11 21:38:34
 * @Last Modified by: Mehuge (mehuge@sorcerer.co.uk)
 * @Last Modified time: 2017-05-24 20:35:48
 */

import * as React from 'react';
import { StyleSheet, css, merge, select, SelectStyles } from '../../styles';

export interface SelectProps {
  items: any[];
  selectedItem?: any;
  renderActiveItem: (item: any) => any;
  renderListItem: (item: any) => any;
  onSelectedItemChanged: (item: any) => void;
  showActiveInList?: boolean;
  style?: Partial<SelectStyles>;
}

export interface SelectState {
  selectedIndex: number;
  showList: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {
  private static idCounter: number = 0;
  private uniqueId: string = 'Select-' + Select.idCounter++;
  private ss: any;

  constructor(props: SelectProps) {
    super(props);
    this.state = {
      selectedIndex: -1,
      showList: false,
    };
  }

  public render() {
    const ss = this.ss = StyleSheet.create(merge({}, select, this.props.style));
    if (this.props.items.length === 0) {
      // No items to display
      return (
        <div className={css(ss.container)}>
          <div className={css(ss.impl)}>
            <div className={css(ss.active)}>
              {this.props.renderActiveItem(null)}
            </div>
            <div className={css(ss.arrow)} style={{ opacity: 0.5 }}>
              <i className='fa fa-chevron-down' aria-hidden='true'></i>
            </div>
          </div>
        </div>
      );
    }
    // if selectedItem is undefined or null, we get -1 which is exactly what we want
    const selectedIndex = this.props.items.indexOf(this.props.selectedItem);
    return(
      <div className={css(ss.container)}>
        <div className={css(ss.impl)} style={this.state.showList ? { zIndex: '1000' } : {}}>
          <div
            className={this.state.showList ? css(ss.outside) : css(ss.outside, ss.outsideHidden)}
            onClick={(e) => {
              this.showList(false);
              e.stopPropagation();
            }} />
          <div className={css(ss.active)} onClick={(e) => {
            this.showList(!this.state.showList);
            e.stopPropagation();
          }}>
            {this.props.renderActiveItem(this.props.items[selectedIndex])}
          </div>
          <div className={css(ss.arrow)} onClick={(e) => {
            this.showList(!this.state.showList);
            e.stopPropagation();
          }} ><i className={`fa ${this.state.showList ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden='true'></i></div>
          <div className={this.state.showList ? css(ss.list) : css(ss.list, ss.listHidden)}>
            {this.props.items.map(this.buildListItem)}
          </div>
        </div>
      </div>
    );
  }

  private showList = (visible: boolean) => {
    this.setState({showList: visible});
  }

  private onItemSelect = (item: any, itemIndex: number) => {
    this.setState({
      selectedIndex: itemIndex,
      showList: false,
    });
    this.props.onSelectedItemChanged(item);
  }

  private buildListItem = (item: any, itemIndex: number) => {
    const ss = this.ss;
    const isSelectedItem = itemIndex === this.state.selectedIndex;
    if (this.props.showActiveInList && isSelectedItem) return null;
    return (
      <div
        key={itemIndex}
        onClick={this.onItemSelect.bind(this, item, itemIndex)}
        className={isSelectedItem ? css(ss.listItem, ss.listItemSelected) : css(ss.listItem)}>
        {this.props.renderListItem(item)}
      </div>
    );
  }
}

export default Select;
