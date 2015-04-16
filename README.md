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

Be warned that if you are calling 2 calls close together that they both may fetch from Mojang and not use the cache simply because the first call hasn't had a chance to make the HTTP request and cache the versions yet.

If you wish to make sure the cache is valid before making any of the calls to this module, you can use the below command to do so:

````javascript
mcversions.ensureCached(function() {
    // This will run once we are 100% sure we have cached the versions returned from Mojang
});
````

Version data
----
As well as the original information retrieved from Mojang about eeach version of Minecraft, this module also adds some extra information.

The extra information you get includes url's to where to get the client jar, server jar (if any) and also to that specific versions json file which contains more information including library info and startup arguments for Minecraft.

An example of the data returned using 1.7.10 can be found below:

````javascript
{
    id: "1.7.10",
    time: "2014-05-14T19:29:23+02:00",
    releaseTime: "2014-05-14T19:29:23+02:00",
    type: "release",
    url: {
        client: "https://s3.amazonaws.com/Minecraft.Download/versions/1.7.10/1.7.10.jar",
        server: "https://s3.amazonaws.com/Minecraft.Download/versions/1.7.10/minecraft_server.1.7.10.jar",
        json: "https://s3.amazonaws.com/Minecraft.Download/versions/1.7.10/1.7.10.json"
    }
}
````

Version info data
----
When requesting more information about a Minecraft version we get and parse the information from the version.url.json of the normal Minecraft version returned (shown above) and add some extra information.

The extra information includes adding a url property to every library in the libraries array.

For libraries that are platform independent the url property will be a string containing the url of that library as seen below with the library "com.mojang:realms:1.3.5".

For libraries which require sifferent libraries per operating system, the url property will contain 3 string properties. One for linux, osx and windows. You can see this below with the library "org.lwjgl.lwjgl:lwjgl-platform:2.9.1".

For libraries which require different libraries per architecture (32 bit and 64 bit) the property for the os type will contain 2 string properties, one for 32 bit (thirtytwo) and 64 bit (sixtyfour). You can see this below with the library "tv.twitch:twitch-platform:5.16".

Please note that sometimes not all libraries are required on all platforms so they will be excluded from the url property such as is shown below in the library "tv.twitch:twitch-external-platform:4.5".

````javascript
{
    id: "1.7.10",
    time: "2014-05-14T19:29:23+02:00",
    releaseTime: "2014-05-14T19:29:23+02:00",
    type: "release",
    minecraftArguments: "--username ${auth_player_name} --version ${version_name} --gameDir ${game_directory} --assetsDir ${assets_root} --assetIndex ${assets_index_name} --uuid ${auth_uuid} --accessToken ${auth_access_token} --userProperties ${user_properties} -
-userType ${user_type}",
    minimumLauncherVersion: 13,
    assets: "1.7.10",
    libraries: [
        {
            name: "com.mojang:realms:1.3.5",
            url: "https://libraries.minecraft.net/com/mojang/realms/1.3.5/realms-1.3.5.jar"
        },
        {
            name: "org.lwjgl.lwjgl:lwjgl-platform:2.9.1",
            natives: {
                linux: "natives-linux",
                windows: "natives-windows",
                osx: "natives-osx"
            },
            extract: {
                exclude: [
                    META-INF/"
                ]
            },
            url: {
                linux: "https://libraries.minecraft.net/org/lwjgl.lwjgl/lwjgl-platform/2.9.1/lwjgl-platform-2.9.1-natives-linux.jar",
                osx: "https://libraries.minecraft.net/org/lwjgl.lwjgl/lwjgl-platform/2.9.1/lwjgl-platform-2.9.1-natives-osx.jar",
                windows: "https://libraries.minecraft.net/org/lwjgl.lwjgl/lwjgl-platform/2.9.1/lwjgl-platform-2.9.1-natives-windows.jar"
            }
        },
        {
            name: "tv.twitch:twitch-platform:5.16",
            rules: [
                {
                    action: "allow"
                },
                {
                    action: "disallow",
                    os: {
                        name: "linux"
                    }
                }
            ],
            natives: {
                linux: "natives-linux",
                windows: "natives-windows-${arch}",
                osx: "natives-osx"
            },
            extract: {
                exclude: [
                    "META-INF/"
                ]
            },
            url: {
                linux: "https://libraries.minecraft.net/tv/twitch/twitch-platform/5.16/twitch-platform-5.16-natives-linux.jar",
                osx: "https://libraries.minecraft.net/tv/twitch/twitch-platform/5.16/twitch-platform-5.16-natives-osx.jar",
                windows: {
                    thirtytwo: "https://libraries.minecraft.net/tv/twitch/twitch-platform/5.16/twitch-platform-5.16-natives-windows-32.jar",
                    sixtyfour: "https://libraries.minecraft.net/tv/twitch/twitch-platform/5.16/twitch-platform-5.16-natives-windows-64.jar"
                }
            }
        },
        {
            name: "tv.twitch:twitch-external-platform:4.5",
            rules: [
                {
                    action: "allow",
                    os: {
                        name: "windows"
                    }
                }
            ],
            natives: {
                windows: "natives-windows-${arch}"
            },
            extract: {
                exclude: [
                    "META-INF/"
                ]
            },
            url: {
                windows: {
                    thirtytwo: "https://libraries.minecraft.net/tv/twitch/twitch-external-platform/4.5/twitch-external-platform-4.5-natives-windows-32.jar",
                    sixtyfour: "https://libraries.minecraft.net/tv/twitch/twitch-external-platform/4.5/twitch-external-platform-4.5-natives-windows-64.jar"
                }
            }
        }
    ],
    mainClass: "net.minecraft.client.main.Main"
}
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
mcversions.getVersion('1.7.10', function (err, version) {
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

To get more information about a specific version of Minecraft including library and launch startup arguments:

````javascript
mcversions.getVersionInfo('1.7.10', function (err, version) {
    if (err) {
        return console.error(err);
    }
    
    console.log(version);
});
````
