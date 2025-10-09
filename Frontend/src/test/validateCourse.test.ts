import { validateNameDescriptionAndDates } from '../utilities/actions/helpers/validationHelpers';

describe('validateNameDescriptionAndDates', () => {
  it('returns error if end date is before start date', () => {
    const formData = new FormData();
    formData.set('name', 'Test');
    formData.set('description', 'Desc');
    formData.set('startDate', '2025-10-10');
    formData.set('endDate', '2025-10-09');

    const result = validateNameDescriptionAndDates(formData);
    expect(result.endDate).toBe('Slutdatum får inte vara före startdatum');
  });

  it('returns no errors for valid data', () => {
    const formData = new FormData();
    formData.set('name', 'Valid');
    formData.set('description', 'OK');
    formData.set('startDate', '2025-10-09');
    formData.set('endDate', '2025-10-10');

    expect(validateNameDescriptionAndDates(formData)).toEqual({});
  });
});
