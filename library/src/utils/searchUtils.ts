/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as fuzzySearch from 'fuzzysearch';
import * as _ from 'lodash';

export function doesSearchInclude(searchValue: string, itemName: string): boolean {
  if (itemName) {
    return searchValue ? fuzzySearch(searchValue.toLowerCase().replace(/\s/g, ''), itemName.toLowerCase()) : true;
  }
  return searchValue && searchValue === '' ? true : false;
}
