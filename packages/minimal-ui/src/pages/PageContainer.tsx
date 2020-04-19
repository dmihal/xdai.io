import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useBurner } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import SwipeableRoutes from 'react-swipeable-routes';
import keycode from 'keycode';

import SendPage from './SendPage';
import AdvancedPage from './AdvancedPage';
import HomePage from './HomePage';
import ReceivePage from './ReceivePage';
import { SCAN_QR_DATAURI } from '../lib';

interface Page {
  route: string;
  component: any;
  exact?: boolean;
}

const pages: Page[] = [
  {
    route: '/receive',
    component: ReceivePage,
  },
  {
    route: '/',
    exact: true,
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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  & > div, .react-swipeable-view-container {
    height: 100%;
  }

  .react-swipeable-view-container > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const PageContainer = ({ history }: any) => {
  const rerender = useState(null)[1];
  const { actions } = useBurner();
  const [pageIndex, setPageIndex] = useState(0);
  const scrolling = useRef(false);

  const handleWheel = (e: any) => {
    if (scrolling.current) {
      return;
    }

    const newIndex = e.deltaY < 0 ? pageIndex - 1 : pageIndex + 1;
    const boundedNewIndex = Math.min(Math.max(newIndex, 0), pages.length - 1);

    if (boundedNewIndex !== pageIndex) {
      scrolling.current = true;
      setPageIndex(boundedNewIndex);
    }
  };


  useEffect(() => {
    const handleKeyDown = (e: any) => {
      console.log(e);
      switch (keycode(e)) {
        case 'page down':
        case 'down':
          setPageIndex(pageIndex + 1);
          break;

        case 'page up':
        case 'up':
          setPageIndex(pageIndex - 1);
          break;
      }
    };
    window.document.addEventListener('keydown', handleKeyDown);
    return () => window.document.removeEventListener('keydown', handleKeyDown);
  }, [pageIndex]);

  return (
    <Fragment>
      <ScanButton onClick={actions.openDefaultQRScanner} />

      <Wrapper>
        <SwipeableRoutes
          axis="y"
          onWheel={handleWheel}
          index={pageIndex}
          onChangeIndex={(index: number) => {
            setPageIndex(index);
          }}
          onTransitionEnd={() => {
            scrolling.current = false;
          }}
          springConfig={{ duration: '1s', easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)', delay: '0s' }}
        >
          {pages.map((page: Page) => (
            <Route key={page.route} path={page.route} component={page.component} exact={page.exact} />
          ))}
        </SwipeableRoutes>
      </Wrapper>
    </Fragment>
  )
}

export default PageContainer;