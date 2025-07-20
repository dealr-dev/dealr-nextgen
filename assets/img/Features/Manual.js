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
    width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
     <Path d="M0.75 7.74072V4.74072" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M3.75 7.74072L1.5 4.74072" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M23.25 21.9907H20.25V21.2407C20.25 19.5839 21.5931 18.2407 23.25 18.2407V24.2407" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.2998 2.85267C17.501 2.10148 18.2428 1.62859 19.0087 1.76337C19.7746 1.89815 20.3105 2.5959 20.2431 3.37063C20.1757 4.14536 19.5275 4.74012 18.7498 4.74067C19.5261 4.74032 20.1744 5.33231 20.2444 6.10543C20.3144 6.87855 19.7829 7.57735 19.0192 7.71641C18.2555 7.85547 17.5118 7.38884 17.3048 6.64067" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M11.25 19.7407C11.25 18.9123 11.9216 18.2407 12.75 18.2407V18.2407C13.5784 18.2407 14.25 18.9123 14.25 19.7407V19.7407C14.25 20.2262 14.085 20.6973 13.782 21.0767L11.25 24.2407H14.25" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M8.25 1.74072H9C9.41421 1.74072 9.75 2.07651 9.75 2.49072V7.74072" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M8.25 7.74072H11.25" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.74072H0.75V4.74072H2.25C3.07843 4.74072 3.75 4.06915 3.75 3.24072C3.75 2.4123 3.07843 1.74072 2.25 1.74072Z" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M9.75 13.7407V10.7407" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M12.75 13.7407V15.2407" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M18.75 13.7407V10.7407" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M21.75 15.2407C21.75 14.4123 21.0784 13.7407 20.25 13.7407H5.25C3.59315 13.7407 2.25 12.3976 2.25 10.7407" stroke="#5A89EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

    </Svg>
  );
}

export default SvgComponent;
