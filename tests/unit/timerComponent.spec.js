import { shallowMount } from '@vue/test-utils'
import timerComponent from "@/components/timerComponent";

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(timerComponent,{
      data(){
        return{
          timerID:null
        }
      }
    })
    wrapper.setData({timerID:1})
    expect(wrapper.find('span').exists()).toBe(true)
  })
})
