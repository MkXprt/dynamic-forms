import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  template = <any>{
    fields: [{
      key: 'loginEnabled',
      type: 'control',
      label: 'Login enabled',
      input: {
        type: 'checkbox'
      }
    },
    {
      key: 'login',
      type: 'group',
      label: 'Login',
      expressions: {
        hidden: '!model.loginEnabled'
      },
      fields: [{
        key: 'email',
        type: 'control',
        label: 'Email',
        input: {
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        }
      }, {
        key: 'password',
        type: 'control',
        label: 'Password',
        input: {
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        }
      }]
    },
    {
      key: 'registerEnabled',
      type: 'control',
      label: 'Register enabled',
      input: {
        type: 'checkbox'
      }
    },
    {
      key: 'register',
      type: 'group',
      label: 'Register',
      expressions: {
        hidden: '!model.registerEnabled'
      },
      fields: [{
        key: 'name',
        label: 'Name',
        type: 'control',
        input: {
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        }
      }, {
        key: 'email',
        type: 'control',
        label: 'Email',
        input: {
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        }
      }, {
        key: 'address',
        type: 'group',
        label: 'Address',
        fields: [{
          key: 'town',
          type: 'control',
          label: 'Town',
          input: {
            type: 'text',
            placeholder: 'Enter your town',
            minLength: 5,
            maxLength: 10
          },
          validation: {
            required: true,
            minLength: true,
            maxLength: true
          }
        }, {
          key: 'street',
          type: 'control',
          label: 'Street',
          hidden: true,
          input: {
            type: 'text',
            placeholder: 'Enter your street',
            minLength: 5,
            maxLength: 10
          },
          validation: {
            required: true,
            minLength: true,
            maxLength: true
          }
        }]
      }, {
        key: 'password',
        type: 'control',
        label: 'Password',
        input: {
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        }
      }]
    },
    {
      key: 'underlying',
      type: 'group',
      label: 'Underlying',
      fields: [{
        key: 'currencyPair',
        type: 'control',
        label: 'Currency pair',
        input: {
          type: 'select',
          placeholder: 'Select the currency pair',
          options: [
            { value: 'EURUSD', label: 'EUR/USD' },
            { value: 'EURGBP', label: 'EUR/GBP' }
          ]
        },
        validation: {
          required: true
        }
      }, {
        key: 'number',
        type: 'control',
        label: 'Notional',
        input: {
          type: 'number',
          placeholder: 'Enter the notional',
          min: 0,
          max: 20
        },
        validation: {
          required: true,
          min: true,
          max: true
        }
      }]
    },
    {
      key: 'tenants',
      type: 'array',
      label: 'Tenants',
      hidden: true,
      fields: null
    },
    {
      key: 'users',
      type: 'array',
      label: 'Users',
      fields: [{
        key: 'name',
        type: 'control',
        label: 'Name',
        input: {
          type: 'text',
          placeholder: 'Enter name'
        },
        validation: {
          required: true
        }
      }, {
        key: 'email',
        type: 'control',
        label: 'Email',
        input: {
          type: 'number',
          placeholder: 'Enter email',
          min: 0,
          max: 20
        },
        validation: {
          required: true,
          min: true,
          max: true
        }
      }]
    },
    {
      key: 'roles',
      type: 'group',
      label: 'Roles',
      hidden: true,
      fields: null
    }]
  };
  model = {
    loginEnabled: true,
    login: {
      email: 'user@mail.com'
    },
    register: {
      name: 'user',
      email: 'user@mail.com',
      address: {}
    },
    users: [
      { name: 'user1', email: 'user1@mail.com' }
    ]
  };
}
