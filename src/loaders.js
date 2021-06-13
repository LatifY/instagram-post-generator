import React from "react";
import ContentLoader from "react-content-loader";

export const AvatarLoader = () => (
  <ContentLoader
    speed={2}
    width={30}
    height={30}
    viewBox="0 0 32 32"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="16" cy="16" r="16" />
  </ContentLoader>
);

export const NameLoader = () => (
  <ContentLoader
    speed={2}
    width={90}
    height={30}
    viewBox="0 0 90 30"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="15" rx="0" ry="0" width="90" height="10" />
  </ContentLoader>
);

export const PostNameLoader = () => (
  <ContentLoader
    speed={2}
    width={90}
    height={21}
    viewBox="0 0 90 21"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="4" rx="0" ry="0" width="90" height="15" />
  </ContentLoader>
);

export const PostTextLoader = () => (
  <ContentLoader
    speed={2}
    width={480}
    height={21}
    viewBox="0 0 480 21"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="4" rx="0" ry="0" width="480" height="15" />
  </ContentLoader>
);

export const ImageLoader = () => (
  <ContentLoader
    speed={2}
    width={613}
    height={560}
    viewBox="0 0 613 560"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="613" height="560" />
  </ContentLoader>
);

export const TimeLoader = () => (
  <ContentLoader
    speed={2}
    width={50}
    height={15}
    viewBox="0 0 50 15"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="5" rx="0" ry="0" width="50" height="17" />
  </ContentLoader>
);