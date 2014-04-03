# <a href="./">«</a> Hacking Core Directives in AngularJS

<span class="date">[2014.04.03]</span>

Because Angular is totally modular, you can easily replace any of its parts.


## Problem

Lets look at `ngSrc` for a case where this technique is useful:

```
<img ng-src="/img/users/{{user.id}}.png">
```

Consider the case where `user` or `user.id` is `undefined`.
Angular will happily interpolate an empty string and set the `<img>`'s `src` attribute to `/img/users/.png`.
This is probably not what you want.

There are a variety of ways to work around this without changing the behavior of `ngSrc`, but
those are boring and add boilerplate.


## Solution

We want to parse a list of [Angular expressions](http://docs.angularjs.org/guide/expression) from
the value of `ngSrc` and only set `src` if all of them are defined.

We can use [decorators](https://github.com/btford/brian-talks-about-decorators) to make `ngSrc`
have this behavior.

```javascript
angular.module('btford.ng-src', []).
  config(function ($provide) {

    // given `{{x}} y {{z}}` return `['x', 'z']`
    function getExpressions (str) {
      var offset = 0,
          parts = [],
          left,
          right;
      while ((left = str.indexOf('{{', offset)) > -1 &&
             (right = str.indexOf('}}', offset)) > -1) {
        parts.push(str.substr(left+2, right-left-2));
        offset = right + 1;
      }

      return parts;
    }

    $provide.decorator('ngSrcDirective', function ($delegate, $parse) {
      // `$delegate` is an array of directives registered as `ngSrc`
      // btw, did you know you can register multiple directives to the same name?

      // the one we want is the first one.
      var ngSrc = $delegate[0];

      ngSrc.compile = function (element, attrs) {
        var expressions = getExpressions(attrs.ngSrc);
        var getters = expressions.map($parse);

        return function(scope, element, attr) {
          attr.$observe('ngSrc', function(value) {
            if (getters.every(function (getter) { return getter(scope); })) {
              attr.$set('src', value);
            }
          });
        };
      };

      // our compile function above returns a linking function
      // so we can delete this
      delete ngSrc.link;

      return $delegate;
    });
  });
```

[Play with this in plunkr](http://plnkr.co/edit/xFzIQNeBgPMW0h0mVNEU?p=preview).

## Why isn't this perfectly reasonable behavior in Angular core?

It could be! The point is that you can make crazy changes to Angular yourself.

Have fun.


## This decorator API is way too complex
I agree. There's a lot of boilerplate.

You know what would be a better API? This:

```javascript
angular.module('btford.ng-src', []).
  hackDirective('ngSrc', function ($delegate) {
    /*
     * ~ do stuff ~
     */

    return $delegate;
  });
```


Here's a helper that adds this API:

```javascript
(function () {
  var originalModule = angular.module;
  angular.module = function () {
    var module = originalModule.apply(this, arguments);
    module.hackDirective = function (name, fn) {
      module.config(function ($provide) {
        $provide.decorator(name + 'Directive', fn);
      });
    };
    return module;
  }
}());
```

**(protip: you can write helpers that abstract away the low lever weird bits of angular)**
