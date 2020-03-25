import React, { useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Route } from 'react-router-dom';
import SendPage from './SendPage';
import AdvancedPage from './AdvancedPage';
import HomePage from './HomePage';
import ReceivePage from './ReceivePage';

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

const PageContainer = ({ history }: any) => {
  return (
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
  )
}

export default PageContainer;