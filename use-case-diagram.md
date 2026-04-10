# Kape Kanto Hub Use Case Diagram

This version is closer to the sample image:
- actors are outside the system box
- use cases are inside the system box
- lines only show who can do each action
- it does not mean the actions must happen in that exact order
- simple security use cases are also included

## Actors

- Customer
- Admin
- Rider
- Payment Gateway

## Use Case Diagram

```mermaid
flowchart LR
    customer[Customer]
    admin[Admin]
    rider[Rider]
    payment[Payment Gateway]

    subgraph system[Kape Kanto Hub System Use Case Diagram]
        c1([View Menu])
        c2([Search Food])
        c3([Register / Sign In])
        c4([Place Order])
        c5([Pay Order])
        c6([Track Order])
        c7([Manage Account])

        a1([Manage Orders])
        a2([Assign Rider])
        a3([Manage Users])
        a4([Manage Menu])

        r1([Check Delivery Order])
        r2([Mark Order as Delivered])

        s1([Authenticate User])
        s2([Authorize Admin Access])
        s3([Validate Input])
    end

    customer --- c1
    customer --- c2
    customer --- c3
    customer --- c4
    customer --- c5
    customer --- c6
    customer --- c7
    customer --- s1
    customer --- s3

    admin --- a1
    admin --- a2
    admin --- a3
    admin --- a4
    admin --- s1
    admin --- s2
    admin --- s3

    rider --- r1
    rider --- r2
    rider --- s3

    payment --- c5
```

## Short Explanation

- Customer can view the menu, search food, sign in, place an order, pay, track the order, and manage account details
- Admin manages orders, assigns riders, manages users, and manages menu items
- Rider checks delivery orders and marks them as delivered
- Payment Gateway is used when the customer pays for the order
- Security is shown through user sign in, admin-only access, and input checking
