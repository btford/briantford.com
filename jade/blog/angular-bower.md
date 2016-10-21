<!--
@authored Mon, Apr 22 2013 08:13:37 -0400
-->

# Writing Reusable AngularJS Components with Bower

[Bower](https://github.com/twitter/bower) is a new package manager for client-side components by talented engineers at Twitter. If you come from the Node.js world, you can think of Bower as "NPM for client-side stuff." Incidentally, the API and configuration is very similar to NPM.

How does Bower relate to AngularJS? If you've used [Yeoman](https://github.com/yeoman/generator-angular), you might have noticed Bower being used to install and update libraries like AngularJS. But besides just JavaScript managing the versions of various libraries for your app, you can use Bower to find, install, update, and even publish your own reusable components. I'm really excited about the prospect of having a bunch of AngularJS components that I can easily import into my own projects, and Bower is certainly a great step towards making that a reality.

It's worth mentioning that I think Bower is still far from perfect. For instance, it's still a bit challenging to have stable versus unstable releases. There are still some conventions in flux (like `component.json` will soon be `bower.json`). Still, I see a lot of great improvements coming in the near future, and I think now is a great time to start looking at Bower for use in your apps. To that end, this post aims to explain how to use AngularJS components in your apps, and how to create your own with an eye for best practices.

## Modules, and Components, and Packages! Oh, my!

These terms have been overloaded to _death_, and if you've been following the various proposals for standardized ECMAScript modules floating around, things get confusing fast. Let's step back a second and define these terms in the context of AngularJS and Bower.

### Package
"Package" is a Bower concept. For the time being, you can think of the terms "package" and "component" as being interchangeable in the context of Bower. In general, "package" is the thing that you can download, and contains a component, which is a group of one or more assets. I say you can think of them as interchangeable because for now, there's a one-to-one correspondence of package to component. For the sake of consistency I'm going to use "component" from here on out.

### Component
"Component" is a Bower concept. A component is a repo which contains some files for client-side use in a web browser. This may include, but is not limited to, JavaScript, CSS, HTML, and images. In the context of this post, I'll be talking mostly about JavaScript, but Bower is great for other things as well.

A Bower component has a `bower.json` file that describes the component and its dependencies. Again, if you come from a Node.js background, you'll be right at home with `bower.json` (though it should be notes that there are some differences between NPM's `package.json` and Bower's `bower.json`).

### Module
Also known as an AngularJS module. It lives in a JavaScript file, and looks like this:

```javascript
angular.module('btford.my-module' ['some-dependency']).
  directive('foo', function () {
    // ...
  });
```


An AngularJS module may have multiple directives, services, or filters, but it's typically best to stick to one per component. For components, each module typically has its own file. Bower components typically contain just one AngularJS module, though in theory you could have more if you have some really good reason.

## Using Components

Before you can use a component, you have to find one. To find AngularJS components, run

```shell
λ → bower search angular
Search results:
  - angular git://github.com/angular/bower-angular.git
  - angular-resource git://github.com/angular/bower-angular-resource.git
  - angular-mocks git://github.com/angular/bower-angular-mocks.git
  - angular-cookies git://github.com/angular/bower-angular-cookies.git
  - angular-sanitize git://github.com/angular/bower-angular-sanitize.git
  - angular-scenario git://github.com/angular/bower-angular-scenario.git
  - angular-unicorn-directive git://github.com/btford/angular-unicorn-directive.git
  ...
```

Unfortunately, Bower is limited in its search API, so it currently doesn't offer any great way to search with multiple keywords. That's okay though, because we can use `grep`. Here's an example seaching for keywords "angularjs" and "phonegap:"

```shell
λ → bower search angular | grep "phonegap"
  - angular-phonegap-ready git://github.com/btford/angular-phonegap-ready.git
  - angular-phonegap-geolocation git://github.com/btford/angular-phonegap-geolocation.git
  - angular-phonegap-accelerometer git://github.com/btford/angular-phonegap-accelerometer.git
  - angular-phonegap-notification git://github.com/btford/angular-phonegap-notification.git
```

Now that we've found a promisingly-named component, we want to do a bit of research to see if it will fit our needs. Typically the best way to do this is to check GitHub for a readme. If we were interested in `angular-phonegap-geolocation` in the above search, we could visit [`http://github.com/btford/angular-phonegap-geolocation`](http://github.com/btford/angular-phonegap-geolocation) to get more info.

After looking at the readme, let's say that we decide that we want to install some component. The command, unsurprisingly, is:

```shell
bower install component-name
```

The component will be downloaded, cached, and then copied to a `components` directory in the current working directory.

See the [bower documentation](https://github.com/twitter/bower#usage) for more.

### In Action

Just for reference, here are some of the Bower components that I've created:

* [Dragon Drop](https://github.com/btford/angular-dragon-drop)
* [PhoneGap Notification](https://github.com/btford/angular-phonegap-notification)
* [Markdown Directive](https://github.com/btford/angular-markdown-directive)
* [Socket.IO Service](https://github.com/btford/angular-socket-io)
* [Unicorn Directive](http://btford.github.io/angular-unicorn-directive/) (my finest work)

Feel free to fork them or use them as a jumping off point (and please file issues if you find any).

## Authoring Components

Let's say you have some AngularJS directive in an existing module that you want to share. How would you package it up?

First, let's make a new directory for it, and `cd` into it:

```shell
λ → mkdir angular-my-directive && cd $_
```

Next, let's make a JavaScript file for our code:

```shell
λ → touch directive.js
```

Now we need to write a `bower.json`. The Bower CLI has us covered here too. Run `bower init` and answer the prompts:

```shell
λ → bower init
name: [angular-my-directive]
version: [0.0.0]
main file: [] directive.js
add commonly ignored files to ignore list? (y/n): [y] y
```

Let's check the contents of this `bower.json` file:

```json
{
  "name": "angular-my-directive",
  "version": "0.0.0",
  "main": "directive.js",
  "ignore": [
    "**/.*",
    "node_modules",
    "components"
  ]
}
```

So far so good. We need to include AngularJS as a dependency. Edit `bower.json` like this:

```json
{
  "name": "angular-my-directive",
  "version": "0.0.0",
  "main": "directive.js",
  "ignore": [
    "**/.*",
    "node_modules",
    "components"
  ],
  "dependencies": {
    "angular": "~1.0.6"
  }
}
```


You probably were able to guess that `1.0.6` refers to the version of AngularJS, but what's that `~` for? This prefix basically means "install the highest 1.0.x version." AngularJS follows the [Semantic Versioning specification](http://semver.org/spec/v1.0.0.html) (often abbreviated to semver). This means that the lowest version number (also called the "patch" number) is for fixes that don't change APIs in a way that is not backwards compatible. In short, this ensures that users of your component will be using a version of AngularJS that has all the latest bug fixes, but not a version whose APIs have changed since you wrote your module.

Now let's add to `directive.js`. As stated before, we want to copy some implementation from an existing app. Still, we should think about how to organize the code. In general, each Bower component should have one AngularJS module associated with it. AngularJS modules can be arbitrary strings, but their names should be unique, since AngularJS will only use the last-registered module for a given name. For this reason, I like to namespace my modules with my Github handle. Therefore, the module declaration looks like this:

```javascript
angular.module('your-name.my-directive', []);
```

Similarly, AngularJS only allows one directive of a given name. I like to use a three-letter namespace for directives, because otherwise the HTML using the directive starts to feel a bit too verbose. I typically use `btf`, my initials, so the directive registration looks something like this:

```javascript
angular.module('your-name.my-directive', []).
  directive('btfMyDirective', function () {
    // implementation goes here
  });
```

After adding our implementation, we want to let other users use our component. In order to do so, we'll need to push the files to a git repo.

Let's initialize a repo:

```shell
λ → git init .
```

Then create the initial commit, following the SemVerTag conventions:

```shell
λ → git add directive.js bower.json
λ → git commit -m "v0.0.0"
λ → git tag v0.0.0
```

Keep in mind that Bower uses the git tags to determine what versions are available for your component. Publishing a new version is as simple as updating the version number in `component.json`, committing, and creating a new tag. Be sure that the tag matches the version number given in `component.json`, and (as always) follow the [SemVer conventions](http://semver.org/spec/v1.0.0.html) for versioning.

Now we just have to push these changes to a git repo. Github is a great choice, so let's go with that. Let's make a repo called `angular-my-component` and push these changes to it (replacing names appropriately):

```shell
λ → git remote add origin git@github.com:your-user-name/angular-my-component.git
λ → git push -u origin master
```

With that, other developers can install the component like this:

```shell
λ → bower install your-user-name/angular-my-component
```

If you want your component to appear in searches and be installable without your user name, you have to register it. Before running a command like this, please see below for a discussion of when and when not to register. Registering bower components is incredibly easy. Like above, you need to have the component hosted at some git endpoint (Github and Bitbucket are great options). Then, you simply run the following command:

```shell
λ → bower register angular-my-component git@github.com:your-user-name/your-repo-name.git
```

Let's go back to the app we grabbed this directive from and refactor to use this one.

```shell
λ → bower install angular-my-component
```

The component is installed, but we have to update our `index.html` file to load the script. Easily enough, we can add:

```html
<script src="components/angular-my-component/directive.js"></script>
```

We also have to add the component's module as a dependency to our app's main list of dependencies. Open up the JavaScript file defining your top-level app, and add the following:

```javascript
angular.module('myApp', [
  // ...
  'your-name.my-directive'
]).
config(function () {
  // ...
});
```


If you remove the old implementation of this directive from your app, and update the references in your HTML to account for the prefix, everything should be good.

But what happens if we find we need to change the directive in our component? Do we have to push a new version of the component just to test it in the app? It turns out that Bower has a great feature for this case.

First, in the `angular-my-component` directory, run:

```
λ → bower link
```

In your application directory, run:

```
λ → bower link angular-my-component
```

What does this do? Basically, it creates a symbolic link from the `angular-my-directive` directory to the appropriate directoy inside of `components` for the app. Thus, when you make changes to the component, they'll be reflected in your app. This is a great way to develop an app and a set of resuable components alongside eachother.

### Adding Tests

As much as is reasonable, you should test your component, especially if you are registering it globally.

You can add tests to a component faily easily using [Karma](http://karma-runner.github.io/). Better yet, you can use [Travis CI](http://karma-runner.github.io/0.8/plus/Travis-CI.html) to automatically run your tests whenever you push code to your repo.

For guidelines on testing directives, check out [Vojta Jina's talk](http://www.youtube.com/watch?v=rB5b67Cg6bc) and corresponding [example on Github](https://github.com/vojtajina/ng-directive-testing). For services, check out the [official docs](http://docs.angularjs.org/guide/dev_guide.services.testing_services). You can also take a peek at the [tests for AngularJS itself](https://github.com/angular/angular.js/tree/master/test) for some good examples.

### Naming Conventions

Although I touched on this in the tutorial above, I've consolidated these opinionated conventions in one place to make it a bit easier to digest. These are the loose conventions I've been using to name Bower packaged AngularJS modules:

* Module name: `<author>.<optional-namespace>.<thing-name>-<optional-thing-type>`
* Service/Directive name: Choose a (short) namespace. I've using "btf," my initials. See my [dragon-drop directive](https://github.com/btford/angular-dragon-drop/blob/master/dragon-drop.js#L10) for an example.
* Bower registered name: `angular-<optional-namespace>-<optional-thing-type>`
* File name: `<thing-name>.js`
* Github repo(s)
    * source repo: `angular-<thing name>`
    * optional build/release repo: `bower-angular-<thing name>-<optional-thing-type>`

I've been using dasherized names and periods to separate parts. That's purely an aesthetic/mnemonic preference. If I use camelCase, I sometimes forget how I decided to name things with acronyms (ex: myHTMLThing, myHtmlThing). I don't feel strongly about this at all, so if someone decides that camelCase is the `One True Way (tm)` and has some compelling reason, that's fine by me.

For `<author>` I like to use my Github handle, but twitter or whatever is fine. The reason that I prefix the module name with an author is to make it easier to fork without introducing confusion. Another developer can fork my module, and as long as they change the `<author>` of the module name, users can use either of my module or the forked one without confusion of which implementation they are using.

I like giving an `<optional-thing-type>` for directives and filters when it's not immediately obvious from the `<thing name>`. For instance, "drag and drop," "date picker," "color picker," are pretty obviously going to be directives. "markdown" might be a service, directive, or filter, so it's good to clarify.

I like giving an `<optional-namespace>` when I have a group of similar components, as when writing wrappers for PhoneGap.

I wouldn't bother creating a separate "build repo" for most projects. If the build step is "[ngmin](https://github.com/btford/ngmin) + uglify," users of this component can have their project's build system take care of it. If you have something more involved, then I think the build/release repo is a fine approach.

### Bower Package Stewardship

While I think sharing code is great, there's no need to globally register absolutely everything to Bower to be able to use it. As mentioned earlier, Bower lets you install from Github like this:

```
λ → bower install btford/angular-dragon-drop
```

This command will resolves to the repo at `git@github.com:btford/angular-socket-io.git`.

Bower also lets you install from arbitrary git repos, so if I didn't want to publicly register on Github. You can do the following:

```
λ → bower install git@github.com:btford/angular-socket-io.git
```

This is handy if you have some company-specific code you're sharing between projects. You can put this code on a private repo, but still install via Bower.

My point is to share things that make sense, but not register a package for absolutely everything. If you're not going to be watching Github and responding to issues, don't register it. Just advise users to `bower install my-name/my-component` (or fork it and do `bower install your-name/whatever-component` ).

Please don't claim a name in the Bower registry if you don't think you'll be able to follow up and help maintain and improve it (or are willing to hand it off to someone else to do so). When in doubt, just use the `bower install user/repo` pattern. You can always register it later.

On the other hand, even if you're new to AngularJS, don't be too intimidated. As long as you're willing to put a little time into maintaining a component, feel free to register it. Try to write some test cases for your component before putting it out there. I think publishing components is a great way to contribute to the community, learn from others, and make something cool. If you come across an AngularJS Bower component that you think could use some sprucing up, kindly let the maintainer know. Be excellent to each other.

### Sharing is Caring

A lot of utility libraries written and wrapped for AngularJS would be useful for users of Backbone, Ember, or who aren't using any framework at all. I really don't want to encourage developers to wrap up all the cool stuff they do into strictly AngularJS modules so it's only available to developers using AngularJS. The general guideline I use is that for something >=1000 LOC that isn't doing something Angular-specific, make a new project, then write an AngularJS adapter (if needed).

On the other hand, there's no need to share things outside of AngularJS that are by nature only useful alongside Angular APIs. A couple hundred lines of JS that rely on `$location` and `$http` isn't worth the effort to use in Backbone.js, even though you could write some abstraction around the AngularJS services. A couple thousand lines for a new routing system for AngularJS also probably doesn't need to be shared with the greater web community. A 2000 LOC library that creates canvas-based animated charts might be worth abstracting into its own library for sharing before using it to write AngularJS directives.

### Kitchen Sink Widgets

As an experiment, I spent some time trying to port jQuery/jQueryUI widgets to AngularJS to avoid the heafty jQuery dependency. A lot of these widgets provide a million different options, and the code becomes a behemoth because of it. The situation is much worse with Angular, because any of these sort of options might be something you want to data-bind to at runtime. So you've introduced a bunch of additional watches that many users won't care about, but might tax the performance of an app using it. For this reason, I think components ought to be lightweight and focused.

If you find a component that does something similar to what you want, but not exactly, consider forking it and changing it rather than adding a bunch of options to the existing one. Where possible, consider using attribute directives with the "mixin" pattern in mind. Users can then compose widgets of many attribute directives to get their end behavior. My rule of thumb is to use an element when the directive needs some specific layout and positioning, and an attribute otherwise. In other words, you don't want directives competing for layout behavior, but you don't want to restrict the usefulness of a directive.

Consider the aformentioned [Unicorn Directive](https://github.com/btford/angular-unicorn-directive). There's currently an issue asking for [rainbow](https://github.com/btford/angular-unicorn-directive/issues/3) support. It might be a better idea to make a seperate rainbow attribute directive, so you can add rainbows to not only `<unicorn>`s, but also other elements (and, naturally, other mythological creatures).

I also think it's best to avoid "Collections of X" components. One component should do one thing well. It's fine for a Bower component to contain an AngularJS module which registers multiple directives or services, but that should only be the cases where you need (or almost always use) these registered things together. This goes for utility components as well. I love the utilities in underscore.js, but I really don't like the "all or nothing" approach to bundling them when most users of the library only use a handful of the many provided.

### Wrapper Modules

I want to avoid having a million AngularJS apps that just wrap other libs. What do I mean by "wrap?"

Let's say you have the `d3` library, and you want to use it in AngularJS. You could create a component called `angular-d3`, with a file like this:

```javascript
angular.module('my-d3-module', []).factory('d3', function () {
  // paste minified d3 code in here
  return d3;
});
```

The reason that this approach is bad is that it creates a lot of maintenance overhead. Using the above example, here are just a few cases that illustrate the problems:

1. Whenever a new version of `d3` is released, `angular-d3` must be updated by copy/pasting the updated `j3.js` code back into our module.
2. Issues might be filed on `angular-d3` that are actually bugs/feature requests for `d3`.
3. The developer of `angular-d3` makes improvements to `angular-d3` that should/could be back-ported to `d3`. Then they release a new version of `angular-d3`.
4. After `3`, the developer for `d3` releases a new version of `d3` with the same version number as `3`'s effective fork of `d3`, creating confusion for users of `angular-d3` and `d3`.

The "right" way to use `d3` right now is to include it as a dependency of some directive that accesses the library directly off of `window.d3`.

**tl;dr: please don't create wrapper modules for components that expose their APIs on `window.whatever`. Just use the API off `window` for now. If Angular needs `$apply` for some `foo-lib` library, feel free to write an adapter, but the adapter should depend on `foo-lib`, not include the files for it.**

The ideal solution to this problem to be standardized ES6/ES7/ESEventually modules and Web Components, but we still don't know when something like that will land.

## Conclusion

A lot of this post was inspired by a [discussion](https://gist.github.com/PascalPrecht/5411171#angular-module-structure-proposal) started by the awesome [Pascal Precht](https://twitter.com/PascalPrecht). If you're interested in how other AngularJS developers have been beginning to use Bower, or have your own thoughts on how the AngularJS open source community should be writing and publishing components, I'd encourage you to read the full thread and leave a comment there as well.

I have a new policy regarding questions: please post to [StackOverflow](http://stackoverflow.com/) and then [Tweet](https://twitter.com/#!/briantford) or [email](sendto:btford@umich.edu) me the link. I love answering questions, but there's a lot of redundancy sometimes. This also lets other developers chime in with their answers, which are often much better, and better explained than my own. If you have general comments or suggestions, just email those right to me.

If you have corrections, you can also [send me a pull request on Github](https://github.com/btford/briantford.com/blob/master/jade/blog/angular-bower.md).

Thanks for reading!
