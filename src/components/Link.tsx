import { useState } from "react";
import { CopyIcon } from "./icons/CopyIcon";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { TrashIcon } from "./icons/TrashIcon";
import { useStore } from "@nanostores/react";
import { tableStore } from "../store/tableStore";

export const Link = ({ url, short, views }) => {
  const $tableStore = useStore(tableStore);
  const [localUrl] = useState(() => {
    const localUrl = window.location.host.replace("www.", "");
    return localUrl;
  });

  const handleRedirect = () => {
    window.open(`${localUrl}/${short}`, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${localUrl}/${short}`);
  };

  const deleteLink = async () => {
    await fetch(`/api/short`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        short_id: short,
      }),
    });

    const newLinks = $tableStore.data.filter((item) => item.short_id !== short);
    tableStore.set({ data: newLinks })

  };

  return (
    <article className="overflow-hidden bg-[#232A39] px-2 py-4 rounded-md text-[12px] w-full">
      <span className="block text-ellipsis overflow-hidden whitespace-nowrap">
        {url}
      </span>
      <div className="flex mt-2 gap-2 cursor-pointer" onClick={handleRedirect}>
        <span className="text-[#009DFE]">
          {localUrl}/{short}
        </span>
        <button>
          <ExternalLinkIcon />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1">
        <div className="flex items-center gap-1 after:h-4 after:w-[1px] after:bg-slate-500 after:mx-1">
          <EyeIcon />
          <span>{views}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={copyToClipboard}>
            <CopyIcon fill="#ffffff" />
          </button>
          <button onClick={deleteLink}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  );
};
