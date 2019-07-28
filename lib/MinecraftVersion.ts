export interface Argument {
    rules: Rule[];
    value: string | string[];
}

export interface Arguments {
    game: Array<string | Argument>;
    jvm: Array<string | Argument>;
}

export interface AssetIndex {
    id: string;
    sha1: string;
    size: number;
    totalSize: number;
    url: string;
}

export interface Download {
    sha1: string;
    size: number;
    url: string;
}

export interface Downloads {
    client: Download;
    server: Download;
}

export interface Artifact {
    path: string;
    sha1: string;
    size: number;
    url: string;
}

export interface Classifiers {
    javadoc: Artifact;
    'natives-linux': Artifact;
    'natives-macos': Artifact;
    'natives-windows': Artifact;
    sources: Artifact;
}

export interface LibraryDownloads {
    artifact: Artifact;
    classifiers: Classifiers;
}

export enum RuleAction {
    allow = 'allow',
    disallow = 'disallow',
}

export enum OSName {
    windows = 'windows',
    osx = 'osx',
    linux = 'linux',
}

export interface RuleOS {
    name: OSName;
    version?: string;
}

export interface Rule {
    action: RuleAction;
    os?: RuleOS;
}

export interface Natives {
    osx?: string;
    linux?: string;
    windows?: string;
}

export interface Extract {
    exclude: string[];
}

export interface Library {
    downloads: LibraryDownloads;
    name: string;
    rules?: Rule[];
    natives?: Natives;
    extract?: Extract;
}

export interface LoggingClient {
    argument: string;
    file: Artifact;
    type: string;
}

export interface Logging {
    client: LoggingClient;
}

export enum Type {
    release = 'release',
    snapshop = 'snapshop',
    old_beta = 'old_beta',
    old_alpha = 'old_alpha',
}

export default interface MinecraftVersion {
    /** older versions of Minecraft don't use this, and use minecraftArguments instead */
    arguments?: Arguments;
    assetIndex: AssetIndex;
    assets: string;
    downloads: Downloads;
    id: string;
    libraries: Library[];
    logging: Logging;
    mainClass: string;

    /** newer versions of Minecraft don't use this, and use arguments instead */
    minecraftArguments?: string;

    minimumLauncherVersion: string;
    releaseTime: string;
    time: string;
    type: Type;
}
