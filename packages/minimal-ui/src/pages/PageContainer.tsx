import React, { useEffect, Fragment } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Route } from 'react-router-dom';
import { useBurner } from '@burner-wallet/ui-core';
import styled from 'styled-components';

import SendPage from './SendPage';
import AdvancedPage from './AdvancedPage';
import HomePage from './HomePage';
import ReceivePage from './ReceivePage';
import { SCAN_QR_DATAURI } from '../lib';

interface Page {
  route: string;
  component: any;
}

const pages: Page[] = [
  {
    route: '/receive',
    component: ReceivePage,
  },
  {
    route: '/',
    component: HomePage,
  },
  {
    route: '/send',
    component: SendPage,
  },
  {
    route: '/settings',
    component: AdvancedPage,
  }
]

const pageIndexByRoute: { [route: string]: number } = {};
pages.forEach((page: Page, index) => {
  pageIndexByRoute[page.route] = index;
});

const ScanButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border: none;
  z-index: 80;
  outline: none;

  background-image: linear-gradient(rgb(250, 125, 54), rgb(247, 107, 28));
  background-color: rgb(247, 107, 28);
  box-shadow: rgb(0, 0, 0) 0.5px 0.5px 5px;

  background-image: url("${SCAN_QR_DATAURI}");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
`;

const PageContainer = ({ history }: any) => {
  const { actions } = useBurner();

  return (
    <Fragment>
      <ScanButton onClick={actions.openDefaultQRScanner} />
      <ReactFullpage
        scrollingSpeed={1000}
        dragAndMove={true}
        // afterLoad={(start: any, destination: any) => history.push(pages[destination.index].route)}

        render={({ state, fullpageApi }: { state: any, fullpageApi: any }) => {
          return (
            <Route
              render={({ location }) => {
                // if (pageIndexByRoute[location.pa] !==) {
                //   fullpageApi.moveTo()
                // }

                return (
                  <ReactFullpage.Wrapper>
                    {pages.map((page: Page) => (
                      <div className="section" key={page.route}>
                        <page.component history={history} location={location} />
                      </div>
                    ))}
                  </ReactFullpage.Wrapper>
                );
              }}
            />
          );
        }}
      />
    </Fragment>
  )
}

export default PageContainer;