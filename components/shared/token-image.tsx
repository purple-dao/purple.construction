import cx from 'classnames';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
  imageUrl: string;
  inCollectionList?: boolean;
};

export function TokenImage({ imageUrl, inCollectionList }: Props) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [isImageError, setIsImageError] = React.useState(false);

  return (
    <>
      <img
        src={imageUrl}
        style={isImageLoaded ? {} : { display: 'none' }}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageError(true)}
        className={cx(
          'w-full rounded-md',
          !inCollectionList && '!md:rounded-md !md:rounded-r-none rounded-b-none',
        )}
        alt={`${name} token image`}
      />

      {/* Show placeholder until image is loaded */}
      <div
        style={
          !isImageLoaded && !isImageError
            ? { display: 'block', height: '100%' }
            : { display: 'none' }
        }
      >
        <Skeleton
          containerClassName="h-full w-full rounded-md rounded-b-none !md:rounded-md !md:rounded-r-none"
          className="aspect-square"
        />
      </div>
    </>
  );
}
