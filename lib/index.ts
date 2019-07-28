import axois from 'axios';
import * as LRUCache from 'lru-cache';

import MinecraftVersion from './MinecraftVersion';
import VersionManifest from './VersionManifest';
import VersionsVersionManifest from './VersionsVersionManifest';

const versionManifestCache: LRUCache<string, VersionManifest> = new LRUCache<string, VersionManifest>({
    max: 1,
    maxAge: 1000 * 60 * 60, // 1 hour cache
});

const versionCache: LRUCache<string, MinecraftVersion> = new LRUCache<string, MinecraftVersion>({
    max: 100,
});

export const clearCache = () => {
    versionManifestCache.reset();
    versionCache.reset();
};

export const getVersions = async (): Promise<VersionManifest> => {
    if (versionManifestCache.has('all')) {
        return new Promise(resolve => {
            resolve(versionManifestCache.get('all'));
        });
    }

    const response = await axois.get<VersionManifest>('https://launchermeta.mojang.com/mc/game/version_manifest.json');

    if (response.status !== 200) {
        throw new Error(`Failed to get Minecraft versions. Status code ${response.status} was received.`);
    }

    versionManifestCache.set('all', response.data);

    return response.data;
};

export const getVersion = async (version: string): Promise<MinecraftVersion> => {
    if (versionCache.has(version)) {
        return new Promise(resolve => {
            resolve(versionCache.get(version));
        });
    }

    const minecraftVersions: VersionManifest = await getVersions();

    const manifestVersion: VersionsVersionManifest = minecraftVersions.versions.find(({ id }) => id === version);

    if (manifestVersion === null) {
        throw new Error(`No version of Minecraft found with id of ${version}.`);
    }

    const response = await axois.get<MinecraftVersion>(manifestVersion.url);

    if (response.status !== 200) {
        throw new Error(`Failed to get Minecraft version. Status code ${response.status} was received.`);
    }

    versionCache.set(manifestVersion.id, response.data);

    return response.data;
};

export const getLatestRelease = async (): Promise<MinecraftVersion> => {
    const minecraftVersions: VersionManifest = await getVersions();
    const version = minecraftVersions.latest.release;

    return getVersion(version);
};

export const getLatestSnapshot = async (): Promise<MinecraftVersion> => {
    const minecraftVersions: VersionManifest = await getVersions();
    const version = minecraftVersions.latest.snapshot;

    return getVersion(version);
};
