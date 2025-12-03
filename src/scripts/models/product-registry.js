import { Product } from "./product.js";

export const PRODUCT_CATALOG = {
  Clone: new Product({
    key: "Clone",
    name: "15-6-17 Clone",
    ppm: '125 ppm N',
    link: "https://www.jacksnutrients.com/online-store/15-6-17-Clone-p101272611",
    baseValue: 3.15
  }),
  PartA: new Product({
    key: "PartA",
    name: "5-12-26 Part A",
    ppm: '50 ppm N',
    link: "https://www.jacksnutrients.com/online-store/5-12-26-Part-A-p101272607",
    baseValue: 3.79
  }),
  PartB: new Product({
    key: "PartB",
    name: "15-0-0 Part B",
    ppm: '100 ppm N',
    link: "https://www.jacksnutrients.com/online-store/Cal-Nit-Part-B-p101272606",
    baseValue: 2.52
  }),
  Bloom: new Product({
    key: "Bloom",
    name: "10-30-20 Bloom",
    ppm: '150 ppm N',
    link: "https://www.jacksnutrients.com/online-store/10-30-20-Bloom-p101272610",
    baseValue: 5.68
  }),
  Finish: new Product({
    key: "Finish",
    name: "7-15-30 Finish",
    ppm: '100 ppm N',
    link: "https://www.jacksnutrients.com/online-store/7-15-30-Finish-p101272613",
    baseValue: 5.41
  }),
  Epsom: new Product({
    key: "Epsom",
    name: "Magnesium Sulfate (Epsom Salt)",
    ppm: '23 ppm Mg',
    link: "https://www.jacksnutrients.com/online-store/Magnesium-Sulfate-Epsom-Salts-p106848502",
    baseValue: 0.99
  }),
  PlainWater: new Product({
    key: "PlainWater",
    name: "Plain pH'd Water",
    ppm: 0,
    link: null,
    baseValue: 0
  })
};