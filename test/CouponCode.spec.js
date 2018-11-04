import { mount } from 'vue-test-utils'
import expect from 'expect'
import CouponCode from '../src/components/CouponCode.vue'

describe('CouponCode', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(CouponCode) 
    wrapper.setData({
      coupons: [
        {
          code: '50OFF',
          message: '50% Off!',
          discount: 50
        },
        {
          code: 'FREE',
          message: 'Entirely Free!',
          discount: 100
        }
      ]
    })
  })
  
  it ('accepts a coupon code', () => {
    expect(wrapper.contains('input.coupon-code')).toBe(true)
  })
  
  it ('validates a real coupon code', () => {
    /**
     * Test the coupon from the UI, with out knowing implementation details
     */
    enterCouponCode('50OFF')
    
    expect(wrapper.html()).toContain('Coupon Redeemed: 50% Off!')
    expect(wrapper.html()).not.toContain('Invalid Coupon Code')
  })
  
  it ('validates a invalid coupon code', () => {
    enterCouponCode('INVALID')

    expect(wrapper.html()).toContain('Invalid Coupon Code')
  })
  
  it ('broadcasts the percentage discount when a valid coupon is entered', () => {
    /**
     * Test the coupon based on implementation detail, the internal code -variable and validate method.
     * You have to weigh in the pros and cons - which way is less brittle in the long run.
     */
    wrapper.setData({
      code: '50OFF'
    })
    
    wrapper.vm.validate()
    
    expect(wrapper.emitted().applied).toBeTruthy()
    expect(wrapper.emitted().applied[0]).toEqual([50])
  })
  
  function enterCouponCode(code) {
    let couponCode = wrapper.find('input.coupon-code')

    couponCode.element.value = code
    couponCode.trigger('input')
  }
})