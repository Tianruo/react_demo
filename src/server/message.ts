import supabase from './index'
import { anon_user, user } from './user'
import { RealtimeSubscription } from '@supabase/supabase-js'

let message_subscribtion: RealtimeSubscription | null = null
let message_subscrib_cbs: ((d: IMessage) => any)[] = []

export interface IMessage {
    id: number;
    created_at: string;
    message: string;
    user_id: string;
    user_name: string;
    user_color: string;
}

export const on_message_change = (callback: (d: IMessage) => any) => {
    message_subscrib_cbs.push(callback)

    if (message_subscribtion) return

    message_subscribtion = supabase.from('message').on('INSERT', (data) => {
        const message: IMessage = data.new
        message_subscrib_cbs.forEach(cb => cb(message))
    }).subscribe()
}

export const remove_all_message_change = () => {
    message_subscrib_cbs = []
}

export const message_api_send = async(message: string) => {
    const res = await supabase.from('message').insert({
        user_id: anon_user?.id,
        user_name: user?.user_name,
        user_color: user?.user_color,
        message
    })
    return res
}

export const message_api_pull = async() => {
    const res = await supabase.from('message').select().order('id', { ascending: false }).limit(20)
    return res
}