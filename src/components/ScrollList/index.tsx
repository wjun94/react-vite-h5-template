/* eslint-disable no-undef */
import {
  useState,
  ReactNode,
  Fragment,
  memo,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  InfiniteScroll,
  SpinLoading,
  PullToRefresh,
  ErrorBlock,
  Toast,
} from 'antd-mobile';
import { useSetState, useRequest } from 'ahooks';

type ScrollListProps = {
  params?: { [key: string]: any };
  request: any;
  empty?: ReactNode;
  onRefresh?: () => void;
  rowRenderer: (item: any, index: number) => ReactNode;
};

const ScrollList = forwardRef(
  (
    {
      request,
      onRefresh,
      rowRenderer,
      params,
      empty,
      ...props
    }: ScrollListProps & JSX.IntrinsicElements['div'],
    ref,
  ) => {
    const [data, setData] = useState<{ [key: string]: any }[]>([]);
    const [target, setTarget] = useSetState({
      page: 1,
      page_size: 10,
    });

    const { runAsync, loading } = useRequest(request, {
      manual: true,
    });

    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
      setTarget(() => ({ page: 1 }));
      setData([]);
      setHasMore(true);
      Toast.show({
        visible: loading,
        icon: null,
        duration: 500,
        content: <SpinLoading color="primary" />,
        maskClickable: false,
      });
    }, [JSON.stringify(params)]);

    const loadMore = useCallback(async () => {
      const { data } = await runAsync({ ...target, ...params });
      const list = data?.list || [];
      setTarget((v) => ({ page: v.page + 1 }));
      setData((val) => [...val, ...list]);
      setHasMore(list.length === 10);
    }, [JSON.stringify(target), JSON.stringify(params)]);

    useImperativeHandle(ref, () => ({
      reload: async () => {
        await setTarget(() => ({ page: 1 }));
        setData(() => []);
        setHasMore(true);
      },
    }));

    return (
      <PullToRefresh
        onRefresh={async () => {
          await setTarget(() => ({ page: 1 }));
          setData(() => []);
          setHasMore(true);
          if (onRefresh) {
            onRefresh();
          }
        }}>
        <>
          <div {...props}>
            {data.map((item, i) => (
              <Fragment key={item?.id || 'list-' + i}>
                {rowRenderer && rowRenderer(item, i)}
              </Fragment>
            ))}
          </div>
          {data.length === 0
            ? empty || (
                <ErrorBlock
                  description={null}
                  title="暂无数据"
                  status="empty"
                />
              )
            : null}
          <InfiniteScroll
            threshold={1000}
            loadMore={loadMore}
            hasMore={hasMore}>
            <></>
          </InfiniteScroll>
        </>
      </PullToRefresh>
    );
  },
);

export default memo(ScrollList);
