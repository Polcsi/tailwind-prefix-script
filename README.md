# Tailwind prefix script

This is a `powershell` script which iterate over the selected **directory** + **subdirectories** and add prefix to class names. There is also an option to **remove prefix** from class names.

## Table of contents

- [Properties](#properties)
- [Usage](#usage)
- [Examples](#examples)
  - [Add prefix function](#add-prefix-function)
  - [Remove prefix function](#remove-prefix-function)

## Properties

| Property      | Type    | Default value | Description                                         |
| ------------- | ------- | :-----------: | --------------------------------------------------- |
| -folder       | string  |      _._      | Path to the folder which will be iterated           |
| -prefix       | string  |     _tw-_     | Prefix which will be added to class names           |
| -extension    | string  |   _\*.tsx_    | File extension of tailwind css files                |
| -removePrefix | boolean |   _$False_    | If true, script will remove prefix from class names |

> **Note:** If you want to prefix multiple file extensions, you can use comma separated list of extensions. For example: `*.tsx,*.jsx`

## Usage

Open powershell and run script with parameters

```powershell
.\tailwind-prefix.ps1 -prefix "tw-" -extension "*.tsx,*.jsx" -folder "test"
```

## Examples

_Home.jsx_

```jsx
import React from "react";

const Home = () => {
  return (
    <main>
      <h1>ts-Home</h1>
      <section className="h-[46px] w-[46px] rounded-full bg-gray-200 dark:bg-gray-700 focus:invalid:ring-pink-500">
        <p className="h-[2px] bg-[#F3EAEA] after:content-['*'] after:ml-0.5 after:text-red-500">
          Home page content
        </p>
        <button
          type="button"
          className="rounded-full p-2 text-2xl text-main md:text-3xl -inset-1 -skew-y-3"
        >
          Button
        </button>
      </section>
    </main>
  );
};

export default Home;
```

### Add prefix function

Let's run script with parameters:

```powershell
./tailwind-prefix.ps1 -prefix "ts-" -extensions "*.jsx" -folder "test" -removePrefix $False
```

_Home.jsx_ after running script:

```html
<main>
  <h1>ts-Home</h1>
  <section
    className="ts-h-[46px] ts-w-[46px] ts-rounded-full ts-bg-gray-200 dark:ts-bg-gray-700 focus:invalid:ts-ring-pink-500"
  >
    <p
      className="ts-h-[2px] ts-bg-[#F3EAEA] after:ts-content-['*'] after:ts-ml-0.5 after:ts-text-red-500"
    >
      Home page content
    </p>
    <button
      type="button"
      className="ts-rounded-full ts-p-2 ts-text-2xl ts-text-main md:ts-text-3xl -ts-inset-1 -ts-skew-y-3"
    >
      Button
    </button>
  </section>
</main>
```

### Remove prefix function

```powershell
./tailwind-prefix.ps1 -prefix "ts-" -extensions "*.jsx" -folder "test" -removePrefix $True
```

_Home.jsx_ before running script:

```html
<main>
  <h1>ts-Home</h1>
  <section
    className="ts-h-[46px] ts-w-[46px] ts-rounded-full ts-bg-gray-200 dark:ts-bg-gray-700 focus:invalid:ts-ring-pink-500"
  >
    <p
      className="ts-h-[2px] ts-bg-[#F3EAEA] after:ts-content-['*'] after:ts-ml-0.5 after:ts-text-red-500"
    >
      Home page content
    </p>
    <button
      type="button"
      className="ts-rounded-full ts-p-2 ts-text-2xl ts-text-main md:ts-text-3xl -ts-inset-1 -ts-skew-y-3"
    >
      Button
    </button>
  </section>
</main>
```

_Home.jsx_ after running script:

```html
<main>
  <h1>ts-Home</h1>
  <section
    className="h-[46px] w-[46px] rounded-full bg-gray-200 dark:bg-gray-700 focus:invalid:ring-pink-500"
  >
    <p
      className="h-[2px] bg-[#F3EAEA] after:content-['*'] after:ml-0.5 after:text-red-500"
    >
      Home page content
    </p>
    <button
      type="button"
      className="rounded-full p-2 text-2xl text-main md:text-3xl -inset-1 -skew-y-3"
    >
      Button
    </button>
  </section>
</main>
```
