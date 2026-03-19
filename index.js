import './photo_viewer.js'

class ToggleNavBarButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this))
    const windowsChangeEvent = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
    window.addEventListener(windowsChangeEvent, this.close.bind(this))
  }

  get navbar() {
    const navbar = this.closest('.primary-nav')
    console.assert(navbar)
    return navbar
  }

  onClick(evt) {
    if (!this.navbar) {
      evt.preventDefault()
      return
    }
    this.navbar.classList.toggle('primary-nav__open')
    evt.preventDefault()
  }

  close() {
    if (!this.navbar) {
      return
    }
    this.navbar.classList.remove('primary-nav__open')
  }
}

window.customElements.define('toggle-nav-bar-button', ToggleNavBarButton)

var currentOppenedCard = null
class ArtistCard extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this))
    // const windowsChangeEvent = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
    // window.addEventListener(windowsChangeEvent, this.close.bind(this))
  }

  get details() {
    const details = this.querySelector('.programme-card__artist__details')
    return details
  }

  onClick(evt) {
    if (!this.details) {
      evt.preventDefault()
      return
    }
    this.details.classList.toggle('programme-card__artist__details--open')

    if (this.details.classList.contains('programme-card__artist__details--open')) {
      if (currentOppenedCard != null) {
        currentOppenedCard.close()
      }
      currentOppenedCard = this
      this.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    else {
      if (currentOppenedCard === this) {
        currentOppenedCard = null;
      }
    }
    evt.preventDefault()
  }

  close() {
    if (!this.details) {
      return
    }
    this.details.classList.remove('programme-card__artist__details--open')
    if (currentOppenedCard === this) {
      currentOppenedCard = null;
    }
  }
}

window.customElements.define('artist-card', ArtistCard)
