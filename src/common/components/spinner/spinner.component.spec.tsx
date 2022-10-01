import React from 'react';
import * as reactPromiseTracker from 'react-promise-tracker/lib/trackerHook';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent specs', () => {
  let usePromiseTrackerStub: jest.SpyInstance;

  beforeEach(() => {
    usePromiseTrackerStub = jest.spyOn(
      reactPromiseTracker,
      'usePromiseTracker'
    );
  });

  it('should call usePromiseTracker when rendering the component', () => {
    // Arrange

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(usePromiseTrackerStub).toHaveBeenCalled();
  });

  it('should render the Modal when promiseInProgress is set as true', () => {
    // Arrange
    usePromiseTrackerStub.mockReturnValue({
      promiseInProgress: true,
    });

    // Act
    render(<SpinnerComponent />);
    const modal = screen.getByRole('presentation');

    // Assert
    expect(modal).toBeInTheDocument();
  });

  it('should not render the Modal when promiseInProgress is set as false', () => {
    // Arrange
    usePromiseTrackerStub.mockReturnValue({
      promiseInProgress: false,
    });

    // Act
    render(<SpinnerComponent />);
    const modal = screen.queryByRole('presentation');

    // Assert
    expect(modal).not.toBeInTheDocument();
  });
});
