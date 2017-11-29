import Vue from 'vue'
import Component from '@/{{name}}'

describe('{{name}}.vue', () => {
  const Constructor = Vue.extend(Component)

  it('should render correct contents', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('{{name}}')
  })
})
