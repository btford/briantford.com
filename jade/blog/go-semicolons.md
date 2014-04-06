# Semicolons

<span class="date">[2012.09.25]</span>

I thought I'd expound a bit on one of my recent tweets that garnered more attention than usual:

> [Are you kidding me? Go has optional semicolons? Have we learned nothing from JavaScript? #golang](https://twitter.com/briantford/status/250639621812260864)

Despite many reassuring me that "Go does it right,™" I think that the issues with optional semicolons are still present. Admittedly, because Go is complied it evades some of the issues that JavaScript has, but the fact that you have some optional syntax by nature will be problematic.

## Pointless Style Differentiation

Most are familiar with the [Tabs Versus Spaces Debacle](http://www.jwz.org/doc/tabs-vs-spaces.html), but perhaps only the JavaScript community knows the horrors of [The Great Semicolon Debate](http://dailyjs.com/2012/04/19/semicolons/). I do not believe anything of value has come from the two different styles, and yet many man hours are wasted in this debate. Newcomers to the language must now make a mostly meaningless decision on which way they want to do things.

"But Brian," you say, "it's not that big of a deal." And you are right. But many man hours will still be wasted over something that is not a big deal.

## Two Rules Are Worse Than One

Here's the relevant part of the [Go Language Spec](http://golang.org/ref/spec#Semicolons):

> The formal grammar uses semicolons ";" as terminators in a number of productions. Go programs may omit most of these semicolons using the following two rules:
>
> 1.  When the input is broken into tokens, a semicolon is automatically inserted into the token stream at the end of a non-blank line if the line's final token is
>     * an identifier
>     * an integer, floating-point, imaginary, rune, or string literal
>     * one of the keywords break, continue, fallthrough, or return
>     * one of the operators and delimiters ++, --, ), ], or }
> 2. To allow complex statements to occupy a single line, a semicolon may be omitted before a closing ")" or "}".

Rather than remembering these "two" rules, you can remember this one rule: put a semicolon at the end of your statement. I don't think saving a keystroke here and there is worth having to think so hard about something so simple.

## Conclusion

I am still very much interested in Go. Consider this bit about semicolons a strong opinion, weakly held; I'd love to hear some counter arguments, so feel free to [tweet me](https://twitter.com/briantford).
