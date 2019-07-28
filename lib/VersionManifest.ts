import LatestVersionManifest from './LatestVersionManifest';
import VersionsVersionManifest from './VersionsVersionManifest';

export default interface VersionManifest {
    latest: LatestVersionManifest;
    versions: VersionsVersionManifest[];
}
