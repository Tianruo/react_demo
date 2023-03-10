import supabase from './index'
// import { Session } from '@supabase/supabase-js'

export interface IUser {
    id: number;
    created_at: string;
    user_id: string;
    user_account: string;
    user_token: string;
    user_name: string;
    user_color: string;
}

// export let anon_user: Session['user'] = supabase.auth.session()?.user || null
export let user: IUser | null = null

// export const user_getuser = async () => {
//     const id = anon_user?.id
//     const res = await supabase.from('user').select().eq('user_id', id)
//     user = res?.data?.[0]
//     return res?.data?.[0]
// }

// export const user_api_changeuser_name = async (name: string) => {
//     const res = await supabase.from('user').update({
//         user_name: name
//     }).select().eq('user_id', anon_user?.id)
//     return res
// }

// export const user_getauthuser = () => {
//     const session = supabase.auth.session()
//     return session?.user
// }

// supabase.auth.onAuthStateChange((event, session) => {
//     anon_user = session?.user || null
// })

// export const onUserChange = (callback: (user: Session['user']) => void) => {
//     const res = supabase.auth.onAuthStateChange((event, session) => {
//         anon_user = session?.user || null
//         callback(session?.user || null)
//     })
//     return res.data
// }

export const user_api_getuser = async (account: string, password: string) => {
    const res = await supabase.from('user').select().eq('user_account', account).eq('user_token', password)
    user = res.data?.[0]
    return res
}

export const user_api_change_name = async (name: string) => {
    const res = await supabase.from('user').update({
        user_name: name
    }).select().eq('user_id', user?.user_id)

    if (res.data?.[0]) {
        user = res.data?.[0]
    }

    return res
}