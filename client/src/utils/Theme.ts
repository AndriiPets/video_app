
export interface Theme {
    bgMain: string,
    bgSide: string,
    text: string,
    textSoft: string,
    soft: string
}

export const darkTheme: Theme = {
    bgMain:'#181818',
    bgSide:'#202020',
    text:'white',
    textSoft:'#aaaaaa',
    soft:'#373737'
}

export const lightTheme: Theme = {
    bgMain:'#f9f9f9',
    bgSide:'white',
    text:'black',
    textSoft:'#606060',
    soft:'#f5f5f5'
}