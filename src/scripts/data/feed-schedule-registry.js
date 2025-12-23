import { PRODUCT_CATALOG } from "./product-registry.js";
import { RecipeEntry } from "../models/recipe-entry.js";
import { FeedSchedule } from "../models/feed-schedule.js";
import { Medium } from "../models/medium.js";
import { PlantStage } from "../models/plant-stage.js";

export const FEED_SCHEDULES = {
    '321': new FeedSchedule({
        name: '3-2-1',
        mediums:[
            new Medium({
                key: '7a8a0239-457a-4176-b356-c9569f847679',
                name: 'Soil',
                description: 'Plants in Soil',
                feedGuidLink: 'https://www.jacksnutrients.com/_files/ugd/3230c0_15ef9a140f114133bb1be94c8e6ad079.pdf',
                stages: [
                    new PlantStage({
                        key: 'ed105a54-359c-4595-9448-6672dc640393',
                        name: 'Propagation',
                        description: '(Seedlings, Clones, Young Plants)',
                        targetEc: 1.1,
                        targetPpm500: 550,
                        targetPpm700: 770,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.clone,
                                baseGrams: 3.15,
                                basePPM: 125,
                                baseMN: 'N'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '396d6943-f16f-4c5f-9f60-9c1cad7b7e86',
                        name: 'Vegetative',
                        description: '',
                        targetEc: 2.4,
                        targetPpm500: 1200,
                        targetPpm700: 1680,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partA,
                                baseGrams: 3.79,
                                basePPM: 50,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partB,
                                baseGrams: 2.52,
                                basePPM: 100,
                                baseMN: 'N',
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '92de56d5-5f8c-42e3-8998-cceb8dcf112d',
                        name: 'Bud Set',
                        description: 'Start of 12 hour photoperiod (Use 10-30-20 for 1 week)',
                        targetEc: 1.9,
                        targetPpm500: 950,
                        targetPpm700: 1330,
                        recipe: [
                            new RecipeEntry({
                                key: 'bd863d52-7ae7-4f42-ab6c-5ad0d1eaf841',
                                product: PRODUCT_CATALOG.bloom,
                                baseGrams: 5.68,
                                basePPM: 150,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                key: 'f3ad623e-fcf2-400e-9cd6-1e1cd4699db4',
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: 'f9887a77-0852-4962-8a25-b876252aa265',
                        name: 'Flower',
                        description: '',
                        targetEc: 2.4,
                        targetPpm500: 1200,
                        targetPpm700: 1680,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partA,
                                baseGrams: 3.79,
                                basePPM: 50,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partB,
                                baseGrams: 2.52,
                                basePPM: 100,
                                baseMN: 'N',
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '9d5d03dd-e5cc-4107-be09-fbaa919ff4f9',
                        name: 'Late Flower',
                        description: '(Use 7-15-30 for 1 week )',
                        targetEc: 1.9,
                        targetPpm500: 950,
                        targetPpm700: 1330,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.finish,
                                baseGrams: 5.41,
                                basePPM: 100,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '609c5b0b-d164-47a5-a365-d373f8ff88de',
                        name: '4-7 Day Flush',
                        description: '(clean water)',
                        targetEc: 0,
                        targetPpm500: 0,
                        targetPpm700: 0,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.water
                            })
                        ]
                    })
                ]
            }),
            new Medium({
                key: '04d9b0dc-9d25-4776-8b7d-f1962b5ff385',
                name: 'Hydro/Coco',
                description: 'Plants in a Hydroponic System or Coco',
                feedGuidLink: 'https://www.jacksnutrients.com/_files/ugd/3230c0_15ef9a140f114133bb1be94c8e6ad079.pdf',
                stages: [
                    new PlantStage({
                        key: '1c76e5ef-3839-4856-830b-c3367dd12b5d',
                        name: 'Propagation',
                        description: '(Seedlings, Clones, Young Plants)',
                        targetEc: 1.1,
                        targetPpm500: 550,
                        targetPpm700: 770,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.clone,
                                baseGrams: 3.15,
                                basePPM: 125,
                                baseMN: 'N'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '872b7059-0eea-4ebf-8e65-7a63b1648798',
                        name: 'Vegetative',
                        description: '',
                        targetEc: 2.4,
                        targetPpm500: 1200,
                        targetPpm700: 1680,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partA,
                                baseGrams: 3.79,
                                basePPM: 50,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partB,
                                baseGrams: 2.52,
                                basePPM: 100,
                                baseMN: 'N',
                            })
                        ]
                    }),
                    new PlantStage({
                        key: 'a5a13f26-7cae-4bbf-ac75-929f1302803a',
                        name: 'Bud Set',
                        description: 'Start of 12 hour photoperiod (Use 10-30-20 for 1 week)',
                        targetEc: 1.9,
                        targetPpm500: 950,
                        targetPpm700: 1330,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.bloom,
                                baseGrams: 5.68,
                                basePPM: 150,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '04b5ea31-1473-4505-9941-730c33b23f18',
                        name: 'Flower',
                        description: '',
                        targetEc: 2.4,
                        targetPpm500: 1200,
                        targetPpm700: 1680,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partA,
                                baseGrams: 3.79,
                                basePPM: 50,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partB,
                                baseGrams: 2.52,
                                basePPM: 100,
                                baseMN: 'N',
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '92b7dd42-27a8-457c-b116-f3687a3d7a38',
                        name: 'Late Flower',
                        description: '(Use 7-15-30 for 1 week )',
                        targetEc: 1.9,
                        targetPpm500: 950,
                        targetPpm700: 1330,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.finish,
                                baseGrams: 5.41,
                                basePPM: 100,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.epsom,
                                baseGrams: .99,
                                basePPM: 23,
                                baseMN: 'Mg'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '4eb72084-f63d-4f1b-acc7-1a67504835a7',
                        name: '4-7 Day Flush',
                        description: '(clean water)',
                        targetEc: 0,
                        targetPpm500: 0,
                        targetPpm700: 0,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.water
                            })
                        ]
                    })
                ]
            }),
            new Medium({
                key: 'c9505e32-86ac-4076-82c8-da20f751d7fd',
                name: 'AutoPots/Wicking',
                description: 'Wicking or Bottom Feeding aka. AutoPots',
                feedGuidLink: 'https://www.jacksnutrients.com/_files/ugd/3230c0_471c23c1840d4c4c9d3f15626f865bcf.pdf',
                stages: [
                    new PlantStage({
                        key: '889133bd-72b8-455a-a04d-929ad3afc06f',
                        name: 'Clone',
                        targetEc: 1.1,
                        targetPpm500: 550,
                        targetPpm700: 770,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.clone,
                                baseGrams: 3.15,
                                basePPM: 125,
                                baseMN: 'N'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: 'debea234-2fe7-4ea6-9ff8-a50c7469ed74',
                        name: 'Vegetative',
                        targetEc: 1.4,
                        targetPpm500: 700,
                        targetPpm700: 980,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partA,
                                baseGrams: 2.65,
                                basePPM: 35,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partB,
                                baseGrams: 1.77,
                                basePPM: 70,
                                baseMN: 'N'
                            })
                        ]
                    }),
                    new PlantStage({
                        key: '2a41ab71-59e7-4264-9db8-07a33e4a2e3e',
                        name: 'Flower',
                        targetEc: 2.2,
                        targetPpm500: 1100,
                        targetPpm700: 1540,
                        recipe: [
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partA,
                                baseGrams: 4.16,
                                basePPM: 55,
                                baseMN: 'N'
                            }),
                            new RecipeEntry({
                                product: PRODUCT_CATALOG.partB,
                                baseGrams: 2.5,
                                basePPM: 100,
                                baseMN: 'N'
                            })
                        ]
                    })
                ]
            })
        ]
    })
}