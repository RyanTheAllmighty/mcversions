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
var moment = require('moment');

var BASE_URL = 'https://s3.amazonaws.com/Minecraft.Download/versions/';
var MINUTES_TO_CACHE = 1;

module.exports = {
    /**
     * The versions.json file returned from Mojang if it's been cached.
     */
    cached_versions: null,

    /**
     * When the cached versions.json file above was fetched from Mojang (if caching is enabled).
     */
    cached_at: null,

    /**
     * Sets the number of minutes to cache the versions returned from Mojang. Can be set to 0 for caching to be turned off.
     *
     * @param {number} minutes
     */
    setCacheTime: function (minutes) {
        if (typeof minutes == 'number' && minutes >= 0) {
            MINUTES_TO_CACHE = minutes;
        }
    },

    /**
     * Ensures that the cache has been made before running the callback.
     *
     * @param {function} callback
     */
    ensureCache: function (callback) {
        this.getVersions(callback);
    },

    /**
     * Gets the versions file from Mojang and caches it for use in future calls if it hasn't been already.
     *
     * @param {function} callback
     */
    getVersions: function (callback) {
        // Check if the versions have been cached or not yet.
        if (this.cached_versions == null || MINUTES_TO_CACHE == 0 || (this.cached_at != null && moment().diff(this.cached_at, 'minutes') >= MINUTES_TO_CACHE)) {
            var context = this;

            return request.get({
                url: BASE_URL + "versions.json",
                json: true
            }, function (err, res, body) {
                if (err) {
                    return callback(err);
                }

                // Add in our own stuff
                _.forEach(body.versions, function (version) {
                    version.url = {};
                    version.url.client = BASE_URL + version.id + '/' + version.id + '.jar';

                    if (version.type == 'release' && !_.includes(['1.2.4', '1.2.3', '1.2.2', '1.2.1', '1.1', '1.0'], version.id)) {
                        version.url.server = BASE_URL + version.id + '/minecraft_server.' + version.id + '.jar';
                    }

                    version.url.json = BASE_URL + version.id + '/' + version.id + '.json';
                });

                context.cached_versions = body;
                context.cached_at = moment();

                return callback(null, context.cached_versions);
            });
        }

        // We have already cached it so use that.
        return callback(null, this.cached_versions);
    },

    /**
     * Gets all the versions of Minecraft.
     *
     * @param {function} callback
     */
    getAllVersions: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, res.versions);
        });
    },

    /**
     * Gets all the released versions of Minecraft.
     *
     * @param {function} callback
     */
    getReleaseVersions: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(res.versions, {type: 'release'}));
        });
    },

    /**
     * Gets all the snapshot versions of Minecraft.
     *
     * @param {function} callback
     */
    getSnapshotVersions: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(res.versions, {type: 'snapshot'}));
        });
    },

    /**
     * Gets all the beta versions of Minecraft.
     *
     * @param {function} callback
     */
    getBetaVersions: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(res.versions, {type: 'old_beta'}));
        });
    },

    /**
     * Gets all the alpha versions of Minecraft.
     *
     * @param {function} callback
     */
    getAlphaVersions: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.filter(res.versions, {type: 'old_alpha'}));
        });
    },

    /**
     * Gets a specific version of Minecraft.
     *
     * @param {string} version
     * @param {function} callback
     */
    getVersion: function (version, callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.find(res.versions, {id: version}));
        });
    },

    /**
     * Gets the latest release version.
     *
     * @param {function} callback
     */
    getLatestReleaseVersion: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.find(res.versions, {id: res.latest.release}));
        });
    },

    /**
     * Gets the latest snapshot version.
     *
     * @param {function} callback
     */
    getLatestSnapshotVersion: function (callback) {
        this.getVersions(function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, _.find(res.versions, {id: res.latest.snapshot}));
        });
    }
};