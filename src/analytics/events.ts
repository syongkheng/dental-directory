import { track } from './index'

/**
 * Typed event helpers. Every call site should go through here
 * so event names and shapes stay consistent across the codebase.
 */
export const Analytics = {
  // Fired automatically by usePageTracking on every route change
  pageView(path: string, title: string) {
    track('page_view', { path, title })
  },

  // Fired automatically by Button for non-WhatsApp CTAs
  buttonClick(
    label: string,
    props?: { component?: string; destination?: string; variant?: string },
  ) {
    track('button_click', { label, ...props })
  },

  // Fired automatically by Button when href contains wa.me
  whatsappClick(source: string) {
    track('whatsapp_click', { source })
  },

  // Fired on first field focus inside a form
  formStart(formName: string) {
    track('form_start', { form: formName })
  },

  // Fired on form submit with qualifying metadata
  formSubmit(formName: string, meta?: Record<string, unknown>) {
    track('form_submit', { form: formName, ...meta })
  },

  formSuccess(formName: string) {
    track('form_success', { form: formName })
  },

  formError(formName: string, error: string) {
    track('form_error', { form: formName, error })
  },

  // action: 'open' | 'close'
  faqToggle(question: string, action: 'open' | 'close') {
    track('faq_toggle', { question, action })
  },
}
