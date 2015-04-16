mcversions
=======================
A NodeJS module to query Minecraft versions.

Getting Started
----
To install this package simple run the below command in the directory you wish to install it:

````shell
npm install mcversions
````

Then to start using this package it's as simply as requiring it:

````javascript
var mcversions = require('mcversions');
````

There are no arguments to pass in or anything. Just set it and go!

Caching
----
By default this module will cache all the versions from Mojang for 10 minutes.

This makes it so that there doesn't need to be constant HTTP queries when looking up something for a few minutes and eliminates any issues that occur from that.

If you need to change the time which the versions are cached, you can use the below command to set the number of minutes to cache them for:

````javascript
// Set the cache time to 30 minutes
mcversions.setCacheTime(30);
````

Alternatively if you want to turn the caching off completely, you can use the below command:

````javascript
// Turn the caching off completely
mcversions.setCacheTime(0);
````

Be warned that if you are calling 2 calls close together that they both may fetch from Mojang and not use tha cache simply because the first call hasn't had a chance to make the HTTP request and cache the versions yet.

If you wish to make sure the cache is valid before making any of the calls to this module, you can use the below command to do so:

````javascript
mcversions.ensureCached(function() {
    // This will run once we are 100% sure we have cached the versions returned from Mojang
});
````

Examples
----
To get a list of all the versions available:

````javascript
mcversions.getAllVersions(function (err, versions) {
    if (err) {
        return console.error(err);
    }
    
    console.log(versions);
});
````

To get information about a specific Minecraft version including links to the client/server jar:

````javascript
mcversions.getAllVersions('1.7.10', function (err, version) {
    if (err) {
        return console.error(err);
    }
    
    console.log(version);
});
````

To get information about a the latest Minecraft version including links to the client/server jar:

````javascript
mcversions.getLatestReleaseVersion(function (err, version) {
    if (err) {
        return console.error(err);
    }
    
    console.log(version);
});
````
