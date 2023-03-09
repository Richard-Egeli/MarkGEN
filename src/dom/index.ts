import { JSDOM } from 'jsdom';

class DOM {
  private static dom = new JSDOM();

  public static createDocumentFragment() {
    return this.dom.window.document.createDocumentFragment();
  }

  public static createElement<T extends keyof HTMLElementTagNameMap>(
    tag: T
  ): HTMLElementTagNameMap[T] {
    return this.dom.window.document.createElement(
      tag
    ) as HTMLElementTagNameMap[T];
  }
}

export default DOM;
