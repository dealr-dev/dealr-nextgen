import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
    <Svg
        width={49}
        height={27}
        viewBox="0 0 49 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            clipRule="evenodd"
            d="M37.59 25.5a3 3 0 100-6 3 3 0 000 6zM13.59 25.5a3 3 0 100-6 3 3 0 000 6z"
            stroke={props.fill}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <Path
            d="M34.59 22.5h-18M40.6 22.5h3a3 3 0 003-3v-3.216a6 6 0 00-4.2-5.724A29.336 29.336 0 0035.282 9H19.6c-6 0-6-3-18-3v7.5a9 9 0 009 9"
            stroke={props.fill}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <Path
            d="M40.6 10.026S33.1 1.5 22.6 1.5C9.1 1.5 10.6 6 3.1 6H1.6M28.59 16.5h-9M1.59 12h4.5"
            stroke={props.fill}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </Svg>)
}

export default SvgComponent
