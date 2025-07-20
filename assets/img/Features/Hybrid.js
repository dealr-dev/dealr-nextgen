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
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.35888 16.5445C5.35888 16.5445 8.35888 17.9275 10.1119 16.2115C13.6609 12.7315 9.24488 7.84352 9.17888 4.89752C5.79534 5.66251 2.98236 8.00077 1.61188 11.1875C0.539883 13.9285 1.94488 15.9375 5.35888 16.5445Z"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.741 6.39453C22.7411 7.45729 22.2903 8.47021 21.5008 9.18158C20.7112 9.89296 19.657 10.236 18.6 10.1255C16.6408 9.85362 15.1954 8.15808 15.237 6.18053V4.89453C15.237 4.48032 15.5727 4.14453 15.987 4.14453H21.987C22.4012 4.14453 22.737 4.48032 22.737 4.89453L22.741 6.39453Z"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.741 4.14453V1.14453"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.241 4.14453V1.14453"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.9909 10.1445V15.3945C18.9909 19.1225 15.9688 22.1445 12.2409 22.1445C8.513 22.1445 5.49092 19.1225 5.49092 15.3945C5.47248 14.1055 5.72812 12.8273 6.24092 11.6445"
        stroke="#5A89EA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
