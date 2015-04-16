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

var request = require('request');
var _ = require('lodash');

var BASE_URL = 'https://s3.amazonaws.com/Minecraft.Download/versions/';

module.exports = {
    /**
     * Gets all the versions of Minecraft.
     *
     * @param {function} callback
     */
    getAllVersions: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, body.versions);
        });
    },

    /**
     * Gets all the released versions of Minecraft.
     *
     * @param {function} callback
     */
    getReleaseVersions: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(body.versions, {type: 'release'}));
        });
    },

    /**
     * Gets all the snapshot versions of Minecraft.
     *
     * @param {function} callback
     */
    getSnapshotVersions: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(body.versions, {type: 'snapshot'}));
        });
    },

    /**
     * Gets all the beta versions of Minecraft.
     *
     * @param {function} callback
     */
    getBetaVersions: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(body.versions, {type: 'old_beta'}));
        });
    },

    /**
     * Gets all the alpha versions of Minecraft.
     *
     * @param {function} callback
     */
    getAlphaVersions: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(body.versions, {type: 'old_alpha'}));
        });
    },

    /**
     * Gets a specific version of Minecraft.
     *
     * @param {string} version
     * @param {function} callback
     */
    getVersion: function (version, callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.find(body.versions, {id: version}));
        });
    },

    /**
     * Gets the latest release version.
     *
     * @param {function} callback
     */
    getLatestReleaseVersion: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.find(body.versions, {id: body.latest.release}));
        });
    },

    /**
     * Gets the latest snapshot version.
     *
     * @param {function} callback
     */
    getLatestSnapshotVersion: function (callback) {
        request.get({
            url: BASE_URL + "versions.json",
            json: true
        }, function (err, res, body) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.find(body.versions, {id: body.latest.snapshot}));
        });
    }
};