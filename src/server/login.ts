import supabase from './index'

// export const login_api_regist = async (email: string, password: string) => {
//     const res = await supabase.auth.signUp({ email, password })
//     if (!res.error) await supabase.from('user').insert({
//         user_id: res.user?.id,
//         user_name: '访客',
//         user_color: ''
//     })
//     return res
// }

// export const login_api_login = async (email: string, password: string) => {
//     const res = await supabase.auth.signIn({ email, password })
//     return res
// }

export const encryptKey = (p: string) => {
    return window.btoa(window.btoa(p).split('').reverse().join(''))
}

export const createUuid = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export const login_api_regist = async (account: string, password: string) => {
    const res = await supabase.from('user').insert({
        user_id: createUuid(),
        user_account: account,
        user_name: '访客' + Math.floor(Math.random() * 10000),
        user_token: encryptKey(password),
        user_color: ''
    })
    return res
}

export const login_api_login = async (account: string, password: string) => {
    const res = await supabase.from('user').select().match({
        'user_account': account,
        'user_token': encryptKey(password)
    })
    return res
}