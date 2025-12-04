
# Jack's 3-2-1 Feed Calculator

**Feeding Schedule Tool for Jack's 3-2-1 Nutrients**

This is an open-source, interactive calculator designed to simplify the nutrient mixing process for cultivators using the popular Jack's 3-2-1 feeding regimen. It provides precise nutrient measurements based on your reservoir size and desired strength, helping to ensure accurate feeding every time.

**Disclaimer:** This site is an independent project and is not affiliated with, endorsed by, or sponsored by Jack's Nutrients or any of its affiliates.

## Features

* **Metric & Imperial Support:** Easily toggle between **Liters** and **Gallons** for your reservoir size.

* **Adjustable Strength:** Fine-tune your nutrient concentration with a slider to adjust the feed strength from **50% to 200%** of the recommended schedule.

* **Precise Calculations:** Outputs exact measurements for Part A, Part B (CalNit), and Epsom Salt in both **Grams** and **Dry Ounces**.

* **Target Readings:** Automatically calculates and displays the expected **Target EC** and **Target PPM** (500 and 700 scales) for your mix.

* **Mobile Friendly:** A clean, responsive interface for easy use on any device.

## Live Demo

You can view the calculator in action here:
<https://sneekee.github.io/jacks-feed/>

## Getting Started

This project is built using vanilla JavaScript, SCSS, and HTML, with Webpack for bundling.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your system.

### Installation and Local Development

1. **Clone the repository:**

```

git clone [https://github.com/sneekee/jacks-feed.git](https://www.google.com/search?q=https://github.com/sneekee/jacks-feed.git)
cd jacks-feed

```

2. **Install dependencies:**

```

npm install

# or using yarn

# yarn install

```

3. **Run the development server:**
To start a local server with live-reloading:

```

npm run start

```

The application should now be available at `http://localhost:8080` (or the port specified by Webpack).

### Building for Production

To create the optimized, minified files for deployment (e.g., to GitHub Pages):

```

npm run build

```

This command will compile and bundle the assets into a `dist/` directory.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## License

Distributed under the **Unlicense**. See the [`LICENSE`](https://www.google.com/search?q=./LICENSE) file for more information.
