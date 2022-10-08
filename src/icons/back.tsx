import { SVGProps } from "react";

export default function FeArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"
      ></path>
    </svg>
  );
}
