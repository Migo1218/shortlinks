import { useCallback, useEffect } from "react";
import { Link } from "./Link";
import EmptyState from "./ui/EmptyState";
import { useStore } from "@nanostores/react";
import { tableStore } from "../store/tableStore";

export const Table = ({ ...props }) => {
  const $tableStore = useStore(tableStore);

  const fetchTableInfo = useCallback(async () => {
    const response = await fetch("/api/short", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    tableStore.set({ data });
  }, []);

  useEffect(() => {
    fetchTableInfo();
  }, [fetchTableInfo]);

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-10">
      {$tableStore.data.length > 0 ? (
        $tableStore.data.map((item) => (
          <div
            key={item._id}
            className="aspect-w-16 aspect-h-9 min-h-[100px] flex justify-center items-center"
          >
            <Link url={item.url} short={item.short_id} views={item.views} />
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
