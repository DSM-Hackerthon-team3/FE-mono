declare module '@package/design-token' {
    export const color: {
        [key: string]: string;
    };
    export const font: {
        [key: string]: string;
    };
    export const GlobalStyle: React.ComponentType;
}