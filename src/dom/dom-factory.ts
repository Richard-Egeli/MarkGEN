import { JSDOM } from 'jsdom';
import { ComponentGenericType } from '../types/dom-component-types';
import DOMComponent from './dom-component';

export class DOMFactory {
  private static dom = new JSDOM();

  public static createDocumentFragment(): DocumentFragment {
    return this.dom.window.document.createDocumentFragment();
  }

  public static createComponent<T extends DOMComponent<any>>(
    type: ComponentGenericType<T>,
    ...args: any[]
  ): T {
    return new type(args);
  }

  public static createElement<T extends keyof HTMLElementTagNameMap>(
    tag: T
  ): HTMLElementTagNameMap[T] {
    return this.dom.window.document.createElement(tag);
  }
}

export default DOMFactory;
