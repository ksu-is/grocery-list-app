# GA WDIR Project 3

## Grocery List Tracker : "Shopmate"

[Heroku Link] (http://shopmate-app.herokuapp.com/)

#### Group: Brad Volts, Zarela Graves, and Eric Stermer

## App Overview

Shopmate keeps track of items for a grocery shopping list. Each added item is displayed in the main user page. If items are favorited, they will be displayed under the favorites page.
Items displayed on users board, can be clicked to open a show page for more information or be edited if necessary.
This application features authentication of a user after registration and login. User will only see the navigation bar if currently in session.

## Original Wireframe

[Wireframe File] (https://drive.google.com/open?id=0B9p6hJKmZMZEMlRSRXdWUTFaQ00)

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
* Click on item to get more information about item
* User can logout

## Unsolved Features (during process)

* Originally our plan was to add a new item on the same page where the list is displayed. It worked at the beginning, but once we started adding more functionality, our items were not being added dynamically. We could only see the added items after we refreshed. Because we could not fix this issue, we opted for sending the ADD NEW ITEM to it's own state.
* When editing, information was carried to the form, however, if fields were not filled again, when saving they will not show back on users page. We removed the option of carrying previously entered data to place holders, so user is not misled and knows he/she will need to complete all fields again.

## Stretch Goals (wish list)

* A view of commonly purchased items
* An option where user could mark as purchased multiple items
* An option where user can add items to grocery list from favorited or commonly purchased items
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
Show page: https://www.arcticbuyingco.com/wp-content/uploads/2016/06/groceries.png
Edit page: http://bensfruitveg.com/wp-content/uploads/2014/10/groceries-crate.png
