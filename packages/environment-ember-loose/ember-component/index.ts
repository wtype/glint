import type {
  Context,
  Invoke,
  TemplateContext,
  AcceptsBlocks,
  EmptyObject,
} from '@glint/template/-private/integration';

import type { AsObjectType } from '../-private/utilities';
import type { ComponentSignature } from '../-private';

export type { ComponentSignature };

declare const Ember: { Component: EmberComponentConstructor };
declare const GivenSignature: unique symbol;

const EmberComponent = Ember.Component;
type EmberComponent = import('@ember/component').default;
type EmberComponentConstructor = typeof import('@ember/component').default;

type Get<T, Key, Otherwise = EmptyObject> = Key extends keyof T
  ? Exclude<T[Key], undefined>
  : Otherwise;

export type ArgsFor<T extends ComponentSignature> = 'Args' extends keyof T ? T['Args'] : {};

const Component = EmberComponent as AsObjectType<typeof EmberComponent> &
  (new <T extends ComponentSignature = {}>(
    ...args: ConstructorParameters<EmberComponentConstructor>
  ) => Component<T>);

interface Component<T extends ComponentSignature = {}> extends EmberComponent {
  // Allows `extends Component<infer Signature>` clauses to work as expected
  [GivenSignature]: T;

  [Context]: TemplateContext<this, Get<T, 'Args'>, Get<T, 'Yields'>, Get<T, 'Element', null>>;
  [Invoke]: (
    args: Get<T, 'Args'>,
    ...positional: Get<T, 'PositionalArgs', []>
  ) => AcceptsBlocks<Get<T, 'Yields'>, Get<T, 'Element', null>>;
}

export default Component;
