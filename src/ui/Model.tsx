import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { ReactNode } from "react";

interface IModelProps {
  isOpen: boolean;
  closeModel: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

function Model({
  closeModel,
  isOpen,
  title,
  children,
  description,
}: IModelProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModel}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-lg bg-white p-6  duration-200 ease-out data-closed:transform-[scale(95%)] shadow-xl data-closed:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black uppercase"
                >
                  {title}
                </DialogTitle>
              )}
              {description && <p className="text-black/30">{description}</p>}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Model;
