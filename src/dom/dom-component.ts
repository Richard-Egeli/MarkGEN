import { CSS } from '../types';
import { generateInlineFunction } from '../utils/generator';
import fs from 'fs';
import Page from '../containers/page';
import { DOMFactory } from '.';
import {
  ComponentConstructorType,
  ComponentType,
  InlineFunction,
} from '../types/dom-component-types';

/**
 * A DOM component helper class that allows for easy creation of HTML elements
 * @template T The type of the element
 */
export class DOMComponent<T extends keyof HTMLElementTagNameMap> {
  private currentPage: Page | null = null;
  public parent: DOMComponent<any> | null = null;
  public readonly element: HTMLElementTagNameMap[T];
  private childrenAppend: DOMComponent<any>[] = [];
  private childrenPrepend: DOMComponent<any>[] = [];
  private inlineStyles: string[] = [];
  private globalStyles: CSS = {};
  private externalGlobalStyles: string[] = [];
  private scripts: string[] = [];

  makeID(): string {
    return '-' + Math.random().toString(36).substring(2, 9);
  }

  static create<T extends keyof HTMLElementTagNameMap>(tagName: T) {
    return new DOMComponent<T>(tagName);
  }

  constructor(tagName: T) {
    this.element = DOMFactory.createElement(tagName);
  }

  get id(): string {
    return this.element.id;
  }

  set id(id: string) {
    this.element.id = id;
  }

  get page(): Page | null {
    return this.currentPage;
  }

  set page(page: Page | null) {
    this.currentPage = page;
    [...this.childrenAppend, ...this.childrenPrepend].forEach((child) => {
      child.page = page;
    });
  }

  get textContent(): string | null {
    return this.element.textContent;
  }

  set textContent(text: string | null) {
    this.element.textContent = text;
  }

  get className(): string {
    return this.element.className;
  }

  set className(className: string) {
    this.element.className = className;
  }

  /**
   * Set inline styles on the element
   * @param styles The CSS styles to apply to the element
   */
  public setInlineStyle(styles: CSS): void {
    Object.assign(this.element.style, styles);
  }

  public addGlobalStyles(styles: CSS): void {
    Object.assign(this.globalStyles, styles);
  }

  public addInlineScript(func: InlineFunction, ...args: any): void {
    this.scripts.push(generateInlineFunction(func, ...args));
  }

  public addExternalScript(path: string): void {
    const script = fs.readFileSync(path, 'utf8');
    this.scripts.push(script);
  }

  public addExternalCSS(path: string): void {
    const css = fs.readFileSync(path, 'utf8');
    if (css) {
      this.externalGlobalStyles.push(css);
    }
  }

  public render(): HTMLElementTagNameMap[T] {
    this.parent && this.parent.element.appendChild(this.element);

    if (this.page) {
      this.scripts.forEach((s) => this.page.addGlobalScript(s));
      this.page.addGlobalStyles(this.globalStyles);
      this.externalGlobalStyles.forEach(this.page.addExternalGlobalCSS);
    }

    this.childrenPrepend.forEach((c) => c.render());
    this.childrenAppend.forEach((c) => c.render());
    return this.element;
  }

  public prependChild(child: DOMComponent<any>): void {
    child.parent = this;
    child.page = this.page;
    this.childrenPrepend.push(child);
  }

  public appendChild(child: DOMComponent<any>): void {
    child.parent = this;
    child.page = this.page;
    this.childrenAppend.push(child);
  }

  /**
   *
   * @param type Type of component that extends DOMComponent,
   * this function creates a new component, appends it to the parent and returns it
   * @param args Optional arguments to pass to the component
   * @returns The newly created component
   */
  public addComponent<T extends ComponentType>(
    type: ComponentConstructorType,
    ...args: any[]
  ): T {
    const component =
      typeof type === 'string'
        ? new DOMComponent(type as any)
        : new type(...args);

    this.appendChild(component as any);
    return component as any;
  }
}

export default DOMComponent;
