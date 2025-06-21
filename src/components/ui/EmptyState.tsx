import { motion } from "framer-motion";

const EmptyState = () => {
  return (
    <motion.div
      className="aspect-w-16 aspect-h-9 min-h-[100px] flex flex-col justify-center items-center col-span-2 sm:col-span-3 bg-gray-100 rounded-lg p-4 shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        className="w-12 h-12 mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5a1 1 0 011-1h16a1 1 0 011 1v11.382a1 1 0 01-.553.894L15 20M9 10l3 3 3-3M12 13V7"
        ></path>
      </svg>
      <p className="text-lg text-gray-600">No links yet!</p>
      <p className="text-sm text-gray-500">
        Your shortened links will appear here.
      </p>
    </motion.div>
  );
};

export default EmptyState;
