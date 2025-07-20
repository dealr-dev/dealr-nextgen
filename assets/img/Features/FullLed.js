import * as React from "react";
import Svg, {
  Path
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
    >
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z" stroke={props.stroke}  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 11.2501C18.8016 9.07063 17.4271 7.11186 15.36 6.41911C14.763 6.2029 14.0981 6.29136 13.5784 6.65614C13.0587 7.02091 12.7496 7.61618 12.75 8.25111V14.2511C12.7498 14.8854 13.0589 15.4799 13.5782 15.844C14.0975 16.2082 14.7617 16.2963 15.358 16.0801C17.4269 15.3901 18.8032 13.4304 18.75 11.2501V11.2501Z" stroke={props.stroke}  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M5.25 9.75L9.75 8.25" stroke={props.stroke}  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M5.25 12.75L9.75 11.25" stroke={props.stroke}  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M5.25 15.75L9.75 14.25" stroke={props.stroke}  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}

export default SvgComponent;
