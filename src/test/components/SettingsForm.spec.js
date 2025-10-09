import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SettingsForm from '@/components/Settings/SettingsForm.vue'

describe('SettingsForm', () => {
  it('renderiza campos básicos', () => {
    const wrapper = mount(SettingsForm, {
      global: { stubs: ['InputText', 'Checkbox'] }
    })
    expect(wrapper.text()).toMatch(/Nombre/i)
    expect(wrapper.text()).toMatch(/Moneda/i)
  })
})
