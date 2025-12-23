import { Product } from '../models/product.js'

export const PRODUCT_CATALOG = {
    clone: new Product({
        name: '15-6-17 Clone',
        link: 'https://www.jacksnutrients.com/online-store/15-6-17-Clone-p101272611'
    }),
    partA: new Product({
        name: '5-12-26 Part A',
        link: 'https://www.jacksnutrients.com/online-store/5-12-26-Part-A-p101272607'
    }),
    partB: new Product({
        name: '15-0-0 Part B',
        link: 'https://www.jacksnutrients.com/online-store/Cal-Nit-Part-B-p101272606'
    }),
    bloom: new Product({
        name: '10-30-20 Bloom',
        link: 'https://www.jacksnutrients.com/online-store/10-30-20-Bloom-p101272610'
    }),
    finish: new Product({
        name: '7-15-30 Finish',
        link: 'https://www.jacksnutrients.com/online-store/7-15-30-Finish-p101272613'
    }),
    epsom: new Product({
        name: 'Magnesium Sulfate (Epsom Salt)',
        link: 'https://www.jacksnutrients.com/online-store/Magnesium-Sulfate-Epsom-Salts-p106848502'
    }),
    water: new Product({
        name: 'Plain pH\'d Water',
        link: ''
    })
}