import { registerStateModule } from './util/register-state-module'

export const registerXrayModule = (store, options) => {
  registerStateModule('xray', store, require('./xray/state').default, options)
}
