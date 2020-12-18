export const fromCodePoint = String.fromCodePoint || function(astralCodePoint: number) {
    return String.fromCharCode(
        Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800,
        (astralCodePoint - 0x10000) % 0x400 + 0xDC00
    );
};

export const getCodePoint = String.prototype.codePointAt ?
    function(input: string, position: number) {
        return input.codePointAt(position);
    } :
    function(input: string, position: number) {
        return (input.charCodeAt(position) - 0xD800) * 0x400
            + input.charCodeAt(position + 1) - 0xDC00 + 0x10000;
    };

export const highSurrogateFrom = 0xD800;
export const highSurrogateTo = 0xDBFF;
