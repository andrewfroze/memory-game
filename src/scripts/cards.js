const sizes = [50, 100, 150, 200, 300, 400, 473];

const imageModules = import.meta.glob(
  "../assets/cards/*/*.webp",
  {
    eager: true,
    import: "default",
  }
);

const getImage = (size, name) =>
  imageModules[`../assets/cards/${size}/${name}.webp`];

const cards = Array.from({ length: 8 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    images: Object.fromEntries(
      sizes.map((size) => [
        size,
        getImage(size, `card${id}`),
      ])
    ),
  };
});

const back = Object.fromEntries(
  sizes.map((size) => [
    size,
    getImage(size, "back"),
  ])
);

export { cards, back, sizes };