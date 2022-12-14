import { BotService } from 'services';
import { LangData } from 'consts/langdata.constant';

class Feature {
  name: string = '';
  description: string = '';
  hint: string | undefined;

  constructor(name: string, description: string, hint?: string) {
    this.name = name;
    this.description = description;
    this.hint = hint;
  }
}

Feature.prototype.toString = function featureToString() {
  const hint = this.hint ? `\n_(${this.hint})_` : '';
  return `*${this.name}*\n${this.description}.${hint}`;
};

const BotFeatures = (): Feature[] => {
  const LANG = BotService.language;
  return [
    new Feature(
      LangData[LANG]['subscriptions-feature'],
      LangData[LANG]['subscriptions-feature-data'],
      LangData[LANG]['subscriptions-feature-hint'],
    ),
    new Feature(
      LangData[LANG]['ui-feature'],
      LangData[LANG]['ui-feature-data'],
    ),
    new Feature(
      LangData[LANG]['notifications-feature'],
      LangData[LANG]['notifications-feature-data'],
    ),
    new Feature(
      LangData[LANG]['view-deadlines-feature'],
      LangData[LANG]['view-deadlines-feature-data'],
    ),
    new Feature(
      LangData[LANG]['google-calendar-feature'],
      LangData[LANG]['google-calendar-feature-data'],
      LangData[LANG]['google-calendar-feature-hint'],
    ),
  ];
};

const featuresToString = (): string => {
  const features = BotFeatures();
  const stringifiedFeatures: string[] = features.map(
    (feature, index) => `\n${index + 1}. ${feature.toString()}`,
  );
  return stringifiedFeatures.join('\n');
};

export { featuresToString };
