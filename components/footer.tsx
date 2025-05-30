import { FrameLink } from "./frame-link";

export const Footer = () => {
  return (
    <footer className="text-center flex flex-col gap-5 justify-center mb-10">
      <hr className="w-full border-gray-300 py-3" />
      <div className="flex flex-col gap-2 items-center">
        <div className="max-w-[5rem]">
          <FrameLink href="https://nouns.build/">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 696 186"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <g clipPath="url(#builder-framed_svg__a)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M528.24 0v186h-18.6V0h18.6Zm167.4 0v186h-74.4V0h74.4Zm-102.3 186V0h-37.2v186h37.2Z"
                  fill="#000"
                ></path>
              </g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M175.072 31h58.358v124h-58.358V31Zm204.251 0h58.358v124h-58.358V31Z"
                fill="#000"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M116.715 31h58.357v124h-58.357V31Zm204.251 0h58.357v124h-58.357V31Z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M291.788 0v62h-29.179V0H87.536v62H0v93h29.179V93h58.357v93H262.61V93h29.179v93H466.86V0H291.788ZM233.43 155H116.715V31H233.43v124Zm204.251 0H320.966V31h116.715v124Z"
                fill="#000"
              ></path>
              <path
                d="M291.788 0v62h-29.179V0H87.536v62H0v93h29.179V93h58.357v93H262.61V93h29.179v93H466.86V0H291.788ZM233.43 155H116.715V31H233.43v124Zm204.251 0H320.966V31h116.715v124Z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M291.788 0v62h-29.179V0H87.536v62H0v93h29.179V93h58.357v93H262.61V93h29.179v93H466.86V0H291.788ZM233.43 155H116.715V31H233.43v124Zm204.251 0H320.966V31h116.715v124Z"
                fill="#CCCCCC"
              ></path>
              <path
                d="M291.788 0v62h-29.179V0H87.536v62H0v93h29.179V93h58.357v93H262.61V93h29.179v93H466.86V0H291.788ZM233.43 155H116.715V31H233.43v124Zm204.251 0H320.966V31h116.715v124Z"
                fill="#00EDCF"
              ></path>
              <path
                d="M291.788 0v62h-29.179V0H87.536v62H0v93h29.179V93h58.357v93H262.61V93h29.179v93H466.86V0H291.788ZM233.43 155H116.715V31H233.43v124Zm204.251 0H320.966V31h116.715v124Z"
                fill="#20B0EC"
              ></path>
              <path
                d="M291.788 0v62h-29.179V0H87.536v62H0v93h29.179V93h58.357v93H262.61V93h29.179v93H466.86V0H291.788ZM233.43 155H116.715V31H233.43v124Zm204.251 0H320.966V31h116.715v124Z"
                fill="#0085FF"
              ></path>
              <defs>
                <clipPath id="builder-framed_svg__a">
                  <path fill="#fff" transform="translate(509.64)" d="M0 0h186v186H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </FrameLink>
        </div>
        <p>
          built on{' '}
          <FrameLink href="https://nouns.build/" className="underline">
            nouns builder
          </FrameLink>
        </p>
      </div>
    </footer>
  );
};
