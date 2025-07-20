import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
    <Svg
        width={14}
        height={15}
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.614 1l-7.83 6.5h7.83L2.784 14"
            stroke={props.stroke}
            strokeWidth={2}
        />
    </Svg>
    )
}

export default SvgComponent