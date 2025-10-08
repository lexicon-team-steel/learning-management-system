import { render, screen } from '@testing-library/react';
import ActionButtons from '../components/ActionButtons';

describe('ActionButtons', () => {
  it('renders with the correct label and handles click', async () => {
    const handleClick = jest.fn();
    render(<ActionButtons onEdit={handleClick} onDelete={handleClick} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    editButton.click();
    deleteButton.click();

    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
