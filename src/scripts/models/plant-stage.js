export class PlantStage {   
  constructor(stage, targetEc, targetPpm500, targetPpm700, formula) {
    this.stage = stage;
    this.targetEc = targetEc;
    this.targetPpm500 = targetPpm500;
    this.targetPpm700 = targetPpm700;
    this.formula = Array.isArray(formula) ? formula : [formula];
  }
}