export const borderRadius = radius => {
    return {
        borderTopRightRadius: radius,
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
    }
}

export const border = (width, color) => {
    return {
        borderBottomColor: color,
        borderBottomWidth: width,
        borderTopColor: color,
        borderTopWidth: width,
        borderLeftColor: color,
        borderLeftWidth: width,
        borderRightColor: color,
        borderRightWidth: width,
    }
}

export const padding = (top, right, bottom, left) => {
    return {
        paddingLeft: left,
        paddingRight: right,
        paddingBottom: bottom,
        paddingTop: top
    }
}

export const margin = (top, right, bottom, left) => {
    return {
        marginLeft: left,
        marginRight: right,
        marginBottom: bottom,
        marginTop: top
    }
}

export const topBarProps = {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'black',
    fontSize: 34,
    marginTop: 16,
    marginBottom: 16,
    lineHeight: 40
};

