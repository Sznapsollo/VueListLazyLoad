# Vue List Lazy Load 

## About

This is simple example of how to make dynamicaly lazy loaded list/grid/repeater in Vue. Lazy loader is based in standard manner on scroll of container which contains list. If scroll hits bottom position -> additional chunk of data is being loaded from datasource. All lazyloader control and data is inside **<a href="https://github.com/Sznapsollo/VueListLazyLoad/blob/master/inc/js/components/listLazyLoad.js" target="_blank">"inc/js/components/listLazyLoad.js"</a>** file

## Demo
**<a href="http://cultrides.com/test/Github/VueListLazyLoad" target="_blank">Click here to see Demo</a>**

This example contains dummy datasource (dummydatagenerator.php) that can infinitely generate example data. Data is being loaded with use of constraints startRow/endRow - these constraints tell data source which chunk of data should be loaded. If these are nor provided(on the first load they are not) the default values are 0-100.


Take care! 
Wanna touch base? office@webproject.waw.pl