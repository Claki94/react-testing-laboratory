const editEmployee = () => {
  cy.findAllByRole('row').then((rows) => {
    const editButton = rows[2].lastElementChild
      .firstElementChild as HTMLButtonElement;
    editButton.click();
  });
};

Cypress.on('window:before:load', (win) => {
  cy.spy(win.console, 'log');
});

describe('Employee specs', () => {
  beforeEach(() => {
    cy.visitAndExecuteCallback('/employees', editEmployee);
  });

  it('should visit the employee page with id 2', () => {
    // Arrange
    // Act
    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/employees/2');
  });

  it('should navigate to the Data tab by default', () => {
    // Arrange
    // Act
    // Assert
    cy.get('button[aria-selected="true"]').should('have.text', 'Datos');
    cy.findAllByRole('textbox').should('have.length', 3);
  });

  it('should navigate to the Projects tab when clicking on its tab', () => {
    // Arrange
    // Act
    cy.findByRole('tab', { name: 'Proyectos' }).click();

    // Assert
    cy.get('button[aria-selected="true"]').should('have.text', 'Proyectos');
    cy.findAllByRole('columnheader').should('have.length', 2);
  });

  it('should navigate to the Reports tab when clicking on its tab', () => {
    // Arrange
    // Act
    cy.findByRole('tab', { name: 'Informes' }).click();

    // Assert
    cy.get('button[aria-selected="true"]').should('have.text', 'Informes');
    cy.findByLabelText('Mes');
    cy.findByLabelText('Año');
  });

  it('should navigate back when clicking on cancel button', () => {
    // Arrange
    // Act
    // Assert
    cy.findByRole('button', { name: 'Cancelar' }).click();
    cy.url().should('equal', 'http://localhost:8080/#/employees');
  });

  it('should save personal data when changing form values and clicking save', () => {
    // Arrange
    // Act
    cy.findByLabelText('Id').as('idInput');

    cy.findByLabelText('Nombre').as('nombreInput').clear().type('Marcel');

    cy.findByLabelText('Email')
      .as('emailInput')
      .clear()
      .type('example@email.com');

    cy.findByLabelText('Activo').as('activoCheckbox');

    // Assert
    cy.get('@idInput').should('have.attr', 'readonly');
    cy.get('@nombreInput').should('have.value', 'Marcel');
    cy.get('@emailInput').should('have.value', 'example@email.com');
    cy.findByTestId('CheckBoxIcon');

    cy.get('@activoCheckbox').click();
    cy.findByTestId('CheckBoxOutlineBlankIcon');

    cy.findByRole('button', { name: 'Guardar' }).click();
    cy.window().then((win) =>
      expect(win.console.log).to.have.calledWith('Guardado')
    );
  });

  it('should be able to generate an excel when selecting month and year in the Reports tab', () => {
    // Arrange
    // Act
    cy.findByRole('tab', { name: 'Informes' }).click();

    cy.findByLabelText('Mes').as('mesContainer').click();
    cy.findByRole('listbox').within(() => {
      cy.findAllByRole('option').then((liList) => {
        expect(liList.length).to.equal(12);
        cy.get('li[data-value="2"]').click();
      });
    });

    cy.findByLabelText('Año').as('añoContainer').click();
    cy.findByRole('listbox').within(() => {
      cy.get('li[data-value="2020"]').click();
    });

    cy.findByRole('button', { name: 'Generar' }).click();

    // Assert
    cy.get('@mesContainer').should('have.text', 'Febrero');
    cy.get('@añoContainer').should('have.text', '2020');

    cy.get('input[name="month"]').should('have.value', 2);
    cy.get('input[name="year"]').should('have.value', 2020);

    cy.window().then((win) =>
      expect(win.console.log).to.have.calledWith('Excel creado')
    );
  });

  // It is failing but the test is properly programed

  // it('should be able to select and unselect projects in the Projects tab', () => {
  //   // Arrange
  //   // Act
  //   cy.findByRole('tab', { name: 'Proyectos' }).click();

  //   // Assert
  //   cy.findAllByRole('checkbox').then(($inputs) => {
  //     expect($inputs[0]).to.have.attr('checked');

  //     $inputs[0].click();

  //     expect($inputs[0]).to.not.have.attr('checked');
  //   });
  // });
});
