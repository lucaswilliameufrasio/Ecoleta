import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreatePoint from '../../pages/CreatePoint';

describe('Create Point', () => {
    it('should display a formulary with fields empty', () => {
        render(
            <MemoryRouter>
                <CreatePoint />
            </MemoryRouter>,
        );

        const createPointForm = screen.getByTestId('create-point-form');

        expect(createPointForm).toHaveFormValues({
            name: '',
            email: '',
            whatsapp: '',
            uf: '0',
            city: '0',
        });
    });
});
