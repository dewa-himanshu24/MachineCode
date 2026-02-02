

// 1. The Architecture
// We need a ToastManager that:

// Creates a Container (if it doesn't exist).
// Creates a DOM element for each toast.
// Manages the Timer to remove the element.

class ToastManager {
  constructor() {
    this.container = this._createContainer();
  }

  // 1. Create a fixed container for all toasts
  _createContainer() {
    let container = document.querySelector('.toast-container');

    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    return container;
  }

  show({ message, type='info', duration}) {
    duration = duration * 1000;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    toast.innerHTML = `
      <span>${message}</span>
      <button class='toast-close'>&times;</button>
    `;

    this.container.appendChild(toast);

    const removeToast = () => {
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => {
        toast.remove();
      })
    }

    toast.querySelector('.toast-close').onclick = removeToast;

    setTimeout(removeToast, duration);
  }
}

const toast = new ToastManager();

const notificationButton = document.querySelector('#notification-button');
notificationButton.addEventListener('click', () => {
  toast.show({
    message: 'Show Notifcation',
    type: 'success',
    duration: 4,
  })
})