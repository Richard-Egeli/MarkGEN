import { CSS } from './css';
import DOM from '../dom';
import { generateInlineFunction } from '../utils/generator';

/**
 * A DOM element helper class that allows for easy creation of DOM elements
 * @template T The type of the element
 */
class DOMElement<T extends keyof HTMLElementTagNameMap> {
  public parent: DOMElement<any> | null = null;
  public readonly element: HTMLElementTagNameMap[T];
  public readonly children: DOMElement<any>[] = [];
  private readonly scripts: string[] = [];

  static create<T extends keyof HTMLElementTagNameMap>(tagName: T) {
    return new DOMElement<T>(tagName);
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

  /**
   * Set inline styles on the element
   * @param styles The CSS styles to apply to the element
   */
  public setStyle(styles: CSS): void {
    Object.assign(this.element.style, styles);
  }

  public addScript(
    func: (...args: any) => void,
    params: Record<string, any> | null = null
  ): void {
    const code = generateInlineFunction(func, params);
    this.scripts.push(code);
  }

  public compile(): HTMLElementTagNameMap[T] {
    this.parent && this.parent.element.appendChild(this.element);
    this.scripts.forEach(DOM.addGlobalScript);
    this.children.forEach((c) => c.compile());

    return this.element;
  }

  public appendChild(child: DOMElement<any>): void {
    child.parent = this;
    this.children.push(child);
  }
}

export default DOMElement;
