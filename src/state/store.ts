import Vuex from 'vuex'
import io from 'socket.io-client'

export interface RootState {
  messages: string[],
  socketConnection: any
}

class Store extends Vuex.Store<RootState> {
  constructor() {
    super({
      state: {
        messages: [],
        socketConnection: null
      },

      mutations: {
        connectToSocket: (state)  => {
          state.socketConnection = io(`${window.location.protocol}//${window.location.hostname}:3000`)
          state.socketConnection.on('test', (data) => {
            state.messages.push(data)
          })
        },

        addMessage: (state, msg) => {
          state.socketConnection.emit('message', msg)
        },
      },

      actions: {
        addMessage: (context, msg) => {
          context.commit('addMessage', msg)
        },
        connectToSocket: (context) => {
          context.commit('connectToSocket')
        }
      }
    })
  }
}

export default Store
