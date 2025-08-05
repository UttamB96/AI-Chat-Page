import { Alert } from "@mantine/core";
import { IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import { FC } from "react";

type TopAlertProps = {
  type: "success" | "error";
  message: string;
};

const TopAlert: FC<TopAlertProps> = ({ type, message }) => {
  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      <Alert
        icon={
          isSuccess ? <IconCheck size={16} /> : <IconAlertTriangle size={16} />
        }
        color={isSuccess ? "green" : "red"}
        title={isSuccess ? "Success" : "Error"}
        radius="md"
        variant="filled"
        withCloseButton
      >
        {message}
      </Alert>
    </div>
  );
};

export default TopAlert;
