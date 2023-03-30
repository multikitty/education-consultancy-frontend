import React, { useState } from "react";
import { Alert } from "@material-tailwind/react/components/Alert";

export function ThemeAlert({
  message,
  handleCloseAlert,
  handleShowAlert,
  showAlert,
  dismissible,
}) {
  return (
    <>
      {showAlert ? (
        <div>
          <Alert
            place="tc"
            color="red"
            icon={false}
            children={<p>{message}</p>}
            show={showAlert}
            // closeNotification={handleCloseAlert}
            dismissible={{ onClose: handleCloseAlert }}
            close
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
