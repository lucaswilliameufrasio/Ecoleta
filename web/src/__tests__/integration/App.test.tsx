import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
    it('should navigate to create-point page', () => {
        render(<App />);

        const createPointButton = screen.getByRole('link', { name: /Cadastre um ponto de coleta/i });
        fireEvent.click(createPointButton);

        const backToHomeElement = screen.getByRole('link', { name: /Voltar para home/i });

        expect(backToHomeElement).toHaveAttribute('href');
    });

    it('should navigate back to home page', () => {
        render(<App />);

        const backToHomeElement = screen.getByRole('link', { name: /Voltar para home/i });
        fireEvent.click(backToHomeElement);

        const headingHomeElement = screen.getByRole('heading', { name: /Seu marketplace de coleta de resíduos/i });

        expect(headingHomeElement).toBeInTheDocument();
        expect(backToHomeElement).toHaveAttribute('href');
    });
});
