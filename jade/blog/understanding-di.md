# <a href="../">«</a> Understanding Dependency Injection

<span class="date">[2014.04.05]</span>

You might be thinking:

> As a programmer writing programs for many years I am skeptical about things with fancy terminology.

Yeah, I know.

> My parents were brutally murdered by a rogue software pattern when I was but a child.

Probably not.

> DI sounds complicated and terrible.

It's not especially complicated or terrible. I promise.
You may have this impression because existing literature failed you.

Let's talk about a case where DI can help us solve a real problem in Node.js.


## Through the lens of Node.js

The great thing about node is modularity. npm makes authoring and consuming modules easy.
But there's one common case that CommonJS doesn't especially help us solve out of the box.

Consider a project where you have layers of modules:

```
car
|-- cup-holders
|-- engine
|    |-- sparkplug
|    +-- piston
+-- drive-train
|    |-- differential
|    +-- scripts
+-- windshield
+-- wheels
  |-- tires
  +-- rims
```

`car` requires `wheels`, `wheels` require `tires`, etc.

You're using this module in one of your projects when you realize you need different tires.
The API for `tires` would be the same, but the behavior needs to be slightly different.

What would you do?

1. write a `different-tires` module
2. write a `different-wheels` module that does `require('different-tires')` instead of `require('tires')`
2. write a `different-car` module that does `require('different-wheels')` instead of `require('wheels')`

To change just one component in the system, you have to rebuild the whole thing from the ground up.

What if we could say "I want a `car` with `different-tires`, but keep everything else the same?"

That would be pretty powerful!


## The Solution

At a high level, we want our modules to describe *what they provide* and *what they need*,
but without coupling them to a specific implementation.
Something else should map the abstract requirements to concrete implementations.

In DI terminology, the **injector** is the thing that gives a modules their dependencies.
When you ask for `tires`, the injector might return `require('different-tires')` to get it.

<aside>
In the Java world, DI systems often use XML files for configuration.
None of the solutions I've seen in node do this. *Whew.*
</aside>

How does it know to get `different-tires` and not `tires`?
Injectors need configuration. Let's look at an example to explain configuration.

### Using `rewire` in Node.js

Node has a few modules that implement DI and work with all the modules in the node ecosystem out-of-the-box.

My current favorite is [`rewire`][rewire].
Here's how it works:

```javascript
var rewire = require('rewire');

// stock version of `car` with regular `tires`
var car = rewire('car');
```

By default `rewire` does exactly the same thing as `require`.

However, you can configure it to change the modules it provides like this:

```javascript
var rewire = require('rewire');
var car = rewire('car');

// make new wheels that use `different-tires`
var wheels = rewire('wheels');
wheels.__set__('tires', require('different-tires'));

// tell the car to use our wheels
car.__set__('wheels', wheels);
```

<aside>
**Caveat:** this means that you might have to peak into the source of the module.
We're assuming here that `wheels` does `var tires = require('tires');`.
</aside>

The `__set__` function overrides a local variable for that module.

Rewire is a good solution for introducing DI into an existing application.


### Decorating

The other cool thing DI lets you do is **decorate** existing modules.
Let's go back to the car example.

What if the existing `tires` module was fine, but we wanted to log whenever `tires.roll()` is called?

Rather than re-implement `tires` with this one change, we can decorate the existing module:

```javascript
var rewire = require('rewire');
var car = rewire('car');

var wheels = rewire('wheels');

// get the existing implementation of `tires`
wheels.__get__('tires', function (tires) {
  // decorate the `tires` module
  var originalRoll = tires.roll;
  tires.roll = function () {
    console.log('rollin');
    return originalRoll.apply(this, arguments);
  };

  // give the decorated implementation back to `wheels`
  wheels.__set__('tires', tires);
});

// tell `car` to use our wheels
car.__set__('wheels', wheels);
```

Decorators can prevent unnecessary code duplication.


## Conclusion

DI becomes more useful in a rich ecosystem of modules.
Rather than rebuild a large module, you can swap out parts as needed.


## Further Reading

If you're interested in DI, I recommend you check out:

* [di.js][] – a DI implementation that works in node and in the browser with ES6, AMD, and CommonJS modules.

My fellow Angular buddies also wrote about DI. They discuss mechanics and implementation a bit more:

* [Misko's Post](http://misko.hevery.com/2010/05/29/dependency-injection-and-javascript-closures/)
* [Jan's Post](http://blog.jankuca.com/post/23066002249/dependency-injection-javascript)
* [Merrick's Post](http://merrickchristensen.com/articles/javascript-dependency-injection.html)

I've also written a bit about DI and decorators with regards to AngularJS:

* [Decorators in AngularJS](https://github.com/btford/brian-talks-about-decorators)

[rewire]: https://github.com/jhnns/rewire
[di.js]: https://github.com/angular/di.js
