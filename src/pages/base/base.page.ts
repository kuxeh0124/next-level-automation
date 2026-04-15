import { Locator, Page } from '@playwright/test';
import { SelectorDefinition, SelectorStrategy } from '@selectors/selector.types';
import { Logger } from '@core/logger/logger';

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

  /**
   * Default resolver for page-object getters.
   * Keeps Playwright's lazy Locator model and supports fallback unions.
   */
  protected resolve(definition: SelectorDefinition): Locator {
    const strategies = [definition.preferred, ...(definition.fallbacks ?? [])];
    const locators = strategies.map((strategy) => this.resolveStrategy(strategy));

    if (locators.length === 1) {
      return locators[0];
    }

    return locators.reduce((combined, current) => combined.or(current)).first();
  }

  /**
   * Ordered resolver for actions where fallback precedence matters.
   * Use sparingly for tricky elements.
   */
  protected async resolveFirstAvailable(
    definition: SelectorDefinition,
    requireVisible = false
  ): Promise<Locator> {
    const strategies = [definition.preferred, ...(definition.fallbacks ?? [])];

    for (const strategy of strategies) {
      const locator = this.resolveStrategy(strategy);
      const candidate = locator.first();
      Logger.info(`Trying to resolve: ${definition.friendlyName} using ${strategy.type} selector`);
      if ((await candidate.count()) === 0) {
        Logger.warn(`Locator not found: ${definition.friendlyName} using ${strategy.type} selector`);
        continue;
      }

      if (!requireVisible || (await candidate.isVisible())) {
        Logger.success(`Locator resolved: ${definition.friendlyName}`);
        return candidate;
      }
    }
    Logger.error(`Failed to resolve locator: ${definition.friendlyName}`);
    throw new Error(`Unable to resolve locator: ${definition.friendlyName}`);
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