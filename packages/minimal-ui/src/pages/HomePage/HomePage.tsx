import React from 'react';
import { Link } from 'react-router-dom';
import { BurnerContext, withBurner, DataProviders } from '@burner-wallet/ui-core';
import styled from 'styled-components';

import Page from '../../components/Page';
import HistoryList from '../../components/HistoryList';
import AppButton from './AppButton';
import HomeTabs from './HomeTabs';

const ViewAllButton = styled(Link)`
  background: #f2f2f2;
  border-radius: 30px;
  display: flex;
  align-items: center;
  color: #555;
  padding: 8px 12px;
  text-decoration: none;

  &:after {
    content: '\\203A';
    margin-left: 10px;
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 4px;
`;

const SubHeading = styled.h2<{ line?: boolean }>`
  font-size: var(--l2-fs);
  line-height: var(--l2-lh);
  font-weight: var(--l2-weight);
  margin: 8px 0 4px;
  color: #222222;

  ${props => props.line && `border-bottom: solid 1px #f2f2f2;`}
`;

const { PluginElements, PluginButtons } = DataProviders;

const HomePage: React.FC<BurnerContext> = ({ defaultAccount, actions, pluginData, t }) => {
  return (
    <Page>
      <PluginElements position='home-top' />

      <HomeTabs pluginData={pluginData} />

      <PluginElements position='home-middle' />

      <ActivityHeader>
        <SubHeading>{t('Recent activity')}</SubHeading>
        <ViewAllButton to='/activity'>{t('View all')}</ViewAllButton>
      </ActivityHeader>

      <HistoryList account={defaultAccount} limit={3} navigateTo={actions.navigateTo} />


      <PluginButtons position="apps" component={AppButton}>
        <SubHeading line>{t('Apps')}</SubHeading>
      </PluginButtons>
    </Page>
  );
};

export default withBurner(HomePage);
