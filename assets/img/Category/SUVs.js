import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={52}
            height={20}
            viewBox="0 0 52 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
        <Path
            d="M11.811 18.723c-2.322 0-4.204-1.366-4.204-3.053 0-1.686 1.882-3.053 4.204-3.053s4.204 1.367 4.204 3.053c0 1.687-1.882 3.053-4.204 3.053z"
            stroke={props.stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
        />
        <Path
            d="M18.117 16.106c0-3.397-2.845-6.106-6.306-6.106s-6.306 2.755-6.306 6.106"
            stroke={props.stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
        />
        <Path
            d="M40.714 18.723c-2.031 0-3.678-1.366-3.678-3.053 0-1.686 1.647-3.053 3.678-3.053 2.032 0 3.679 1.367 3.679 3.053 0 1.687-1.647 3.053-3.679 3.053z"
            stroke={props.stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
        />
        <Path
            d="M47.546 16.106c0-3.397-3.082-6.106-6.832-6.106s-6.831 2.755-6.831 6.106M47.546 16.106h2.102M39.138 6.51l10.51.873M49.648 16.106c2.364-5.495 0-8.723 0-8.723M39.138 6.51L31.78 3.022M31.78 3.021s-5.133-3.925-26.275 0M2.352 6.51V10M5.505 16.106H2.352M5.505 3.021l-3.153 3.49M2.352 16.106c-2.365-3.076 0-6.106 0-6.106M33.883 16.106H18.117M39.138 6.51H2.352M23.372 2.149v4.362M17.066 2.149l-3.153 4.362M49.648 10h-1.051M2.352 9.128h3.153"
            stroke={props.stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
        />
    </Svg>
)
}  

export default SvgComponent
