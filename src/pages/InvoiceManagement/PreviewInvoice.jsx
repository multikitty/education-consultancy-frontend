import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import print from "../../../public/img/print01.svg";
import invoice01 from "../../../public/img/invoice01.png";
import downloadIcon from "../../../public/img/downloadIcon.svg";

const PreviewInvoice = ({ open, close }) => {
  return (
    <Dialog
      className="custom-scroll h-[96vh] overflow-auto rounded-[24px] font-display"
      size="lg"
      open={open}
    >
      <DialogBody>
        <div className="relative h-full w-full md:h-auto">
          <div className="relative bg-white dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t p-4 dark:border-gray-600">
              <h3 className=" pt-3 text-2xl font-semibold text-[#333333] dark:text-white">
                PDF Preview
              </h3>
              <Button className="rounded-[15px]  bg-[#280559]" onClick={close}>
                <div className="flex flex-row items-center justify-center">
                  back
                </div>
              </Button>
            </div>

            <div className="mx-[50px] space-y-6 bg-[#D9D9D9] py-[54px]">
              <img className="m-auto w-auto" src={invoice01} alt="..." />
            </div>

            <div className="mx-7  flex flex-row justify-end space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600">
              <Button className="rounded-[15px]  bg-[#280559]" onClick={close}>
                <div className="flex flex-row items-center justify-center">
                  <img src={downloadIcon} alt="..." />
                  <p className="p-1 px-[11px] text-base font-medium normal-case text-white">
                    Download
                  </p>
                </div>
              </Button>
              <Button
                className=" flex h-[60px] flex-row items-center justify-center rounded-2xl border border-[#280559] bg-white"
                onClick={close}
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#280559"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="m-1 text-base font-medium normal-case text-[#280559]">
                  Close
                </span>
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PreviewInvoice;
