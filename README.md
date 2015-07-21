
> *beta release: not stable, not fashion... just work*

This is a JSON generator for countries standards like ISO3166, flags, phone prefix and currency.

The output it's like:

```json
[
    ...
    {
        "name": "Tuvalu",
        "prefix": "688",
        "currency": "Australian Dollar",
        "alpha2": "TV",
        "alpha3": "TUV",
        "images": {
            "svg_square": "./build/flags/svg/1x1/tv.svg",
            "svg": "./build/flags/svg/4x3/tv.svg",
            "png_square": "./build/flags/png/1x1/tv.png",
            "png": "./build/flags/png/4x3/tv.png"
        }
    },
    ...
]
```

It fetch data from:

- [http://data.okfn.org](http://data.okfn.org) for country codes
- [flag-icon-css](https://github.com/lipis/flag-icon-css) for flags SVG

### Generate JSON

```Shell
npm install
npm start
```

and then, in the `./build` directory you'll have:
- `country.json` data cleaned with flags in relative paths.
- `full.json` raw data.
- `flags/` directory with SVG and PNG in 1x1 / 4x3 sizes.


### TODO

It need some kind of refactoring :)
