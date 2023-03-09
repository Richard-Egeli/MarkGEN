import { CSS } from '.';
import DOM from '../dom';
import { generateInlineFunction } from '../utils/generator';
import fs from 'fs';
import Page from '../containers/page';

/**
 * A DOM component helper class that allows for easy creation of HTML elements
 * @template T The type of the element
 */
class DOMComponent<T extends keyof HTMLElementTagNameMap> {
  public page: Page | null = null;
  public parent: DOMComponent<any> | null = null;
  public readonly element: HTMLElementTagNameMap[T];
  public children: DOMComponent<any>[] = [];
  private inlineStyles: string[] = [];
  private globalStyles: CSS = {};

  private scripts: string[] = [];

  makeID(): string {
    return '-' + Math.random().toString(36).substring(2, 9);
  }

  static create<T extends keyof HTMLElementTagNameMap>(tagName: T) {
    return new DOMComponent<T>(tagName);
  }

  constructor(tagName: T) {
    this.element = DOM.document.createElement(tagName);
  }

  get id(): string {
    return this.element.id;
  }

  set id(id: string) {
    this.element.id = id;
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

  public addInlineScript(
    func: (...args: any) => void,
    params: Record<string, any> | null = null
  ): void {
    const code = generateInlineFunction(func, params);

    this.scripts.push(code);
  }

  public addExternalScript(path: string): void {
    const script = fs.readFileSync(path, 'utf8');

    if (script) {
      this.scripts.push(script);
    }
  }

  public addExternalCSS(path: string): void {
    const css = fs.readFileSync(path, 'utf8');

    if (css) {
      DOM.addGlobalStyle(css);
    }
  }

  public compile(): HTMLElementTagNameMap[T] {
    this.parent && this.parent.element.appendChild(this.element);
    this.scripts.forEach(this.page.addGlobalScript);
    this.page.addGlobalStyles(this.globalStyles);
    this.children.forEach((c) => c.compile());
    return this.element;
  }

  public appendChild(child: DOMComponent<any>): void {
    child.parent = this;
    this.children.push(child);
  }
}

export default DOMComponent;
