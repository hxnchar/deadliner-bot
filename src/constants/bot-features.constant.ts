import { IDescribe } from '../helpers';

class Feature implements IDescribe {
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

const BotFeatures: Feature[] = [
  new Feature(
    'Subscriptions🤩',
    'Now every user can subscribe to the subjects he needs. This means that now everyone will see only his own deadlines (from common list and personal list as well)',
  ),
  new Feature(
    'Improved UI💻',
    'Tick completed tasks and track what else you have to do',
  ),
  new Feature(
    'Deadlines sorting🔽',
    'Sort your deadlines in a different ways',
    'Sort your deadlines by number/closest date/etc',
  ),
  new Feature(
    'Google Calendar📆',
    'Do not miss your deadlines with the Google Calendar synchronization',
    'You\'ll be asked for some additional information',
  ),
];

const featuresToString = (features: Feature[]): string => {
  const stringifiedFeatures: string[] =
    features.map((feature, index) => `\n${index + 1}. ${feature.toString()}`);
  return stringifiedFeatures.join('\n');
};

const featuresList = featuresToString(BotFeatures);

export { featuresList };
