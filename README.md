# Accounting

This is an accounting system.  My memory of accounting is somewhat foggy and will hopefully resolve over the time I spend working on it.  It's intended only as a learning project and not for real world use.

It is a website built on the MEAN stack (minus angular). Node, express, mongoose.  Also, bootstrap.


* Login stuff
* Company
* Accounts
* Transactions
    * Transaction: Account, Type, Amount, Companion Accounts {which account, type, amount}


```
Routes
............................
companies/:id/accounts/:id

INDEX       /companies
            /companies/:id/accounts/:id/transactions
            /users

NEW         /companies/new
            /companies/:id/accounts/new
            /companies/:id/accounts/:id/transactions/new
            /users/new

CREATE      /companies
            /companies/:id/accounts
            /companies/:id/accounts/:id/transactions
            /users

SHOW        /companies/:id
            /companies/:id/accounts/:id
            /companies/:id/accounts/:id/transactions/:id
            /users/:id

EDIT        /companies/:id/edit
            /companies/:id/accounts/:id/edit
            /companies/:id/accounts/:id/transactions/:id/edit
            /users/:id/edit

UPDATE      /companies/:id
            /companies/:id/accounts/:id
            /companies/:id/accounts/:id/transactions/:id
            /users/:id

DESTROY     /companies/:id
            /companies/:id/accounts/:id
            /companies/:id/accounts/:id/transactions/:id
            /users/:id
```
