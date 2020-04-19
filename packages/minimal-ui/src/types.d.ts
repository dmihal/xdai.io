declare module 'react-swipeable-routes' {
  import React from 'react';

  interface SwipableRouteProps {
    axis?: string;
    onWheel: any;
    onKeyDown: any;
    index?: number;
    onChangeIndex: any;
  }

  const SwipableRoute: React.ComponentType<SwipableRouteProps>;
  export default SwipableRoute;
}
