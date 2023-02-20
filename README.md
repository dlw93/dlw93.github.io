# dlw93.github.io

This is the source code for my [personal website](https://dlw93.github.io/).
Its layout and design are both kept simple intentionally, allowing for it to still look decent when exported as a [PDF file](https://github.com/dlw93/dlw93.github.io/releases/latest/download/CV_en.pdf) without much ado.

Since the project is written exclusively using standard-compliant HTML, CSS, and JavaScript and relies on nothing but standard APIs supported by all [cutting-edge browsers](https://browsersl.ist/#q=last+1+years+and+not+dead+and+%3E%3D+1%25) (most notably [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), [JavaScript Module Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)), no transpilation or down-levelling is required at all for it to run. As a welcome side-effect, this prevents companies relying on legacy software from reading my CV and reaching out to me in the first place.

## Bundling

In order to reduce the number of requests during page load, the project can be bundled with [Parcel](https://parceljs.org/):

```console
npx parcel build --no-source-maps ./index.html
```
