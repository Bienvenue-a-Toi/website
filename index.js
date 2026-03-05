import './photo_viewer.js'

class ToggleNavBarButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this))
    const windowsChangeEvent = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
    window.addEventListener(windowsChangeEvent, this.close.bind(this))
  }

  get navbar() {
    const navbar = this.closest('.primary-nav')
    console.assert(navbar !== undefined)
    return navbar
  }

  onClick(evt) {
    this.navbar.classList.toggle('primary-nav__open')
    evt.preventDefault()
  }

  close() {
    this.navbar.classList.remove('primary-nav__open')
  }
}

window.customElements.define('toggle-nav-bar-button', ToggleNavBarButton)

