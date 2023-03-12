import { DOMComponent } from '../dom';

export type ComponentType =
  | DOMComponent<keyof HTMLElementTagNameMap>
  | keyof HTMLElementTagNameMap;

export type ComponentGenericType<T> = {
  new (...args: any[]): T;
};

export type ComponentConstructorType =
  | ComponentGenericType<DOMComponent<keyof HTMLElementTagNameMap>>
  | keyof HTMLElementTagNameMap;

export type InlineFunction = (...args: any[]) => void;
