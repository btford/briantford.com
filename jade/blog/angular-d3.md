# <a href="./">«</a> Using the D3.js Visualization Library with AngularJS

<span class="date">[2012.07.31]</span>

[D3.js](http://d3js.org/) is very cool. It works at the jQuery level as a wrapper around DOM and SVG with an expressive, functional API. There are a ton of [great examples of what can be done with D3.js](https://github.com/mbostock/d3/wiki/Gallery). By creating [AngularJS directives](http://docs.angularjs.org/guide/directive) that wrap D3.js, you can use the power of AngularJS's data binding to create apps with beautiful visualizations.

We're going to build an app that uses the [Github API](http://developer.github.com/v3/) to allow users to <span class="nope">figure out which of their coworkers have been slacking off</span> analyze commit data for a given project. I was inspired by [this very slick app](http://daha.github.com/angularJS-github-contributors/#/) by [David Haglund](https://github.com/daha), which is also written with AngularJS.

You can [see a demo of the app here](http://btford.github.com/angular-d3-demo/), and [the source for the finished app](https://github.com/btford/angular-d3-demo) is available on Github.

## Getting Started
This is going to be a very simple application, so we're going to write all of the JavaScript in a single file, and include that file in our HTML. We'll start off with this boilerplate HTML file:

```html
<!DOCTYPE html>
<html ng-app="d3DemoApp">
  <head>
    <meta charset="utf-8">
    <title>AngularJS + D3.js</title>
    <script src="http://d3js.org/d3.v2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.js"></script>
    <script src="app.js"></script>
  </head>
  <body ng-ctrl="AppCtrl">
    <!-- Here's where our visualization will go -->
    <gh-visualization val="data"></gh-visualization>
  </body>
</html>
```

And then create `app.js` and add this to the file:

```javascript
// create module for custom directives
var d3DemoApp = angular.module('d3DemoApp', []);

// controller business logic
d3DemoApp.controller('AppCtrl', function AppCtrl ($scope) {

});
```

There are a few things to note about the boilerplate. The `<gh-visualization>` tag is for a directive that we'll write later. When we register the directive, we'll use the normalized form: `ghVisualization`.

## Getting the Data from Github

We'll start by adding a controller that makes requests to the Github API. Most of the code in the controller is for reformating the response from Github as a two-dimensional array: the first dimension is the author, the second dimension is the number of commits for that author for each day.

```javascript
// controller business logic
d3DemoApp.controller('AppCtrl', function AppCtrl ($scope, $http) {

  // initialize the model
  $scope.user = 'angular';
  $scope.repo = 'angular.js';

  // helper for formatting date
  var humanReadableDate = function (d) {
    return d.getUTCMonth()+1 + '/' + d.getUTCDate();
  };

  // helper for reformatting the Github API response into a form we can pass to D3
  var reformatGithubResponse = function (data) {
    // sort the data by author date (rather than commit date)
    data.sort(function (a, b) {
      if (new Date(a.commit.author.date) > new Date(b.commit.author.date)) {
        return -1;
      } else {
        return 1;
      }
    });

    // date objects representing the first/last commit dates
    var date0 = new Date(data[data.length - 1].commit.author.date);
    var dateN = new Date(data[0].commit.author.date);

    // the number of days between the first and last commit
    var days = Math.floor((dateN - date0) / 86400000) + 1;

    // map authors and indexes
    var uniqueAuthors = []; // map index -> author
    var authorMap = {}; // map author -> index
    data.forEach(function (datum) {
      var name = datum.commit.author.name;
      if (uniqueAuthors.indexOf(name) === -1) {
        authorMap[name] = uniqueAuthors.length;
        uniqueAuthors.push(name);
      }
    });

    // build up the data to be passed to our d3 visualization
    var formattedData = [];
    formattedData.length = uniqueAuthors.length;
    var i, j;
    for (i = 0; i < formattedData.length; i++) {
      formattedData[i] = [];
      formattedData[i].length = days;
      for (j = 0; j < formattedData[i].length; j++) {
        formattedData[i][j] = {
          x: j,
          y: 0
        };
      }
    }
    data.forEach(function (datum) {
      var date = new Date(datum.commit.author.date);
      var curDay = Math.floor((date - date0) / 86400000);
      formattedData[authorMap[datum.commit.author.name]][curDay].y += 1;
      formattedData[0][curDay].date = humanReadableDate(date);
    });

    // add author names to data for the chart's key
    for (i = 0; i < uniqueAuthors.length; i++) {
      formattedData[i][0].user = uniqueAuthors[i];
    }

    return formattedData;
  };

  $scope.getCommitData = function () {
    $http({
      method: 'GET',
      url:'https://api.github.com/repos/' +
        $scope.user +
        '/' +
        $scope.repo +
        '/commits'
    }).
    success(function (data) {
      // attach this data to the scope
      $scope.data = reformatGithubResponse(data);

      // clear the error messages
      $scope.error = '';
    }).
    error(function (data, status) {
      if (status === 404) {
        $scope.error = 'That repository does not exist';
      } else {
        $scope.error = 'Error: ' + status;
      }
    });
  };

  // get the commit data immediately
  $scope.getCommitData();
});
```

In a larger application, it would probably be a good idea to move `reformatGithubResponse` into its own service so that it can be easily reused.

Another thing to make note of is that if you want to use Github's API, [you'll need to register it](https://github.com/settings/applications) if you're hosting it somewhere other than `localhost`.

## The Chart

The chart we're going to make is based on the [stacked bar chart example](http://mbostock.github.com/d3/ex/stack.html). We want to bind some model on the scope to the data used by the chart. The chart also has the option of "stacked" and "grouped" layouts. We can also setup a binding to this option as well.

In order to write this, there are a few things to understand about directives. Here is a quick rundown of the way we're going to structure the directive:

```javascript
app.directive('myDirective', function ( /* dependencies */ ) {
  // define constants and helpers used for the directive
  // ...
  return {
    restrict: 'E', // the directive can be invoked only by using <my-directive> tag in the template
    scope: { // attributes bound to the scope of the directive
      val: '='
    },
    link: function (scope, element, attrs) {
      // initialization, done once per my-directive tag in template. If my-directive is within an
      // ng-repeat-ed template then it will be called every time ngRepeat creates a new copy of the template.

      // ...

      // whenever the bound 'exp' expression changes, execute this 
      scope.$watch('exp', function (newVal, oldVal) {
        // ...
      });
    }
  };
});
```

There's a lot more to directives than what I just mentioned, so I recommend [reading the documentation](http://docs.angularjs.org/guide/directive) on the AngularJS site to learn more.

So using the example from D3, and breaking up the code from that example, we are able to write this directive:

```javascript
d3DemoApp.directive('ghVisualization', function () {

  // constants
  var margin = 20,
    width = 960,
    height = 500 - .5 - margin,
    color = d3.interpolateRgb("#f77", "#77f");

  return {
    restrict: 'E',
    scope: {
      val: '=',
      grouped: '='
    },
    link: function (scope, element, attrs) {

      // set up initial svg object
      var vis = d3.select(element[0])
        .append("svg")
          .attr("width", width)
          .attr("height", height + margin + 100);

      scope.$watch('val', function (newVal, oldVal) {

        // clear the elements inside of the directive
        vis.selectAll('*').remove();

        // if 'val' is undefined, exit
        if (!newVal) {
          return;
        }

        // Based on: http://mbostock.github.com/d3/ex/stack.html
        var n = newVal.length, // number of layers
            m = newVal[0].length, // number of samples per layer
            data = d3.layout.stack()(newVal);
        
        var mx = m,
            my = d3.max(data, function(d) {
              return d3.max(d, function(d) {
                return d.y0 + d.y;
              });
            }),
            mz = d3.max(data, function(d) {
              return d3.max(d, function(d) {
                return d.y;
              });
            }),
            x = function(d) { return d.x * width / mx; },
            y0 = function(d) { return height - d.y0 * height / my; },
            y1 = function(d) { return height - (d.y + d.y0) * height / my; },
            y2 = function(d) { return d.y * height / mz; }; // or `my` not rescale
        
        // Layers for each color
        // =====================

        var layers = vis.selectAll("g.layer")
            .data(data)
          .enter().append("g")
            .style("fill", function(d, i) {
              return color(i / (n - 1));
            })
            .attr("class", "layer");

        // Bars
        // ====
        
        var bars = layers.selectAll("g.bar")
            .data(function(d) { return d; })
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
              return "translate(" + x(d) + ",0)";
            });
        
        bars.append("rect")
            .attr("width", x({x: .9}))
            .attr("x", 0)
            .attr("y", height)
            .attr("height", 0)
          .transition()
            .delay(function(d, i) { return i * 10; })
            .attr("y", y1)
            .attr("height", function(d) {
              return y0(d) - y1(d);
            });

        // X-axis labels
        // =============

        var labels = vis.selectAll("text.label")
            .data(data[0])
          .enter().append("text")
            .attr("class", "label")
            .attr("x", x)
            .attr("y", height + 6)
            .attr("dx", x({x: .45}))
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .text(function(d, i) {
              return d.date;
            });

        // Chart Key
        // =========

        var keyText = vis.selectAll("text.key")
            .data(data)
          .enter().append("text")
            .attr("class", "key")
            .attr("y", function (d, i) {
              return height + 42 + 30*(i%3);
            })
            .attr("x", function (d, i) {
              return 155 * Math.floor(i/3) + 15;
            })
            .attr("dx", x({x: .45}))
            .attr("dy", ".71em")
            .attr("text-anchor", "left")
            .text(function(d, i) {
              return d[0].user;
            });

        var keySwatches = vis.selectAll("rect.swatch")
            .data(data)
          .enter().append("rect")
            .attr("class", "swatch")
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d, i) {
              return color(i / (n - 1));
            })
            .attr("y", function (d, i) {
              return height + 36 + 30*(i%3);
            })
            .attr("x", function (d, i) {
              return 155 * Math.floor(i/3);
            });


        // Animate between grouped and stacked
        // ===================================

        function transitionGroup() {
          vis.selectAll("g.layer rect")
            .transition()
              .duration(500)
              .delay(function(d, i) { return (i % m) * 10; })
              .attr("x", function(d, i) { return x({x: .9 * ~~(i / m) / n}); })
              .attr("width", x({x: .9 / n}))
              .each("end", transitionEnd);
        
          function transitionEnd() {
            d3.select(this)
              .transition()
                .duration(500)
                .attr("y", function(d) { return height - y2(d); })
                .attr("height", y2);
          }
        }

        function transitionStack() {
          vis.selectAll("g.layer rect")
            .transition()
              .duration(500)
              .delay(function(d, i) { return (i % m) * 10; })
              .attr("y", y1)
              .attr("height", function(d) {
                return y0(d) - y1(d);
              })
              .each("end", transitionEnd);
        
          function transitionEnd() {
            d3.select(this)
              .transition()
                .duration(500)
                .attr("x", 0)
                .attr("width", x({x: .9}));
          }
        }

        // reset grouped state to false
        scope.grouped = false;

        // setup a watch on 'grouped' to switch between views
        scope.$watch('grouped', function (newVal, oldVal) {
          // ignore first call which happens before we even have data from the Github API
          if (newVal === oldVal) {
            return;
          }
          if (newVal) {
            transitionGroup();
          } else {
            transitionStack();
          }
        });
      });
    }
  }
});
```

We setup margins, dimensions, and colors inside of the directive's closure. We bind `val` and `grouped` to the visualization's internal scope based on the attributes on `<visualization>`. Then, we append an SVG element to the base `<visualization>` element within the link function. Finally, all of the code to draw and redraw the chart goes inside of the `$watch`.

## Finishing Touches

Let's add some styling to the app. Create a CSS file with the following contents, and add it to the head of the HTML:

```css
body {
  font: 14px Helvetica Neue;
  text-rendering: optimizeLegibility;
  margin-top: 1em;
  overflow-y: scroll;
}
.label {
  font-size: .65em;
}
body {
  width: 960px;
  margin: auto;
}
h1 {
  font-size: 36px;
  font-weight: 300;
  margin-bottom: .3em;
}
.error {
  color: red;
}
```

We still need some controls to handle choosing which repository to look at. It would also be nice to have an error message displayed when a user attempts to access a repository that doesn't exist.

```html
<body ng-controller="AppCtrl">
  <h1>Github Commit Graph</h1>

  <form ng-submit="getCommitData()">
    User: <input ng-model="user"></input>
    Repo: <input ng-model="repo"></input>
    <input type="submit" value="Get Data">
    Grouped <input type="checkbox" ng-model="grouped">
  </form>
  
  <p class="error">{{error}}</p>
  <gh-visualization val="data" grouped="grouped"></gh-visualization>
</body>
```

So whenever the user presses "enter" or submits the form, the controller makes a request for the data on the Github API. When the call to Github resolves, the model updates, and because our visualization directive is listening to the `data` model on the scope, it knows to update itself. Similarly, we listen to `grouped` on the scope and run the animated transition accordingly.

## Conclusion

D3.js is a very powerful tool for making visualizations that plays well with AngularJS. Besides D3.js, you can integrate many other libraries by writing services and directives to handle imperatively manipulating the DOM and binding to native browser events.

Comments? [Tweet](https://twitter.com/#!/briantford) or [email](sendto:btford@umich.edu) me. Corrections? [Send me a pull request on Github](https://github.com/btford/briantford.com/blob/master/jade/blog/angular-d3.md).
