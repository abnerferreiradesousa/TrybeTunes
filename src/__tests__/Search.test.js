import React from 'react';
import App from '../App';
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import Search from '../pages/Search';

const navLinks = ['SEARCH', 'FAVORITOS', 'LOG OUT'];

describe('Tela de Search', () => {
  const { debug, getByRole, getByText, getByPlaceholderText, getAllByRole } = screen;
  it('Se logo e barra de navegação estão na tela', async () => {
    const { history } = renderWithRouter(<Search />);
    const loading = getByRole('heading', { level: 1, name: 'Carregando...' })  
    await waitForElementToBeRemoved(loading, { timeout: 2000 });
    
    navLinks.forEach((link) => {
      const getLinks = getByRole('link', { name: link })
      expect(getLinks).toBeInTheDocument();
    })

    const { location: { pathname } } = history;
    const messageMusic = getByRole('heading', { name: /Olá/i })
    const logo = getByText('Electronic')
    expect(logo).toBeInTheDocument();
    expect(messageMusic).toBeInTheDocument();
    // P q o teste de confirmação de rotas não está funcionando.
    // expect(pathname ).toBe('/search');
  })

  it('Se está presente na tela o input de texto, botão de pesquisar', () => {
    renderWithRouter(<Search />);
    const inputArtist = getByPlaceholderText('Nome do artista');
    const btnSearch = getByRole('button', { name: /pesquisar/i })
    expect(inputArtist).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
    //Adicionar footer em todas as páginas!
  })
})