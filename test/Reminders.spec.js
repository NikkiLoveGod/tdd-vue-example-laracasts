import { mount } from 'vue-test-utils'
import expect from 'expect'
import Reminders from '../src/components/Reminders.vue'

describe('Reminders', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(Reminders)
  })
  
  it('Hides reminders list if there are none', () => {
    expect(wrapper.contains('ul')).toBe(false)
  })

  it('Can add reminders', () => {
    addReminder('Go to the store')

    expect(wrapper.find('ul').text()).toContain('Go to the store')
  })

  function addReminder (body) {
    const newReminder = wrapper.find('.new-reminder')

    newReminder.element.value = body
    newReminder.trigger('input')

    wrapper.find('button').trigger('click')
  }
})