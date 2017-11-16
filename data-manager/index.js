import { registerStateModule } from './util/registerStateModule'

export const registerXrayModule = (store) => {
  registerStateModule('xray', store, require('./xray/state').default)
}
