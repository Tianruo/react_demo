/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.css'{
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.less'{
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.scss'{
    const classes: { readonly [key: string]: string };
    export default classes;
}