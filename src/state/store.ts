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
          // console.log('process.env.PORT ', process.env.VUE_APP_PORT)
          // console.log('PORT ', window.location.port)
          console.log('PORT ', window.location.origin)
          //state.socketConnection = io.io(`${window.location.protocol}//${window.location.hostname}:${process.env.VUE_APP_PORT || 3000}`)
          state.socketConnection = io.io(window.location.origin)
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
