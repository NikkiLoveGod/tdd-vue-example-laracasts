import { mount } from 'vue-test-utils'
import expect from 'expect'
import Question from '../src/components/Question.vue'

describe('Question', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Question, {
      propsData: {
        dataQuestion: {
          title: 'The title',
          body: 'The body'
        }
      }
    })
  })
  
  it('displays title and body', () => {
    see('The title')
    see('The body')
  })

  it('can be edited', () => {
    notToSee('input[name="title"]')
    
    click('#edit')
    
    type('The title', 'input[name="title"]')
    type('The body', 'textarea[name="body"]')
  })
  it('hides edit button while editing', () => {
    click('#edit')
    
    notToSee('#edit')
  })

  it('updates title and body after being edited', () => {
    click('#edit')
    
    type('Changed title', 'input[name="title"]')
    type('Changed body', 'textarea[name="body"]')
    
    click('#update')
    
    see('Changed title')
    see('Changed body')
  })

  it('can cancel out of edit mode', () => {
    click('#edit')

    type('Changed title', 'input[name="title"]')
    type('Changed body', 'textarea[name="body"]')

    click('#cancel')

    see('The title')
    see('The body')
  })

  function click(selector) {
    wrapper.find(selector).trigger('click')
  }

  function type(text, selector) {
    const node = wrapper.find(selector)
    
    node.element.value = text
    node.trigger('input')
  }

  function see (text, selector) {
    const wrap = selector
      ? wrapper.find(selector)
      : wrapper

    expect(wrap.html()).toContain(text)
  }

  function notToSee (selector) {
    expect(wrapper.contains(selector)).toBe(false)
  }
})