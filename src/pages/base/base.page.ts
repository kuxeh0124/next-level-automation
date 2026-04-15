import { Locator, Page } from '@playwright/test';
import { SelectorDefinition, SelectorStrategy } from '@selectors/selector.types';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  protected resolve(definition: SelectorDefinition): Locator {
    return this.resolveStrategy(definition.preferred);
  }

  protected resolveStrategy(strategy: SelectorStrategy): Locator {
    switch (strategy.type) {
      case 'role':
        return this.page.getByRole(strategy.role as any, { name: strategy.name });
      case 'label':
        return this.page.getByLabel(strategy.value);
      case 'text':
        return this.page.getByText(strategy.value);
      case 'testid':
        return this.page.getByTestId(strategy.value);
      case 'css':
        return this.page.locator(strategy.value);
      case 'xpath':
        return this.page.locator(`xpath=${strategy.value}`);
      default:
        throw new Error('Unsupported selector strategy');
    }
  }
}