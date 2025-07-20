import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 43 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#E5E5E5" d="M0 0h43v20H0z" />
      <Path fill="#030303" d="M-124-14h414v70h-414z" />
      <Path
        d="M9.688 18.447c-1.927 0-3.489-1.367-3.489-3.053 0-1.687 1.562-3.054 3.49-3.054 1.927 0 3.489 1.367 3.489 3.053 0 1.687-1.563 3.054-3.49 3.054z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M14.922 15.83c0-3.398-2.361-6.107-5.234-6.107-2.873 0-5.234 2.755-5.234 6.107"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M33.677 18.447a3.053 3.053 0 110-6.107 3.053 3.053 0 010 6.107z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M39.348 15.83c0-3.398-2.558-6.107-5.67-6.107-3.113 0-5.67 2.755-5.67 6.107M39.345 15.83h1.745M32.366 6.234l8.724.872M41.093 15.83c1.962-5.496 0-8.724 0-8.724M32.37 6.234l-6.107-3.49M26.264 2.745s-4.26-3.926-21.809 0M1.838 6.234v3.49M4.455 15.83H1.838M4.455 2.745L1.838 6.234M1.838 15.83c-1.963-3.076 0-6.107 0-6.107M28.008 15.83H14.923M32.37 6.234H1.836M19.281 1.872v4.362M14.05 1.872l-2.616 4.362M41.09 9.723h-.873M1.838 8.851h2.617"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
