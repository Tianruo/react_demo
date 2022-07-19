import supabase from './index'

export const login_api_regist = async (email: string, password: string) => {
    const res = await supabase.auth.signUp({ email, password })
    if (!res.error) await supabase.from('user').insert({
        user_id: res.user?.id,
        user_name: '访客',
        user_color: ''
    })
    return res
}

export const login_api_login = async (email: string, password: string) => {
    const res = await supabase.auth.signIn({ email, password })
    return res
}