---
title: "Lorem Ipsum le titre"
date: "2022-02-22"
path: "/lorem-ipsum"
coverImage: "/assets/blog/cover-images/S02E01_banner.jpg"
author: 
  name: "Fabien Schlegel"
  avatar: "/assets/blog/authors/fabien_schlegel.png"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
tags: ["Lorem", "ipsum"]
---

## Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut dolor ac ligula convallis tincidunt. Donec in ex mi. Suspendisse scelerisque aliquam nunc, at maximus ante viverra id. Cras lectus lorem, fermentum ac ultricies quis, faucibus vel neque. Fusce dignissim semper odio at ullamcorper. Quisque orci metus, maximus eu bibendum vel, vulputate eget orci. Nulla gravida, sem eget cursus lobortis, magna velit sagittis diam, ut efficitur eros libero at urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce egestas lacus posuere diam dapibus, eget accumsan ipsum pharetra. Nulla tincidunt neque elementum aliquam luctus. Pellentesque blandit ligula nec lacus aliquet, et ullamcorper risus feugiat. Nullam vel odio placerat, sagittis `JSON.stringify()` velit id, dictum ex. Maecenas pharetra est nec nisl condimentum, quis efficitur justo elementum.

Cras imperdiet commodo pharetra. Duis interdum, leo nec condimentum gravida, elit ligula hendrerit purus, in convallis turpis sem venenatis eros. Pellentesque ut tellus consequat turpis feugiat tristique. Cras quis commodo massa. Integer lacinia et purus at feugiat. Aliquam sed sem a diam bibendum placerat. Praesent cursus ligula magna, sed laoreet dui ultrices sed.

## Mauris sit

Mauris sit amet dolor tincidunt, vehicula neque et, porttitor ligula. Etiam vulputate ornare iaculis. Donec ullamcorper vehicula leo, non pretium felis bibendum vehicula. Vivamus consequat ultrices elit et hendrerit. Pellentesque quis accumsan sapien. Nunc dignissim, quam in consequat dignissim, lorem tellus ornare enim, quis feugiat ex ex sit amet mauris. Quisque accumsan euismod nibh vitae facilisis. Pellentesque urna mi, interdum eget nulla vitae, rhoncus rutrum ex. Suspendisse facilisis, orci et pharetra tempor, justo turpis vestibulum lectus, vitae tincidunt lacus turpis id ante. Fusce eleifend dolor at magna convallis, bibendum efficitur metus porttitor. In laoreet feugiat ultrices. Aliquam erat volutpat. Cras consectetur magna eget nunc feugiat convallis. Nulla iaculis elit lacus, nec dapibus orci euismod eget. Curabitur convallis aliquam vehicula.

Cras nunc nisl, consequat non malesuada vitae, tempor in sapien. Sed varius elit sed viverra finibus. Mauris volutpat et lacus non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam condimentum et erat vel pulvinar. Maecenas lacinia risus quis sem malesuada, in hendrerit metus lobortis. Integer eleifend eros ut dictum ornare. Mauris feugiat tortor quam. Sed et porta arcu. Donec id nunc dignissim, gravida tortor pretium, luctus enim. Quisque laoreet quis elit id pretium. Aliquam erat volutpat.

```tsx
const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, size, color, isLoading, className, ...others }) => (
  <button
    className={clsx(
      "button",
      size,
      color,
      isLoading ? "is-loading" : undefined,
      className
    )}
    {...others}
  >
    {children}
  </button>
);
```

Morbi auctor elit ac egestas tincidunt. Aenean lacinia posuere magna, sit amet mollis ipsum imperdiet vitae. Phasellus ac tincidunt nibh. Nulla nec luctus nisl. Pellentesque tellus turpis, fringilla sit amet tincidunt eu, varius vehicula leo. Nulla facilisi. Phasellus eget erat eu tellus imperdiet ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent egestas ipsum in augue finibus aliquet. Mauris laoreet eget dolor non pulvinar. Pellentesque vitae lacinia nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et erat vel neque pulvinar tincidunt. Praesent vestibulum fermentum iaculis. Nulla porttitor risus enim, et pharetra mauris tincidunt id. Suspendisse tincidunt arcu eget lobortis mattis.

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```
