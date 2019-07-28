# mcversions

Query Minecraft versions.

## Installation

```bash
npm i --save mcversions
```

Or if you use Yarn:

```bash
yarn add mcversions
```

## Usage

To start using this package it's as simply as requiring it:

````js
import mcversions from 'mcversions';
````

There are no arguments to pass in or anything. Just set it and go!

### Caching

By default this module will cache all the versions from Mojang for 10 minutes.

This makes it so that there doesn't need to be constant HTTP queries when looking up something for a
few minutes and eliminates any issues that occur from that.

If you need to change the time which the versions are cached, you can use the below command to set
the number of minutes to cache them for:

````js
// Set the cache time to 30 minutes
mcversions.setCacheTime(30);
````

Alternatively if you want to turn the caching off completely, you can use the below command:

````js
// Turn the caching off completely
mcversions.setCacheTime(0);
````

Be warned that if you are calling 2 calls close together that they both may fetch from Mojang and
not use the cache simply because the first call hasn't had a chance to make the HTTP request and
cache the versions yet.

If you wish to make sure the cache is valid before making any of the calls to this module, you can
use the below command to do so:

````js
mcversions.ensureCached(() => {
    // This will run once we are 100% sure we have cached the versions returned from Mojang
});
````

### getAllVersions

To get a list of all the versions available:

````ts
const versions: MinecraftVersion[] = await mcversions.getAllVersions();
````

### getVersion

To get information about a specific Minecraft version:

````js
const version: MinecraftVersion = await mcversions.getVersion('1.7.10');
````

### getLatestRelease

To get information about the latest Minecraft version:

````js
const version: MinecraftVersion = await mcversions.getLatestRelease();
````

### getLatestSnapshot

To get information about the latest Minecraft snapshot:

````js
const version: MinecraftVersion = await mcversions.getLatestSnapshot();
````
