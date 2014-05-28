# fabulist

Create ListViews for Titanium with enhanced templates

## Usage

```js

/*
 * Templates
 *  
 *  
 *  They are similar to Ti.UI.ListView templates.
 *  The only difference : you don't choose a bindId to link with the data
 *  -> fabulist will generate the ids for you.
 * 
 *  To bind data follow this example with the 'name' parameter
 */

var template = fabulist.createTemplate({
    childTemplates: [
      {
        type: 'Ti.UI.Label',
        properties: {
          text: '{{name}}',
          color: 'black'
        }
      }
    ]
});

/*
 * createFabulist is a wrapper for createListView
 * 
 * 
 *  -> with a feed() method (as the example below)
 */

var list = fabulist.createFabulistView({template: template});
var win = Ti.UI.createWindow();

list.feed([
  {name: 'John'},
  {name: 'Jack'},
  {name: 'James'}
]);

win.add(list);
win.open()
```
