/**
 * @file 简易-定制路由组件
 */
import React from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'dva/router';
import Routes from 'config/router';
interface IProps {
  [name: string]: any;
}
function CusRouter(props: IProps) {
  return (
    <>
      {Array.isArray(Routes) &&
        Routes.length > 0 &&
        Routes.map((item: any, index: number) => {
          if (item.layout) {
            const Layouts = item.layout;
            return (
              <Layouts key={index} {...props}>
                {Array.isArray(item.children) && item.children.length > 0
                  ? item.children.map((app: any, num: number) => {
                      if (
                        Array.isArray(app.children) &&
                        app.children.length > 0
                      ) {
                        let ary = app.children;
                        ary.map((data: any, inx: number) => {
                          return (
                            <Route
                              key={inx}
                              path={data.route}
                              component={data.component}
                            />
                          );
                        });
                      } else {
                        return (
                          <Route
                            key={num}
                            path={app.route}
                            component={app.component}
                          />
                        );
                      }
                    })
                  : item.route && (
                      <Route
                        key={item.route}
                        path={item.route}
                        component={item.component}
                      />
                    )}
              </Layouts>
            );
          } else {
            return (
              <Route key={index} path={item.route} component={item.component} />
            );
          }
        })}
    </>
  );
}
export default withRouter(CusRouter);
