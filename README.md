# Vue List Lazy Load 

## About

This is simple example of how to make dynamicaly lazy loaded list/grid/repeater in Vue. Lazy loader is based in standard manner on scroll of container which contains list. 

This version of list lazy loader displays all rows of available data basing on property "totalRows" coming from service which says overall number of available data. However actual data is only taken for rows being displayed - rows that are out of sight contain fake/empty data - those rows data will be downloaded when they are scrolled into sight.

All lazyloader control and data is inside **<a href="https://github.com/Sznapsollo/VueListLazyLoad/blob/master/inc/js/components/listLazyLoad.js" target="_blank">"inc/js/components/listLazyLoad.js"</a>** file

Current version of list lazy loader can work only with lists containing rows of equal height. This height can be changed by property "rowHeight". It is also basing on scroll events coming from container containing list of items so if you change the html just make sure that container has scrollbar(and not body or some parent element).

## Demo
**<a href="http://cultrides.com/test/Github/VueListLazyLoad" target="_blank">Click here to see Demo</a>**

This example contains dummy datasource (dummydatagenerator.php) that can infinitely generate example data. Data is being loaded with use of constraints startRow/endRow - these constraints tell data source which chunk of data should be loaded. If these are nor provided(on the first load they are not) the default values are 0-100.


Take care! 
Wanna touch base? office@webproject.waw.pl