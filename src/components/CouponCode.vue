<template>
  <div>
    <input type="text" class="coupon-code" v-model="code" @input="validate"/>
    <p v-if="valid">
      Coupon Redeemed: {{ message }}
    </p>
    <p v-else>
      Invalid Coupon Code
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '',
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
        ],
        valid: false
      }
    },
    
    computed: {
      selectedCouponCode() {
        return this.coupons.find(c => c.code === this.code)
      },
      
      message() {
        return this.selectedCouponCode && this.selectedCouponCode.message
      }
    },
    
    methods: {
      validate() {
        this.valid = !! this.selectedCouponCode
        
        if (this.valid) {
          this.$emit('applied', this.selectedCouponCode.discount)
        }
      }
    }
  }
</script>