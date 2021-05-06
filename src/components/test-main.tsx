import { Component } from 'vue-property-decorator'
import Vue, { CreateElement } from "vue"
@Component({
  computed: {
    messages() {
      return this.$store.state.messages
    }
  }
})
export class TestMain extends Vue {
  private messages: string[]

  sendMessage() {
    this.$store.dispatch('addMessage', 'main')
  }

  render(h: CreateElement) {
    return (
      <div class="app">
        <div>messages: {this.messages.map((msg) => <div> - {msg}</div>)}</div>
        <md-button className="md-accent-custom" md-ripple={false} onClick={this.sendMessage} ref="buy"
                   id="order-summary-buy-btn">
          send smth
        </md-button>
      </div>
    )
  }
}
