import Vuex from 'vuex'
import io from 'socket.io-client'
import {QuizzService} from "@/service/quizz";

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
          const url = window.location.origin.toString().includes('heroku') ? window.location.origin : 'localhost:3000'
          state.socketConnection = io.io(url)
          state.socketConnection.on('test', (data) => {
            state.messages.push(data)
          })
        },

        addMessage: (state, msg) => {
          state.socketConnection.emit('message', msg)
          QuizzService.addMessage(msg)
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
