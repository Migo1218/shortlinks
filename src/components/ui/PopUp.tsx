import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../icons/CloseIcon";
import { CopyIcon } from "../icons/CopyIcon";
import { QR } from "../icons/QR";
import { DownloadIcon } from "../icons/DownloadIcon";
import { modalStore } from "../../store/modalStore.js";
import { useStore } from "@nanostores/react";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.4 } },
};

const copiedMessageVariant = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

const buttonVariants = {
  initial: {
    backgroundColor: "#F87700",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
  },
  hover: {
    backgroundColor: "#FA8C35",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
  tap: {
    backgroundColor: "#E86500",
  },
};

const skeletonAnimation = {
  animate: {
    backgroundImage: [
      "linear-gradient(90deg, #e2e2e2 25%, #f4f4f4 50%, #e2e2e2 75%)",
      "linear-gradient(90deg, #e2e2e2 75%, #f4f4f4 50%, #e2e2e2 25%)",
    ],
    backgroundSize: "200% 100%",
    transition: { repeat: Infinity, duration: 1.2, ease: "linear" },
  },
};

export const PopUp = () => {
  const $modalStatus = useStore(modalStore);
  const [link, setLink] = useState({ link: "", qr: "", id: "" });
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [loadingQR, setLoadingQR] = useState(false);

  const handleClose = () => {
    modalStore.set({ isOpen: false, data: {} });
    setShowQR(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link.link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const handleOpen = () => {
      let url = window.location.hostname;
      const activeLink = $modalStatus.data.link;

      if (url === "localhost") {
        url = `${window.location.origin}/${activeLink.short_id}`;
      } else {
        url = `${window.location.hostname.replace("www.", "")}/${
          activeLink.short_id
        }`;
      }

      setLink({
        link: url,
        qr: activeLink.qr,
        id: activeLink.short_id,
      });
    };

    if ($modalStatus.isOpen) {
      handleOpen();
    }
  }, [$modalStatus.isOpen]);

  const handleShowQR = async () => {
    setShowQR(true);
    setLoadingQR(true);
    const img = new Image();
    img.src = link.qr;
    img.onload = () => {
      setLoadingQR(false);
    };
  };

  const downloadQR = async () => {
    const response = await fetch(link.qr, {
      method: "GET",
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${link.id}_QR.png`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className={`absolute inset-0 w-full h-screen flex justify-center items-center ${
        $modalStatus.isOpen ? "block" : "hidden"
      }`}
      variants={backdrop}
      initial="hidden"
      animate={$modalStatus.isOpen ? "visible" : "hidden"}
      exit="hidden"
      style={{ background: "#1313135e" }}
    >
      <motion.div
        className="bg-[#232A39] text-white px-10 py-8 rounded-md max-w-xl w-full shadow-lg relative"
        variants={modal}
      >
        {!showQR ? (
          <>
            <h3 className="text-2xl font-medium text-center">
              Link is ready!🎊
            </h3>
            <p className="text-center mt-5 font-light text-sm">
              Copy your shortened URL and share
            </p>
            <div className="text-center py-4 rounded-md mt-5 shadow-inner shadow-[#2b2b2b4f] bg-[#009DFE] font-medium overflow-auto">
              <span>{link.link}</span>
            </div>
            <div className="mt-5 flex gap-5">
              <motion.button
                className="w-full rounded-md flex justify-center py-3 gap-2 text-white font-medium bg-[#F87700]"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={handleCopy}
              >
                <CopyIcon width={25} height={25} fill="#fff" />
                <span>Copy</span>
              </motion.button>
              <button
                onClick={handleShowQR}
                className="w-full rounded-md flex justify-center py-3 gap-2 text-white font-medium bg-[#F87700]"
              >
                <QR />
                <span>QR</span>
              </button>
            </div>
            <AnimatePresence>
              {copied && (
                <motion.div
                  className="absolute top-20 text-sm font-medium px-4 py-2 rounded bg-green-500 text-white"
                  variants={copiedMessageVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-medium text-center">
              Customize QR{" "}
              <span className="text-[#009DFE] font-bold">Code</span>🎊
            </h3>
            {loadingQR ? (
              <motion.div
                className="w-56 h-56 mx-auto mt-5 rounded-lg"
                variants={skeletonAnimation}
                animate="animate"
              ></motion.div>
            ) : (
              <img
                src={link.qr}
                alt="QR Code"
                className="w-56 h-56 mx-auto mt-5"
              />
            )}
            <button
              onClick={downloadQR}
              className="w-full max-w-72 mt-7 mx-auto rounded-md flex justify-center items-center py-3 gap-2 text-white font-medium bg-[#F87700]"
            >
              <DownloadIcon />
              <span>Download</span>
            </button>
          </>
        )}
        <button
          className="absolute top-8 right-3 min-[440px]:right-10"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      </motion.div>
    </motion.div>
  );
};
