
class UserAuthentication {
    constructor() {
        this.isNewUser = false;
        this.confirmedPassword = null;
        this.data = { email: null, password: null }
    }

    attached() {
        this.container = document.querySelector('container');
        this.form = document.querySelector('form');

        this.showSignupButton = document.querySelector('#show-signup-toggle');
        this.showLoginButton = document.querySelector('#show-login-toggle');
        this.bind();
    }

    bind() {
        let onkeyup = (event)=> {
            this.toggleLoginButton(this.checkValidity());
        }

        let onsubmit = (event) => {
            event.preventDefault();

            if (this.checkValidity()) {
                this.login();
            }
        }
        
        this.form.addEventListener('keyup', onkeyup);
        this.form.addEventListener('submit', onsubmit);
        
        this.showSignupButton.addEventListener('click', (event)=> {
            event.preventDefault();
            this.container.classList.add('is-signup');
            this.container.classList.remove('is-login');
        })
        
        this.showLoginButton.addEventListener('click', (event)=> {
            event.preventDefault();
            this.container.classList.add('is-login');
            this.container.classList.remove('is-signup');
        })
    }

    toggleLoginButton(visible) {
        this.form.classList[visible ? 'add' : 'remove']('show-login-button');
    }

    toggleCreateNewUser(bool) {
        this.isNewUser = !this.isNewUser;
        this.form.classList[bool ? 'add' : 'remove']('show-confirm-pass');
    }
    
    checkValidity() {
        if ( this.form.email.value && this.form.password.value ) {
            if (this.isNewUser && this.form.password.value !== this.form.password2) {
                return false;
            }
            return true
        }
        return false
    }

    displayInvalidLogin(validity) {
        this.form.classList[validity ? 'add' : 'remove']('invalid-login');
    }

    login() {

        const data = {
            email: this.form.email.value,
            password: this.form.password.value
        }

        $.ajax({
            url: 'users/login',
            method: 'POST',
            data: data,
            success: (data)=> {
                console.log(data)
                this.displayInvalidLogin(false);
            },
            error: (err)=> {
                this.displayInvalidLogin(true);
            }
        })
    }
    
}