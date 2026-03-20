
# Jack's 3-2-1 Feed Calculator

**Feeding Schedule Tool for Jack's 3-2-1 Nutrients**

This is an open-source, interactive calculator designed to simplify the nutrient mixing process for cultivators using the popular Jack's 3-2-1 feeding regimen. It provides precise nutrient measurements based on your reservoir size and desired strength, helping to ensure accurate feeding every time.

**Disclaimer:** This site is an independent project and is not affiliated with, endorsed by, or sponsored by Jack's Nutrients or any of its affiliates.

## Features

* **Multiple Growing Mediums:** Supports **Soil**, **Hydro/Coco**, and **AutoPots/Wicking** grow styles, each with their own stage-specific recipes sourced from the official Jack's feed guides.

* **Plant Stage Selection:** Choose the correct stage for your crop — Propagation, Vegetative, Bud Set, Flower, Late Flower, or Flush — and get the right recipe for that stage automatically.

* **Metric & Imperial Support:** Toggle between **Liters** and **Gallons**. Each unit has its own set of reservoir scale tiers suited to realistic batch sizes for that unit.

* **Unit-Aware Reservoir Scales:** Select a scale range that matches your batch size. Gallons offer 1–20 / 20–40 / 40–60 / 60–80 gal ranges at 1 gal precision. Liters offer 1–20 / 20–100 / 100–200 / 200–300 L ranges with step sizes scaled to match — keeping the slider usable at every range.

* **Adjustable Strength:** Fine-tune your nutrient concentration from **50% to 200%** of the recommended schedule using a slider.

* **Strength-Scaled Outputs:** All calculated values — grams, dry ounces, per-product PPM, Target EC, and Target PPM (500 and 700 scales) — update live with your strength setting. Target card labels show the active strength percentage when it deviates from 100%.

* **Precise Measurements:** Outputs exact amounts for every product in a stage recipe in both **Grams** and **Dry Ounces**.

* **Persistent State:** All selections (medium, stage, reservoir size, scale, units, strength) are saved to browser `localStorage` and restored on the next visit.

* **Mobile Friendly:** A clean, responsive interface for easy use on any device.

## Live Demo

You can view the calculator in action here:
<https://sneekee.github.io/jacks-feed/>

## Getting Started

This project is built using vanilla JavaScript, SCSS, and HTML, with Webpack for bundling.

### Prerequisites

You need to have Node.js and npm installed on your system.

### Installation and Local Development

1. **Clone the repository:**

```
git clone https://github.com/sneekee/jacks-feed.git
cd jacks-feed
```

2. **Install dependencies:**

```
npm install
```

3. **Run the development server:**

```
npm run start
```

The application should now be available at `http://localhost:8080`.

### Building for Production

```
npm run build
```

Compiles and bundles assets into the `dist/` directory. The production build extracts CSS into a separate file (loaded via `<link>` before the body renders) to eliminate the white flash on load, and uses content hashes on all output files for cache busting.

### Deploying to GitHub Pages

```
npm run deploy
```

Builds the project and pushes the `dist/` directory to the `gh-pages` branch.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the **Unlicense**. See the [`LICENSE`](./LICENSE) file for more information.
