import Vue from 'vue'
import EditHoldings from '@/edit-holdings'

describe('edit-holdings.vue', () => {
  const Constructor = Vue.extend(EditHoldings)
  const model = [
    {
      name: 'Holding 1',
      weight: 50
    },
    {
      name: 'Holding 2',
      weight: 50
    }
  ]

  it('should render correct contents', () => {
    const vm = new Constructor({
      propsData: {
        model: JSON.stringify(model)
      }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Edit Holdings')
    expect(vm.$el.querySelector('pre').textContent).to.equal(
      JSON.stringify(model)
    )
  })
})
