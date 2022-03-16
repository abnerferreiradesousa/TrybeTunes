import React from 'react';
import App from '../App';
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import Favorites from '../pages/Favorites';

const navLinks = ['SEARCH', 'FAVORITOS', 'LOG OUT'];

describe('Tela Favorites', () => {
  it('Tem h1 de apresentação e o título', async () => {
    renderWithRouter(<Favorites />);
    
    const loading = screen.getByRole('heading', { level: 1, name: 'Carregando...' })  
    await waitForElementToBeRemoved(loading, { timeout: 2000 });
    const title = screen.getByRole('heading', { level: 2, name: /Músicas Favoritas/i })

    expect(title).toBeInTheDocument();
  })
})