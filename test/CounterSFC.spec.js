import { mount } from 'vue-test-utils'
import Counter from '../src/components/CounterSFC.vue'
import expect from 'expect'

describe('CounterSFC', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(Counter)
  })

  it('Defaults to a count of 0', () => {
    expect(wrapper.vm.count).toBe(0)
  })

  it('Increments the count when the button is clicked', () => {
    expect(wrapper.vm.count).toBe(0)

    wrapper.find('.increment').trigger('click')

    expect(wrapper.vm.count).toBe(1)
  })
  
  it('Decrements the count when the decrement button is clicked', () => {
    expect(wrapper.vm.count).toBe(0)

    wrapper.find('.increment').trigger('click') // 1 
    wrapper.find('.increment').trigger('click') // 2
    wrapper.find('.decrement').trigger('click') // 1

    expect(wrapper.vm.count).toBe(1)
  })
  
  it('Never goes below zero', () => {
    wrapper.find('.decrement').trigger('click')
    
    expect(wrapper.vm.count).toBe(0)
  })
  
  it('Displays the current count', () => {
    expect(wrapper.find('.count').html()).toContain(0)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('.count').html()).toContain(1)    
  })
})