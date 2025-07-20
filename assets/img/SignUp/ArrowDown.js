import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={6}
            height={4}
            viewBox="0 0 6 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M.5.5L3 3 5.5.5" stroke="#000" />
        </Svg>
    )
}

export default SvgComponent