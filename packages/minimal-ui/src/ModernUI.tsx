import React from 'react';
import BurnerUICore, { Page } from '@burner-wallet/ui-core';

import burnerComponents from './components/burner-components';
import Header from './components/Header';
import Loading from './components/Loading';
import Scanner from './components/Scanner';
import Template from './Template';

import internalPlugins from './internal-plugins';
import ActivityPage from './pages/ActivityPage';
import AdvancedPage from './pages/AdvancedPage';
import ConfirmPage from './pages/ConfirmPage';
import HomePage from './pages/HomePage';
import PKPage from './pages/PKPage';
import ReceiptPage from './pages/ReceiptPage';
import ReceivePage from './pages/ReceivePage';
import PageContainer from './pages/PageContainer';


export default class ClassicUI extends BurnerUICore {
  getPages(): Page[] {
    return [
      // @ts-ignore
      { path: ['/', '/receive', '/send', '/settings'], component: PageContainer },
      { path: '/activity', component: ActivityPage },
      { path: '/pk', component: PKPage },
      { path: '/confirm', component: ConfirmPage },
      { path: '/receipt/:asset/:txHash', component: ReceiptPage },
    ];
  }

  getInternalPlugins() {
    return internalPlugins;
  }

  burnerComponents() {
    return burnerComponents;
  }

  content() {
    return (
      <Template theme={this.props.theme}>
        <Scanner />
        <Loading />
        {this.router()}
      </Template>
    );
  }
}
