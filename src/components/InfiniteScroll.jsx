import React, { useEffect, useRef } from "react";

function InfiniteScroll({ children, fetchMore, hasNextPage }) {
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchMore();
        }
      });
    });

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [fetchMore, hasNextPage]);

  return (
    <>
      {children}
      <div ref={loader} className="h-2"></div>
    </>
  );
}

export default InfiniteScroll;