import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
    it('should be able to render the first route (home page)', () => {
        render(<App />);

        const titleELement = screen.getByText(/Seu marketplace de coleta de resíduos/i, { selector: 'h1' });
        const linkElement = screen.getByText(/Cadastre um ponto de coleta/i, { selector: 'strong' });

        expect(titleELement).toBeInTheDocument();
        expect(linkElement).toBeInTheDocument();
    });
});
