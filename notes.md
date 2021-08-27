# Part 6: Favoriting Songs

In this video we will add the ability to favorite songs that are listed in the home section. We'll also make sure that we can remove a song from favorites as well.

## Adding A Column To Our Table

We need to create another column in our table to display icons. We will also be adding more icons as the series progresses.

## Displaying Heart Icons

We will use two icons from the Font Awesome package:

- heart
- heart-o

The filled in heart will be displayed when the song is in the favorites playlist, and the open or empty heart will be visible if it's not.

- https://fontawesome.com/v4.7.0/icons/

## Conditional Logic

Create a **isFavorite** variable to easily tell if the song is in favorites.

```
{ type: 'ADD_FAVORITE', songId: id }
```

## Creating Click Events And Dispatching Actions

We need to dispatch an action when the unfilled heart is clicked. Need to import the dispatch function from context.

```
{ type: 'ADD_FAVORITE', songId: id }
```

## Updating Our Reducer

Our reducer needs to know how to respond to the action that is dispatched. We can add a case for adding a favorite.

## In Memory "Mutation" Or Not

The JS community seems obsessed with functional patterns that don't directly "mutate" state. That basically means mostly it is encouraged to return a new instance of the state, instead of directly manipulating the instance already stored in memory.

This is a good pattern to follow, but not how other programming languages work sometimes. For instance, C++ is very fast and efficient, mainly because you change values directly on the current instance already in memory, instead of creating new versions of them every time.

Every time you create a new instance of something, your computer needs to take time and memory to reallocate memory, do clean up etc. Computers are super fast, so most of the time this isn't a problem, unless you are working on extremely large datasets.

## Direct Mutation

We are going to do a trick here that is way easier than following the typical JS pattern. I do recommend using the non mutation pattern as much as possible in your apps, but for such basic operations like what we are doing, I see absolutely nothing wrong with what we will do.

It results in much less code.

## Add The ID to Favorites

Will all that being said above, lets add the id to favorites in the reducer, and simply return state

## Some Weird Updating

If we go into the app and start clicking on favorites, we won't get immediate feedback that a song is now a favorite. We can go into the favorites playlist and see the song added, then go back to home.

## Quick Trick

The issue we are having is due to how Redux works under the hood. Like I said above, it is built upon that non mutation pattern where each part of your reducer should return a new instance of your state. Since we just **return state** after doing our favorites update, Redux has no clue that we changed anything.

A simple trick is to just return a new instance of the entire state like:

```
{ ...state }
```

## Add Pointer To Icons

Add cursor:pointer to i elements

## Removing Favorites

To make things super simple for now, we will just add a click event to dispatch an action on the filled heart icon for this. Later on, I might update this to include some type of delete icon that shows up instead on hover.

Our action will look like this:

```
{ type: 'REMOVE_FAVORITE', songId: id }
```

## Next Up

Adding songs to custom playlists.
