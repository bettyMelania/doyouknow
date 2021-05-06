import { Component, Watch } from 'vue-property-decorator'
import Vue, { CreateElement } from "vue"

@Component
export class App extends Vue {

  created() {
    return this.$store.dispatch('connectToSocket')
  }

  render(h: CreateElement) {
    return (
      <div class="app">
        <router-view></router-view>
      </div>
    )
  }
}
