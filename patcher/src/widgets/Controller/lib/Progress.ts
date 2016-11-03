/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: JB (jb@codecorsair.com)
 * @Date: 2016-10-26 15:52:18
 * @Last Modified by: JB (jb@codecorsair.com)
 * @Last Modified time: 2016-10-27 11:04:40
 */

export class Progress {
  constructor(public rate: number = 0, public dataCompleted: number = 0, public totalDataSize: number = 0) { }

  public timeEstimate = () => {
    return Progress.secondsToString((this.remaining() * 8) / this.rate);
  }

  public remaining = () => {
    return this.totalDataSize - this.dataCompleted;
  }

  static bytesToString(bytes: number): string {
    if (bytes >= 1099511627776) {
      // display as TB
      return (bytes / 1099511627776).toFixed(2) + 'TB';
    } else if (bytes >= 1073741824) {
      // display as GB
      return (bytes / 1073741824).toFixed(2) + 'GB';
    } else if (bytes >= 1048576) {
      // display as MB
      return (bytes / 1048576).toFixed(2) + 'MB';
    } else {
      // display rest as KB
      return (bytes / 1024).toFixed(2) + 'KB';
    }
  }

  static bypsToString(bytes: number): string {
    if (bytes >= 1000000000) {
      // display as GB
      return (bytes / 1000000000).toFixed(2) + 'GB/s';
    } else if (bytes >= 1000000) {
      // display as MB
      return (bytes / 1000000).toFixed(2) + 'MB/s';
    } else {
      // display rest as KB
      return (bytes / 1000).toFixed(2) + 'KB/s';
    }
  }

  static secondsToString(val: number): string {
    let days = Math.floor(val / 86400)
    let hours = Math.floor((val % 86400) / 3600);
    let minutes = Math.floor((val % 3600) / 60);
    let seconds = Math.floor(val % 60);
    return (days > 0 ? days + 'd ' : '')
      + (hours > 0 ? hours + 'h ' : '')
      + (minutes > 0 ? minutes < 10 ? '0' + minutes + 'm ' : minutes + 'm ' : '')
      + (seconds < 10 ? '0' + seconds + 's ' : seconds + 's ');
  }
}

export default Progress;