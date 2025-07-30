const convertCSSDirectionToTailwindDirection = (direction: string) => {
    switch (direction) {
        case "top":
            return "t"
        case "bottom":
            return "b"
        case "left":
            return "l"
        case "right":
            return "r"
        case "top right":
            return "tr"
        case "top left":
            return "tl"
        case "bottom right":
            return "br"
        case "bottom left":
            return "bl"
    }
}

export default convertCSSDirectionToTailwindDirection
