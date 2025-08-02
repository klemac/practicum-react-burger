import { selectors, userData, API_URL } from '../support/constants';

describe('Placing an order after login', () => {
	beforeEach(() => {
		cy.prepare();
		cy.visit('/#/login');

		cy.intercept('POST', `${API_URL}/auth/login`, { fixture: 'user' });
		
		window.localStorage.setItem(
			"refreshToken",
			JSON.stringify("test-refreshToken")
		);
		cy.setCookie('accessToken', 'test-accessToken')

		cy.get('[data-testid=email_input]').type(`${userData.email}`);
		cy.get('[data-testid=password_input]').type(`${userData.password}{enter}`);

	});

	it('should create order', () => {
		cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');
		cy.get(selectors.constructor.container).trigger('drop');
		cy.get(selectors.constructor.bunTop).should('exist');
		cy.get(selectors.constructor.bunBottom).should('exist');

		cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
		cy.get(selectors.constructor.container).trigger('drop');
		cy.get(selectors.constructor.innerItems).should('not.be.empty');

		cy.get(selectors.constructor.submitOrderButton).should(
			'not.have.attr',
			'disabled'
		);
		cy.intercept('POST', `${API_URL}/orders`, {
			fixture: 'order',
		}).as('order');
		cy.get(selectors.constructor.submitOrderButton).click();

		cy.get(selectors.modal.container).should('exist');
		cy.get(selectors.modal.orderNumber).should('not.be.empty');
		cy.get(selectors.modal.closeButton).click();

		cy.get(selectors.modal.container).should('not.exist');
		cy.get(selectors.constructor.innerItems).should('not.exist');
		cy.get(selectors.constructor.bunTop).should('not.exist');
		cy.get(selectors.constructor.bunBottom).should('not.exist');
	});
});
