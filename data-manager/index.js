import { registerStateModule } from './util/registerStateModule'

export const registerXrayModule = (store, options) => {
  registerStateModule('xray', store, require('./xray/state').default, options)
}
