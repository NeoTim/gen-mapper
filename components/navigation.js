const NavigationTemplate = `
    <container>
        <div class="toggle-wrapper">
            <button class="navigation-toggle-button">
            </button>
        </div>
        <div class="navigation-wrapper">

        </div>
    </container>
`


class Navigation {
    constructor(element) {
        this.isOpen = true;
        this.element = element;
        this.create(element);
        this.bind();
    }

    create(element) {
        const fragment = document.createDocumentFragment();

        while(element.firstChild) {
            fragment.appendChild(element.firstChild);
        }

        element.innerHTML = NavigationTemplate;
        element.classList.add('navigation', 'open')
        this.container = element.querySelector('container');
        this.toggleBtn = element.querySelector('.navigation-toggle-button');
        this.wrapper = element.querySelector('.navigation-wrapper');

        this.wrapper.appendChild(fragment);
    }

    bind() {
        this.toggleBtn.addEventListener('click', (e)=> this.toggle(e), true);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.element.classList[this.isOpen ? 'add' : 'remove']('open');
    }
}