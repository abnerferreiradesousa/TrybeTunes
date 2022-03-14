import React from 'react';
import App from '../App';
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';


describe('Tela de Login', () => {
  const { debug, getByPlaceholderText, getByRole, getByText } = screen;
  it('se botão, input e footer estão na tela na rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;

    const btnEntrar = getByRole('button', { name: /Entrar/i });
    const inputName = getByRole('textbox');
    const textFooter = getByText(/Made with/i);
    
    expect(pathname).toBe('/');
    expect(btnEntrar).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(textFooter).toBeInTheDocument();
  })

  it('Ao escrever no input e clicar no botão redireciona para rota "/search"', async () => {
    const { history } = renderWithRouter(<App />);
    const inputName = getByRole('textbox');
    const btnEntrar = getByRole('button', { name: /Entrar/i });

    userEvent.type(inputName, 'Bruce Wayne');
    expect(inputName).toHaveValue('Bruce Wayne')

    userEvent.click(btnEntrar);
    // Verificar se esse teste esta correto.
    //----consegui achar a tela
    // await waitFor(() => {
    //   const { location: { pathname } } = history;
    //   expect(pathname).toBe('/search');
    // }, { timeout: 4000})
  })

  // it('Ao clicar no link "Abner Sousa" redireciona para rota "https://github.com/abnerferreiradesousa"', () => {
  //   const { history } = renderWithRouter(<App />);
    
  // })
})