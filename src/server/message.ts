import supabase from './index'
import { user } from './user'
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

// setTimeout(async () => {
//     let todos: RealtimeSubscription | null = await supabase.from('todos').on('*', (data) => {
//         console.log('todos-data', data);
//     }).subscribe()

//     let todos2: RealtimeSubscription | null = null

//     // const a = await supabase.removeSubscription(todos)

//     // console.log(8888888, a);

//     console.log('todosubsc', todos, todos?.state)
// }, )

export const message_ws_connect = () => {
    message_subscribtion = supabase.from('message').on('INSERT', (data) => {
        console.log('msg-newdata', data)
        const message: IMessage = data.new
        message_subscrib_cbs.forEach(cb => cb(message))
    }).subscribe()
    console.log('ws-state', message_subscribtion)
}

export const message_ws_disconnect = async () => {
    if (message_subscribtion) {
        await supabase.removeSubscription(message_subscribtion)
    }
}

export const message_ws_addlistener = (callback: (d: IMessage) => any) => {
    message_subscrib_cbs.push(callback)
}

export const message_ws_removealllistener = () => {
    message_subscrib_cbs = []
}


export const on_message_change = (callback: (d: IMessage) => any) => {
    // message_subscrib_cbs.push(callback)
    // if (message_subscribtion) return

    // message_subscribtion = supabase.from('message').on('INSERT', (data) => {
    //     console.log('msg-newdata', data)
    //     const message: IMessage = data.new
    //     message_subscrib_cbs.forEach(cb => cb(message))
    // }).subscribe()

    // console.log('ws-state', message_subscribtion.state)
    // console.log('ws-close', message_subscribtion.isClosed())
    // console.log('ws-isjoing', message_subscribtion.isJoining())

    // const intervel = setInterval(() => {
    //     console.log('ws-state1', message_subscribtion?.state)
    //     if (message_subscribtion?.state !== 'joined'){
    //         message_subscribtion?.rejoin()
    //     } else {
    //         clearInterval(intervel)
    //     }
    //     console.log('ws-state2', message_subscribtion?.state)
    // }, 2000)

    // if (message_subscribtion.isClosed())
}

export const message_api_send = async(message: string) => {
    const res = await supabase.from('message').insert({
        user_id: user?.user_id,
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