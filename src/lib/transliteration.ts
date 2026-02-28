export function toIndoLatin(enText: string): string {
    if (!enText) return "";

    // Replace typical English phonetic combinations with Indonesian standards
    return enText
        .replace(/ee/g, 'i')
        .replace(/oo/g, 'u')
        .replace(/aw/g, 'au')
        .replace(/ay/g, 'ai')
        .replace(/sh/g, 'sy')
        .replace(/th/g, 'ts')
        .replace(/dh/g, 'dz')
        .replace(/gh/g, 'gh')
        .replace(/kh/g, 'kh')
        .replace(/j/g, 'j')
        .replace(/y/g, 'y')
        // Capitalized versions
        .replace(/Ee/g, 'I')
        .replace(/Oo/g, 'U')
        .replace(/Aw/g, 'Au')
        .replace(/Ay/g, 'Ai')
        .replace(/Sh/g, 'Sy')
        .replace(/Th/g, 'Ts')
        .replace(/Dh/g, 'Dz')
        .replace(/Gh/g, 'Gh')
        .replace(/Kh/g, 'Kh');
}
