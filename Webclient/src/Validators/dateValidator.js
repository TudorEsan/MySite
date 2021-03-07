
export const dateValidator = (date) => {
    if (!date)
        return undefined;
    return date.match(/^\s*(3[01]|[12][0-9]|0?[1-9])\-(1[012]|0?[1-9])\-((?:19|20)\d{2})\s*$/g)
}