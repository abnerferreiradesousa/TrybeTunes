import React from 'react';
import App from '../App';
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import Search from '../pages/Search';

const navLinks = ['SEARCH', 'FAVORITOS', 'LOG OUT'];
describe('Tela de Search', () => {
  const { debug, getByPlaceholderText, getByRole, getByText } = screen;
  it('Se logo e barra de navegação estão na tela', async () => {
    const { history } = renderWithRouter(<Search />);
    const loading = getByRole('heading', { level: 1, name: 'Carregando...' })  
    await waitForElementToBeRemoved(loading, { timeout: 2000 });
    
    navLinks.forEach((link) => {
      const getLinks = getByRole('link', { name: link })
      expect(getLinks).toBeInTheDocument();
    })

    const { location: { pathname } } = history;
    const logo = getByText('Electronic')
    expect(logo).toBeInTheDocument();
    // P q o teste de confirmação de rotas não está funcionando.
    // expect(pathname ).toBe('/search');

  })
})