import { useConfirmationDialog } from './confirmation-dialog.hook';
import { renderHook, act } from '@testing-library/react';
import * as lookup from '../../models/lookup';

describe('useConfirmationDialog specs', () => {
  it('should return an object: isOpen set to false, itemToDelete set as empty lookup, onAccept, onClose and onOpenDialog functions', () => {
    // Arrange
    const emptyLookup: lookup.Lookup = { id: '', name: '' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual(emptyLookup);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update itemToDelete as an empty lookup when calling onAccept function', () => {
    // Arrange
    const emptyLookup: lookup.Lookup = { id: '', name: '' };
    const createEmptyLookupSpy = jest.spyOn(lookup, 'createEmptyLookup');

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(emptyLookup);
    expect(createEmptyLookupSpy).toHaveBeenCalled();
  });

  it('should update isOpen as false when calling onClose function', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  it('should update isOpen as true and itemToDelete as filled lookup when calling onOpenDialog function', () => {
    // Arrange
    const filledLookup: lookup.Lookup = { id: '1', name: 'lookup test' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(filledLookup);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toStrictEqual(filledLookup);
  });
});
