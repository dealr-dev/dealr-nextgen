import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  console.log(props.fill);
  return (
    <Svg
      width={48}
      height={32}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M42.514 29.976a3 3 0 100-6 3 3 0 000 6zM4.852 29.976a3 3 0 100-6 3 3 0 000 6z"
        stroke={props.fill}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M14.2 26.976a9.356 9.356 0 00-12.67-8.744"
        stroke={props.fill}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M39.514 26.976H7.852"
        stroke={props.fill}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M42.514 23.976V11.624H27.096L25.758 5.2a4 4 0 00-3.916-3.184H14.4a4 4 0 00-3.762 2.638l-4.726 12.97"
        stroke={props.fill}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M29.514 26.976l7.21-8.388H46.5M27 11.624H8.098M40 5.624l2.514 2v4"
        stroke={props.fill}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}

export default SvgComponent
