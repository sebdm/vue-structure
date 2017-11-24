import Vue from 'vue'
import Xray from '@/xray'

describe('xray.vue', () => {
  const Constructor = Vue.extend(Xray)
  const model = {
    holdings: [
      {
        name: 'Holding 1',
        weight: 50
      },
      {
        name: 'Holding 2',
        weight: 50
      }
    ]
  }

  it('should render correct contents', () => {
    const vm = new Constructor({
      propsData: {
        model: JSON.stringify(model)
      }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Xray')
    expect(vm.$el.querySelector('pre').textContent).to.equal(JSON.stringify(model))
  })
})
