# GA WDIR Project 3

## Grocery List Tracker : "Shopmate"

[Heroku Link] (http://shopmate-app.herokuapp.com/)

#### Group: Brad Volts, Zarela Graves, and Eric Stermer

## App Overview

Shopmate keeps track of items for a grocery shopping list. Each added item is displayed in the main user page. If items are favorited, they will be displayed under the favorites page.
Items displayed on users board, can be clicked to open a show page for more information or be edited if necessary.

## Original Wireframe

Wireframe File](https://drive.google.com/open?id=0B9p6hJKmZMZEMlRSRXdWUTFaQ00)

## User Stories

User can:
* Create an account
* Successfully login
* Add items to the shopping list
* Edit items previously created
* Delete items from grocery list
* Mark items as purchased
* Mark items as favorites
* View all favorite items in one page
* Click on item to have more information about item

## Unsolved Features (Stretched Goals)

* A view of commonly purchased items
* An option where user could mark as purchased multiple items
* An option where user can add items to grocery list from favorited or commonly purchased items.
* Create a family option where family members can contribute to the list
* Use API to get detailed data for grocery items


## Models Used

```
  UserSchema{
    username: String,
    password: String,
    groceryList: [itemSchema]
  }

  ItemSchema{
    name: String,
    description: String,
    favorite:  Boolean,
    completed: Boolean
  }

```

### Copyrights
Art used:
Board on user page: https://raw.githubusercontent.com/rheh/CSS-Sticky-Notes/master/cork_board.gif
