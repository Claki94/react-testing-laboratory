import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ConfirmationDialogComponent,
  Props,
} from './confirmation-dialog.component';

describe('ConfirmationDialogComponent specs', () => {
  let props: Props;
  let dialog: HTMLDialogElement;

  beforeEach(() => {
    props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Delete project',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      children: <p role="paragraph">Paragraph example</p>,
    };
  });

  it('should display a dialog when rendering the component with true isOpen prop', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.getByRole('dialog');

    // Assert
    expect(dialog).toBeInTheDocument();
  });

  it('should not display a dialog when rendering the component with false isOpen prop', () => {
    // Arrange
    props.isOpen = false;

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.queryByRole('dialog');

    // Assert
    expect(dialog).not.toBeInTheDocument();
  });

  it('should display a dialog heading with text "Test title"', () => {
    // Arrange
    const expectedDialogTitle = 'Delete project';

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.getByRole('dialog');
    const dialogHeading = within(dialog).getByRole('heading');

    // Assert
    expect(dialogHeading.textContent).toEqual(expectedDialogTitle);
  });

  it('should display as dialog content the paragraph "<p>Paragraph example</p>"', () => {
    // Arrange
    const expectedParagraphText = 'Paragraph example';

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.getByRole('dialog');
    const dialogP = within(dialog).getByRole('paragraph');

    // Assert
    expect(dialogP).toBeInTheDocument();
    expect(dialogP.textContent).toEqual(expectedParagraphText);
  });

  it('should display as dialog actions two buttons with text "Cancel" and "Accept"', () => {
    // Arrange
    const closeButtonText = 'Cancel';
    const openButtonText = 'Accept';

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.getByRole('dialog');

    const [closeButton, openButton] = within(dialog).getAllByRole('button');

    // Assert
    expect(closeButton.textContent).toEqual(closeButtonText);
    expect(openButton.textContent).toEqual(openButtonText);
  });

  it('should call onClose when clicking the "Close" button', async () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.getByRole('dialog');

    const [closeButton] = within(dialog).getAllByRole('button');
    await userEvent.click(closeButton);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call onAccept and onClose when clicking the "Accept" button', async () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    dialog = screen.getByRole('dialog');

    const [, acceptButton] = within(dialog).getAllByRole('button');
    await userEvent.click(acceptButton);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
