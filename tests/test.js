/*
 * mcversions - https://github.com/RyanTheAllmighty/mcversions
 * Copyright (C) 2015 RyanTheAllmighty
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var mcversions = require('../index');
var assert = require('assert');

mcversions.getAllVersions(function (err, res) {
    assert.ifError(err);
});

mcversions.getAlphaVersions(function (err, res) {
    assert.ifError(err);
});

mcversions.getBetaVersions(function (err, res) {
    assert.ifError(err);
});

mcversions.getSnapshotVersions(function (err, res) {
    assert.ifError(err);
});

mcversions.getReleaseVersions(function (err, res) {
    assert.ifError(err);
});

mcversions.getLatestSnapshotVersion(function (err, res) {
    assert.ifError(err);
});

mcversions.getLatestReleaseVersion(function (err, res) {
    assert.ifError(err);
});

mcversions.getVersion('1.2.5', function (err, res) {
    assert.ifError(err);

    assert.deepEqual(res, {
        id: "1.2.5",
        time: "2013-08-06T13:00:00+02:00",
        releaseTime: "2012-03-30T00:00:00+02:00",
        type: "release"
    })
});