import { mount } from 'vue-test-utils'
import expect from 'expect'
import Question from '../src/components/Question.vue'
import moxios from 'moxios'

describe('Question', () => {
  let wrapper

  beforeEach(() => {
    moxios.install()
    
    wrapper = mount(Question, {
      propsData: {
        dataQuestion: {
          title: 'The title',
          body: 'The body'
        }
      }
    })
  })
  
  afterEach(() => {
    moxios.uninstall()
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

  it.only('updates title and body after being edited', (done) => {
    moxios.stubRequest(/questions\/\d+/, {
      status: 200
    })

    notToSee('Question updated successfully')
    
    click('#edit')
    
    type('Changed title', 'input[name="title"]')
    type('Changed body', 'textarea[name="body"]')
    
    click('#update')

    see('Changed title')
    see('Changed body')
    
    moxios.wait(() => {
      see('Question updated successfully')
      done()      
    })
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