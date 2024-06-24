export  {default} from "next-auth/middleware"; // directly exoprt the default export of this module, which is the middleware function

export const config = {
    // *: zero or more parameters
    // +: 1 or more parameters
    // ?: 0 or 1 parameters
    // the paths in matcher array should always start with a forward slash
    matcher: [
        '/users/:id*'
    ]
}