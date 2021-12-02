---
description: Learn how to contribute to Minehut.xyz
name: contribute
---

import Hint from "../src/Hint"

# Contribute

## About markdown

Markdown is a simple markup language that is used for formatting text with simple syntax. We use this language because of its simplicity and popularity.

The library the site uses, [MDX](https://mdxjs.com), also lets you add **React components** to the code, giving us lots of new opportunities. This lets us bring in a component called `Hint` that looks like the green box at the bottom of the page. To use it, you first need to import it using:

```jsx
import Hint from "../src/Hint";
```

Note, however, that the path depends on the location of the file.

After that, you can type in the following anywhere in your markdown:

```md
<Hint severity="success | info | warning | error">TEXT HERE</Hint>
```

The `style` attribute will give you different colors and icons:

<Hint severity="success">
  
  This is a `success` hint.</Hint>

<Hint severity="info">
  
  This is an `info` hint.
  
</Hint>

<Hint severity="warning">
  
  This is a `warning` hint.

</Hint>

<Hint severity="error">
  
  This is an `error` hint.

</Hint>

```md
<Hint severity="success">
  
  This is a `success` hint.</Hint>

<Hint severity="info">
  
  This is an `info` hint.
  
</Hint>

<Hint severity="warning">
  
  This is a `warning` hint.

</Hint>

<Hint severity="error">
  
  This is an `error` hint.

</Hint>
```

## How to contribute

You can contribute to minehut.xyz by making a [pull request at our GitHub](https://github.com/TeamMH/minehut.xyz). You will need a GitHub account for this.

## How to make a pull request

To make a pull request, you need to make a fork of the **minehut.xyz** repository.

To fork the repository, click the `Fork` button at the top right of the page.

A category is just a folder with the name of the category, navigate to the category you want to add a page to. From here, click `Add file`, and then `Create new file`. Create a file with a short name, and put `.md` after the name, \(ex. `functions.md`, `download-world.md`, etc.\), and then open the file.

From here, you can edit the file. [_**Here's**_](https://raw.githubusercontent.com/TeamMH/minehut.xyz/main/TEMPLATE.md) _**our template you must follow.**_

This is an example page, and this is the source:

```md
---
description: Description
<!-- THE PATH TO THE FILE FROM THE `PAGES` DIRECTORY WITHOUT THE FILENAME AND FIRST SLASH -->
name: category/subcategory/filename
madeBy: NAME **OR** [NAME1, NAME2] FOR MULTIPLE PEOPLE
madeByLink: LINK **OR** [LINK1, LINK2] FOR MULTIPLE PEOPLE (OPTIONAL)
---

<!-- THE PATH TO THE `HINT` ELEMENT, LOCATED IN THE SRC DIRECTORY -->

import Hint from "../src/Hint";

# Title

## Section 1

Text

## Section 2

Text
```

<Hint severity="warning">Only use 1 <inlineCode>h1</inlineCode> (titles with one <inlineCode>#</inlineCode>) per file.</Hint>

<Hint severity="warning">Don't make titles bold or italic, as it'll break some of the site's mechanics.</Hint>

To add a **description** to your page, add:

```md
---
description: Description for your page!
---
```

To add a **title** to your page, add:

```md
# title for your page
```

To add separate sections for your page, add:

```md
## Section

Put text here
```

You can, of course, put normal markdown in your page as well. Once you're done making the page, click `Commit new file`.

Now you can make a pull request! Go to your repository, then click the button labeled `Pull request`. It should be right next to a `Compare` button. Then, click `Create pull request`. Tada! You have now made a pull request to our repository, and your page will appear on the site if we accept it.

Note that you need to delete your fork and refork it to update it. There is no way to auto update it \(unless you're editing loccally, which you can learn how to [here](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).
