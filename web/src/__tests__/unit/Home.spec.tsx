import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home', () => {
    it('should display a heading, paragraph and a anchor with url to create-point page', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        );

        const appLogo = screen.getByRole('img', { name: /Ecoleta logo/i });

        const descriptionParagraph = screen.getByText(
            /Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente/i,
            { selector: 'p' },
        );
        const createPointButton = screen.getByRole('link', { name: /Cadastre um ponto de coleta/i });

        expect(appLogo).toBeInTheDocument();
        expect(descriptionParagraph).toBeInTheDocument();
        expect(createPointButton).toHaveAttribute('href', '/create-point');
    });
});
