import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AbilityInput } from '../components/AbilityInput';

// Helper to render with MantineProvider
const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe('AbilityInput', () => {
  const mockOnUpdate = vi.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
  });

  it('renders ability input with correct label', () => {
    renderWithMantine(<AbilityInput ability="str" value={15} onUpdate={mockOnUpdate} />);

    expect(screen.getByLabelText('STR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
  });

  it('shows modifier badge when value is greater than 0', () => {
    renderWithMantine(<AbilityInput ability="dex" value={14} onUpdate={mockOnUpdate} />);

    // Should show +2 modifier for score of 14
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('does not show modifier badge when value is 0', () => {
    renderWithMantine(<AbilityInput ability="con" value={0} onUpdate={mockOnUpdate} />);

    // Should not show any modifier badge
    expect(screen.queryByText('+0')).not.toBeInTheDocument();
    expect(screen.queryByText('-5')).not.toBeInTheDocument();
  });

  it('calls onUpdate when value changes', () => {
    renderWithMantine(<AbilityInput ability="int" value={12} onUpdate={mockOnUpdate} />);

    const input = screen.getByLabelText('INT');
    fireEvent.change(input, { target: { value: '16' } });

    expect(mockOnUpdate).toHaveBeenCalledWith('int', '16');
  });

  it('renders with placeholder when provided', () => {
    renderWithMantine(
      <AbilityInput ability="wis" value={0} onUpdate={mockOnUpdate} placeholder="Enter wisdom score" />
    );

    expect(screen.getByPlaceholderText('Enter wisdom score')).toBeInTheDocument();
  });
});
