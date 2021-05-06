import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router/types/router'
import Store from './state/store'
import { sync } from 'vuex-router-sync'

import {TestMain} from "@/components/test-main";
import {TestHost} from "@/components/test-host";

function setupRoute(store: Store, path: string, config: CustomRouteConfig): RouteConfig {
  return {
    path: path,
    component: config.component,
    children: config.children,
    beforeEnter: (to, from, next) => {
      document.title = config.title
      next()
    }
  }
}

class Router extends VueRouter {
  constructor(store: Store) {
    super({
      mode: 'history',
      routes: [
        setupRoute(store, '/', { component: TestMain, title: 'MAIN' }),
        setupRoute(store, '/host', { component: TestHost, title: 'TITLE' }),
      ]
    })

    sync(store, this)
  }
}

type CustomRouteConfig = {
  component: any
  title: string
  children?: RouteConfig[]
}

export default Router
