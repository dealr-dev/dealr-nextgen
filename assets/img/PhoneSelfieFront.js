import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
    return (
    <Svg
        width={95}
        height={94}
        viewBox="0 0 95 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={23.5} cy={23} r={23} fill="#EEF4FF" />
        <Path d="M70.136 74.969h-40.78M51.105 23.313h14.181a7.721 7.721 0 017.57 7.768V61.2M72.681 84.807a7.718 7.718 0 01-7.395 6.474H36.863a7.649 7.649 0 01-7.522-7.768V50.5M10.324 23.313h5.438M37.511 23.313h-5.437M23.918 31.469v5.437M23.918 9.719v5.437"
            stroke="#5A89EA"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path d="M83.567 91.278l-10.73-6.34a6.34 6.34 0 01-2.7-6.054V72.25l-3.818-4.01a4.806 4.806 0 01.725-7.398v0a4.81 4.81 0 016.065.602l5.659 5.658M72.855 35.786L86.13 54.404a16.312 16.312 0 013.038 9.48v7.891c0 2.27.902 4.448 2.508 6.054"
            stroke="#5A89EA" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            clipRule="evenodd"
            d="M51.315 55.938a9.516 9.516 0 100-19.032 9.516 9.516 0 000 19.032z"
            stroke="#5A89EA"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M70.136 74.969H35.003c0-9.01 7.303-16.313 16.312-16.313"
            stroke="#5A89EA"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>)
}

export default SvgComponent