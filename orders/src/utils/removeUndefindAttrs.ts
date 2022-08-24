export const removeUndefindedAttrs = (object: object) => {
    const keys = Object.keys(object) as Array<keyof typeof object>

    keys.forEach((key) => !object[key] && delete object[key])
}
