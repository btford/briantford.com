# <a href="./">«</a> Building PhoneGap Apps with AngularJS

<span class="date">[2013.01.20]</span>

For the uninitiated, PhoneGap [(or Cordova; I'm going to use the terms interchangeably)](http://phonegap.com/2012/03/19/phonegap-cordova-and-what%E2%80%99s-in-a-name/) lets you write native applications for Android, iOS, and other mobile platforms as if they were web apps. That's really exciting because I know web stuff, but I have no interest in investing the time to learn my way through an increasing number of mobile platforms. By reusing the same JavaScript code across multiple devices, I can cover more platforms with less code. There's even a good chance I can reuse some of the code on a related desktop site. Less code to write also means less code I have to maintain. It's a win-win!

When talking about PhoneGap, there are two percieved downsides: performance and "leaky platform abstractions." Performance is straightforward: JavaScript can be noticably slower than Java on Android's Dalvik VM or Objective-C compiled and running on iOS. Emphasis on _can_ and _noticably_. If you're careful in how you build your app, this issue is readily mitigated.

By "leaky abstractions," I'm referring to [Joel Spolsky's Law of Leaky Abstractions](http://www.joelonsoftware.com/articles/LeakyAbstractions.html). The idea is simply that abstractions aren't perfect. For PhoneGap, this means some of the time you'll still have to reach in and get your hands dirty dealing with details of a particular platform, even though PhoneGap is supposed to hide these things from you. If the time it takes you to wrestle out the specifics of each platform is too great, then you haven't really saved yourself any time by choosing PhoneGap over a native solution.

The goal for this tutorial is to get PhoneGap up and running with AngularJS, and then show how to use PhoneGap's APIs with Angular to get access to mobile APIs like notifications, geolocation, accelerometer, and [more](http://docs.phonegap.com/en/2.3.0/index.html). Then I'll spend a bit of time talking about best practices and performance tweaks to make sure your mobile app runs smoothly. Finally, I'll evaluate whether these two concerns are legitimate issues in my own experiences.

## Getting PhoneGap

First, we have to setup our development enviornment and get PhoneGap installed. I'm going to be setting up to build an Android app, but the general ideas should be transferable to any of the platforms supported by PhoneGap. [Follow this tutorial](http://docs.phonegap.com/en/2.3.0/guide_getting-started_index.md.html) from the PhoneGap site to get started.

Compile and run, and you should see a default "Cordova Device Ready" page.

![Default phonegap page](/img/blog/cordova-device-ready.png)

We want to remove this and replace it with our AngularJS app.

## Getting Angular into PhoneGap
To scaffold our mobile app, we can use [Yeoman](http://yeoman.io/).

```shell
λ → cd your-app/assets
λ → yeoman init angular
```

This will setup a simple app.

Next, grab the Cordova JavaScript file and put it into our folder structure.

```
λ → mv www/cordova-2.3.0.js app/scripts/vendor/
```

We want to add this file to our `app/index.html`.  Right above the `angular.js` script, add:

```html
<script src="scripts/vendor/cordova-2.3.0.js"></script>
```

Then we can clean up some unneeded files.

```shell
λ → rm -rf www
```

Now we need to reconfigure our Android app to load `assets/app/index.html` instead of `assets/www/index.html`. Open `src/<your package name>/<YourAppName>.java`, and replace this line:

```shell
λ → super.loadUrl("file:///android_asset/www/index.html");
```

With the following:

```shell
λ → super.loadUrl("file:///android_asset/app/index.html");
```

With these changes in place. Build and run the project again, and you should see:

![Yeoman boilerplate in PhoneGap](/img/blog/cordova-yeoman.png)

From here, we should be able to start using PhoneGap. We're going to just setup a proof-of-concept app that will simply display some geolocation data when a user loads up the app.

First, let's write a service to make calls to PhoneGap's geolocation API.

```javascript
assetsApp.factory('geolocation', function ($rootScope, cordovaReady) {
  return {
    getCurrentPosition: function (onSuccess, onError, options) {
      navigator.geolocation.getCurrentPosition(function () {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      },
      options);
    }
  };
});
```

Then we need to use this in one of our controllers. Open `scripts/controllers/main.js`, and modify it accordingly:

```javascript
assetsApp.controller('MainCtrl', function ($scope, geolocation) {
  geolocation.getCurrentPosition(function (position) {
    alert('Latitude: '              + position.coords.latitude          + '\n' +
          'Longitude: '             + position.coords.longitude         + '\n' +
          'Altitude: '              + position.coords.altitude          + '\n' +
          'Accuracy: '              + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '               + position.coords.heading           + '\n' +
          'Speed: '                 + position.coords.speed             + '\n' +
          'Timestamp: '             + position.timestamp                + '\n');
  });
});
```

Let's talk about this code briefly before giving it a whirl. When we run the app, we expect to see an alert with some geolocation data.

![No change](/img/blog/cordova-yeoman.png)

The callback is not firing, but we are greeted with some errors in console.

### What's Happening?

Why does this error out? A little digging through [the docs](http://docs.phonegap.com/en/2.3.0/cordova_events_events.md.html#deviceready) gives us this:

    Cordova consists of two code bases: native and JavaScript. While the native code is loading, a custom loading image is displayed. However, JavaScript is only loaded once the DOM loads. This means your web application could, potentially, call a Cordova JavaScript function before it is loaded.

Cordova fires a `deviceready` event that we need to listen for. The docs also mention that:

> This event behaves differently from others in that any event handler registered after the event has been fired will have its callback function called immediately.

So all we have to do is ensure calls to Cordova's APIs don't happen until after `deviceready` fires.

Now we have a few options:

1. Wait until cordova bootstraps, then asynchronously boostrap Angular
2. Check before each API call, and add the call to a queue if cordova is not loaded yet

Option 1 is easier to code; we asynchronously bootstrap when `deviceready` fires. By doing this, we ensure that PhoneGap's API is always available. But it means that the user will see a flicker and the app will be unresponsive from the point when the app starts until Cordova loads.

Option 2 is a bit tricker to code, and might result in less DRY (Don't Repeat Yourself) code.

Thankfully, JS is a high level language so we can write a wrapper that gives us the best of both worlds. This wrapper will queue up PhoneGap API calls if called before `deviceready` and call them after `deviceready` fires. After `deviceready` has been called, the API calls will occur normally.

We will use Yeoman to create a service called `cordovaReady` implementing this strategy. In your console, type:

```shell
λ → yeoman init angular:service cordovaReady
```

Open the file, and edit it accordingly:

```javascript
assetsApp.factory('cordovaReady', function() {
  return function (fn) {

    var queue = [];

    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);

    return function () {
      return impl.apply(this, arguments);
    };
  };
});
```

Returning to our `geolocation` service, we want to wrap our implementation in our `cordovaReady` function:

```javascript
assetsApp.factory('geolocation', function ($rootScope, cordovaReady) {
  return {
    getCurrentPosition: cordovaReady(function (onSuccess, onError, options) {
      navigator.geolocation.getCurrentPosition(function () {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      },
      options);
    })
  };
});
```

Let's give that a shot.

![Success](/img/blog/cordova-success.png)

Success! Going further, you could wrap this with AngularJS's promise implementation to make dealing with geolocation in your application even easier.

Other PhoneGap APIs can be wrapped using the same technique. Here's another example I did, wrapping the accelerometer:

```javascript
assetsApp.factory('accelerometer', function ($rootScope, cordovaReady) {
  return {
    getCurrentAcceleration: cordovaReady(function (onSuccess, onError) {
      navigator.accelerometer.getCurrentAcceleration(function () {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      });
    })
  };
});
```

The key thing to note is the use of `$rootScope.$apply` around callbacks so that Angular will know when models change.

## What Works
After overcoming that minor hiccup, everything else I tried seemed to work fine. This PhoneGap thing is really impressive!

### History
I was worried that history would be broken in the app, but that was not the case. The back button seems to do exactly what you'd expect in a typical AngularJS app. Routes with `ngView` work perfectly.

### Performance
In general, the Android simulator seems to run pretty sluggishly on OS X. In order to evaluate the performance of my app, I plugged my phone in and ran the app there. This AngularJS app ran much faster than expected on my Galaxy Nexus. There was no noticable lag. Despite PhoneGap's reputation, I'm not sure I'd be able to differentiate this app from a native one.

To try to strain the phone, I used `setInterval`, calling `getCurrentPosition` every 100 miliseconds, and then tested scrolling the app up and down. Worked fine. 10ms? Still a champ. Anything lower and the PhoneGap APIs didn't respond fast enough to cause continuous scope digests. Not satisfied, I made an array of two thousand elements, had each item in the list update every hundred milliseconds. Then I tested scrolling the list up and down. Still fine.

I can't tell if it ran quickly because my phone is awesome, or because my app was too minimal. At any rate, AngularJS certainly left a small footprint. With that in mind, you may run into issues on older phones (or really all phones that aren't a Galaxy Nexus). I suspect some of the reports of sluggishness came from cases when doing things with lots of images, SVG, HTML5 canvas, or taxing CSS3 animations.

Phones will only continue to improve, and as they do so, PhoneGap will become increasingly viable. Still, there are a few things I was able to think of to avoid poor performance when using AngularJS with PhoneGap.

## Performance Tips
In my tinkering with PhoneGap, I was not able to create an app that did something reasonable and made performance terrible. Still, there are some things to consider to ensure your apps run smoothly.

### Clean Up After Yourself
Many mobile apps will want to poll PhoneGap APIs. When you change routes with `ng-view`, the scope will be desctoryed, at which point you'll want to stop polling. The best way to achieve this is to use `$scope.$on('$destroy')`. Here's a full example based on the geolocation service we created earlier:

```javascript
assetApp.controller('MyCtrl', function ($scope, geolocation) {
  var intervalId = setInterval(function () {
    geolocation.getCurrentPosition(function (position) {
      $scope.position = position;
    });
  }, 100);

  $scope.$on('$destroy', function () {
    clearInterval(intervalId);
  });
});

```

Using this technique will ensure that you don't have zombie callbacks wasting precious CPU cycles and battery life. It will help eliminate memory leaks.

### Avoid Unnecessary Digest Cycles
I wrote some about techniques to do this in my [post on scaling apps](http://briantford.com/blog/huuuuuge-angular-apps.html), but the ideas are equally valuable in mobile apps.

## Testing
How do you test a PhoneGap application? Because we created services around PhoneGap APIs, unit tests should be relatively easy. You just have to mock out Cordova-related services, then use [Testacular](http://vojtajina.github.com/testacular/), connecting your phone's browser as a test runner. From there, it should be exactly the same as testing any other application.

## Other Resources
In writing this article, I came across a wealth of useful articles, examples, and plugins. By now you hopefully have a good grasp on the AngularJS end of things, but we've just scratched the surface of PhoneGap.

### Code
Andy Joselin has created a very nice [mobile navigation library](https://github.com/ajoslin/angular-mobile-nav) for making mobile apps. This lets you give apps an iOS-like side-swipe animation. It seems like a great fit for PhoneGap.

Tobias Bosch's [jQuery Mobile Angular Adapter](https://github.com/tigbro/jquery-mobile-angular-adapter) is another great library for developing mobile apps with Angular. Based on [jQuery Mobile](http://jquerymobile.com/), this library gives you better control of touch events, as well as some of the jQuery Mobile widgets.

### Blogs
Max Ogden has two great posts about his experiences [addressing performance issues](http://maxogden.com/fast-webview-applications.html) and [building a PhoneGap application in general](http://maxogden.com/building-webview-applications.html). Definitely worth a read.

The [PhoneGap project's own blog](http://phonegap.com/blog/) is another great resource with a variety of in-depth tutorials.

### Plugins
Although I have not gotten a chance to play around with them too much, PhoneGap has a [plugin system](https://github.com/phonegap/phonegap-plugins) for exposing additional phone features. You can even [write your own](http://www.adobe.com/devnet/html5/articles/extending-phonegap-with-native-plugins-for-android.html). Sweet!

While outside the scope of this article, these plugins might help you create apps that do all sorts of additional things with phone hardware. For instance, Android has plugins for a [scanning barcodes](https://github.com/phonegap/phonegap-plugins/tree/master/Android/BarcodeScanner), [taking screenshots](https://github.com/phonegap/phonegap-plugins/tree/master/Android/Screenshot), or even [speech recognition](https://github.com/phonegap/phonegap-plugins/tree/master/Android/SpeechRecognizer).

In dealing with these plugins, my advice is to wrap the functionality in a service. This will allow you move your app outside of a PhoneGap environment if you need to.

## Conclusion
To evaluate the downsides I mentioned in the introduction: I don't think performance is a big deal, and the abstractions presented in PhoneGap API map pretty naturally to JavaScript. For cases where you want to do do something with specific hardware, PhoneGap provides plugins. In all, I think that the benefits to using PhoneGap greatly outweight the downsides.

Although there were a few caveats, making a PhoneGap application with AngularJS was pretty straightforward, and really empowering. I was pleasantly surprised, and definitely would recommend PhoneGap to others. I really hope this is the future of writing mobile phone apps. Google has had [Chromium OS](http://www.chromium.org/chromium-os) for a while, and Mozilla has been hard at work on [Firefox OS](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS). [HTML5 apps in Windows 8](http://blogs.msdn.com/b/davrous/archive/2012/05/11/windows-8-html5-metro-style-app-how-to-create-a-small-rss-reader-in-30min-part-1-2.aspx) is also a thing.

Still there are obvious cases for native apps as well. If you're writing an augmented reality app, the cost of transfering video in realtime over the native-to-JavaScript bridge will probably not be performant enough. I think [some games](http://phonegap.com/blog/2013/01/18/my-first-mobile-game-in-html-with-phonegap-build/) will be able to be written with PhoneGap, but games that need to squeeze every drop of performance out of a device should probably stick to a native app.

As always, let me know what you think via [email](sendto:btford@umich.edu) or [Twitter](https://twitter.com/briantford). Have some further advice to give? Send me a [pull request on Github](https://github.com/btford/briantford.com/blob/master/jade/blog/angular-phonegap.md). Thanks for reading!
