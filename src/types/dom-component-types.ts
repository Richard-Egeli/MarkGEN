import { DOMComponent } from '../dom';

export type ComponentType =
  | DOMComponent<keyof HTMLElementTagNameMap>
  | keyof HTMLElementTagNameMap;

export type ComponentConstructorType =
  | {
      new (...args: any[]): any;
    }
  | keyof HTMLElementTagNameMap;
