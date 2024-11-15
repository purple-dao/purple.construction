type Props = {
  children: React.ReactNode;
  isDataLoaded: boolean;
};

export function ComponentWrapper({ children, isDataLoaded }: Props) {
  if (!isDataLoaded) {
    return (
      <div className="mx-auto flex h-full w-full items-center justify-center p-4 md:p-10">
        <img src="/img/loading-noggles.gif" alt="loading" />
      </div>
    );
  }

  return <div className={'rounded-lg bg-background p-2 text-text-base md:p-5'}>{children}</div>;
}
