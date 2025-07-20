import * as React from "react";
import Svg, {
  Path,
  G,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent() {
  return (
    <Svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.5 10.8945L13 18.3945"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13 10.8945L5.5 18.3945"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.5 20.6445C17.5 21.473 16.8284 22.1445 16 22.1445H2.5C1.67157 22.1445 1 21.473 1 20.6445V5.64453C1 4.8161 1.67157 4.14453 2.5 4.14453H12.25L17.5 9.39453V20.6445Z"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.5 4.14453V2.64453C2.5 1.8161 3.17157 1.14453 4 1.14453H8.5C9.32843 1.14453 10 1.8161 10 2.64453V4.14453"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13 4.89455L14.189 3.70555C14.4703 3.42404 14.852 3.26587 15.25 3.26587C15.648 3.26587 16.0297 3.42404 16.311 3.70555L17.939 5.33355C18.2205 5.61488 18.3787 5.99656 18.3787 6.39455C18.3787 6.79254 18.2205 7.17422 17.939 7.45555L16.75 8.64455"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
