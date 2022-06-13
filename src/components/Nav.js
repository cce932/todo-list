import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarIcon, SignOutIcon } from './Icons';
import '../styled/nav.css';

function Nav() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => () => {
    i18n.changeLanguage(lng);
  };
  return (
    <nav id="nav">
      <ul>
        <li id="nav__item-toggle-bar">
          <button type="button"><BarIcon /></button>
        </li>
        <li id="nav__item-title">
          <h3><a href="/">{t('title')}</a></h3>
        </li>
        <li id="nav__item-language-config">
          <button type="button" onClick={changeLanguage('tw')}>中文</button>
          <span>{' | '}</span>
          <button type="button" onClick={changeLanguage('en')}>English</button>
        </li>
        <li id="nav__item-sign-out">
          <a href="#"><SignOutIcon /></a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
