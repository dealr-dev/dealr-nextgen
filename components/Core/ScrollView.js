import { paging } from "@/utils/paging";
import React from "react";
import {
    ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View
} from "react-native";

export default function ScrollList({
  list,
  onLoadMore,
  loading,
  total,
  onRefresh,
  children,
  bottomIndicator,
  theref,
}) {
  const handleScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;

    const scrolledToBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 0.55;

    const pageNo = Math.ceil(list.length / paging.limit);

    if (scrolledToBottom && total > list.length && !loading) {
      onLoadMore(pageNo, paging.limit);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
      ref={theref}
      refreshControl={
        <RefreshControl
          colors={["#5A89EA"]}
          tintColor={"#5A89EA"}
          refreshing={false}
          onRefresh={() => onRefresh(paging.page, paging.limit)}
        />
      }
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {children}
      {bottomIndicator && list?.length > 0 && loading && (
        <View style={styles.bottomWrapper}>
          <ActivityIndicator size="large" color="#5A89EA" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  bottomWrapper: {
    paddingTop: 0,
    paddingBottom: 15,
  },
});
